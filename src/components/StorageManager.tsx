import { useBreakpoint } from '@/src/hooks/useMediaQuery'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import Paper from '@mui/material/Paper'
import { Cache, Storage } from 'aws-amplify'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useWindowSize } from 'react-use'

export enum FileStatus {
  QUEUED = 'queued',
  UPLOADING = 'uploading',
  PAUSED = 'paused',
  ERROR = 'error',
  UPLOADED = 'uploaded',
}

type StorageFile = {
  key: string
  src?: string
  preview?: string
  status?: FileStatus
}

const useAppropriateRows = (): number => {
  const breakpoint = useBreakpoint()
  if (breakpoint == 'xs') return 2
  else if (breakpoint == 'sm') return 3
  else if (breakpoint == 'md') return 4
  else return 5
}

const useAppropriateRowHeight = (rows: number = 4): number => {
  const { width } = useWindowSize()
  const breakpoint = useBreakpoint()
  const minWidth = 340
  const maxWidth = 1264
  let imageListWidth = width
  if (breakpoint == 'xs' || breakpoint == 'sm') {
    imageListWidth = Math.max(width, minWidth)
    // minus some spacing
    imageListWidth = imageListWidth - 16 * 2 - 8 * 2 - 4 * (rows - 1)
  } else {
    imageListWidth = Math.min(width, maxWidth)
    // minus some spacing
    imageListWidth = imageListWidth - 24 * 2 - 16 * 2 - 8 * 2 - 4 * (rows - 1)
  }
  const imageWidth = Math.floor(imageListWidth / rows)
  const imageHeight = imageWidth // Square image
  return imageHeight
}

type ProcessFileParams = {
  key: string
  file: File
}

export interface ProcessFileFn<T> {
  (params: T): T | Promise<T>
}

export const HashHexFileNameStrategy: ProcessFileFn<
  ProcessFileParams
> = async params => {
  const { file, key } = params
  const fileExtension = file.name.split('.').pop()
  const filebuffer = await file.arrayBuffer()
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', filebuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(a => a.toString(16).padStart(2, '0')).join('')
  return {
    file,
    key: `${hashHex.substring(0, 2)}/${hashHex}.${fileExtension}`,
  }
}

type StorageManagerProps = {
  /**
   * List of accepted file types
   */
  acceptedFileTypes: string[]
  /**
   * Access level for files in Storage.
   * See https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/
   */
  accessLevel: 'public' | 'private' | 'protected'
  /**
   * Called when a file starts uploading
   */
  onUploadStart?: (file: { key: string }) => void
  /**
   * Called when a file successfully uploads
   */
  onUploadSuccess?: (file: { key: string }) => void
  /**
   * Called when a error happens uploading a file
   */
  onUploadError?: (error: string, file: { key: string }) => void
  /**
   * Called when a file is removed
   */
  onFileRemove?: (file: { key: string }) => void
  /**
   * Called immediately before uploading a file to allow you to edit the key or the file itself.
   * The function can return synchronously or return a promise.
   */
  processFile?: ProcessFileFn<ProcessFileParams>
  /**
   * An array of files that already exist in the cloud.
   */
  defaultFiles?: { key: string }[]
  /**
   * The expiration time of the cache item in milliseconds. defaults to 900000 (15 minutes)
   */
  cacheExpires?: number
}

export default function StorageManager(props: StorageManagerProps) {
  const {
    acceptedFileTypes,
    accessLevel,
    onUploadStart,
    onUploadSuccess,
    onUploadError,
    onFileRemove,
    processFile,
    defaultFiles = [],
    cacheExpires = 900 * 1000, // 15 minutes
  } = props
  const [files, setFiles] = useState<StorageFile[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes.reduce((acc, type) => {
      return { ...acc, [type]: [] }
    }, {}),
    onDrop: async acceptedFiles => {
      const processedFiles = processFile
        ? await Promise.all(
            acceptedFiles.map(file => processFile({ file, key: file.name }))
          )
        : acceptedFiles.map(file => ({ file, key: file.name }))

      setFiles(prevFiles => {
        const files = processedFiles.map(({ key, file }) => {
          return { key, preview: URL.createObjectURL(file) }
        })
        return [...prevFiles, ...files]
      })

      processedFiles.forEach(({ file, key }) => {
        if (onUploadStart) onUploadStart({ key })
        Storage.put(key, file, {
          level: accessLevel,
          resumable: true,
          completeCallback: () => {
            setFiles(prevFiles => {
              return prevFiles.map(prevFile => {
                if (prevFile.key == key)
                  return Object.assign(prevFile, {
                    status: FileStatus.UPLOADED,
                  })
                else return prevFile
              })
            })
            if (onUploadSuccess) onUploadSuccess({ key })
          },
          progressCallback: progress => {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
          },
          errorCallback: err => {
            console.error('Unexpected error while uploading', err)
            if (onUploadError) onUploadError(JSON.stringify(err), { key })
          },
        })
      })
    },
  })
  const rows = useAppropriateRows()
  const rowHeight = useAppropriateRowHeight(rows)

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview ?? ''))
  }, [])

  useEffect(() => {
    Promise.all(
      defaultFiles.map(async file => {
        const { key } = file
        let src = Cache.getItem(key)
        if (!src) {
          src = await Storage.get(key, {
            level: accessLevel,
            expires: cacheExpires / 1000, // validity of the URL, in seconds
          })
          Cache.setItem(key, src, {
            expires: new Date().getTime() + cacheExpires,
          })
        }
        return { key, src }
      })
    ).then(files => setFiles(files))
  }, [defaultFiles, accessLevel, cacheExpires])

  const hadleFileRemove = async (file: { key: string }) => {
    const { key } = file
    await Storage.remove(key, { level: accessLevel })
    setFiles(prevFiles => {
      return prevFiles.filter(file => file.key !== key)
    })
    if (onFileRemove) onFileRemove({ key })
  }

  return (
    <Box>
      <ImageList cols={rows} rowHeight={rowHeight}>
        {files.map((file, index) => {
          const { key, src, preview } = file
          return (
            <ImageListItem key={index} component={Paper} variant="outlined">
              <NextImage
                src={src || preview || ''}
                alt={key}
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
              <ImageListItemBar
                title={key}
                position="bottom"
                sx={{ background: 'rgba(0, 0, 0, 0.25)' }}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.84)' }}
                    aria-label={`info about ${key}`}
                    onClick={() => hadleFileRemove(file)}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          )
        })}
        <ImageListItem>
          <Button
            color="inherit"
            component="label"
            size="large"
            startIcon={<PhotoCamera />}
            sx={{
              border: '1px dashed grey',
              borderRadius: 0,
              height: rowHeight,
              width: 'auto',
            }}
          >
            上傳圖片
            <input {...getInputProps()} />
          </Button>
        </ImageListItem>
      </ImageList>
    </Box>
  )
}
