import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link, { LinkBaseProps } from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

type BreadcrumbsProps = {
  links: LinkBaseProps[]
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const { links } = props
  const theme = useTheme()
  const router = useRouter()
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ paddingY: theme.spacing(2) }}
    >
      {links.map((link, index, array) => {
        const { children, href } = link
        const last = index === array.length - 1
        return last ? (
          <Typography color="text.primary" key={index}>
            {children}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => router.push(href ?? '')}
            sx={{ cursor: 'pointer' }}
          >
            {children}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
