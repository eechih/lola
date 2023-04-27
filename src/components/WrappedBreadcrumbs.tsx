import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs'
import Link, { LinkProps } from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

type WrappedBreadcrumbsProps = BreadcrumbsProps & {
  // An alternative to a property called "children" to quickly and easily define the content of a Breadcrumbs.
  // Note that the "children" property will take precedence over this.
  links?: LinkProps[]
}

export default function WrappedBreadcrumbs(props: WrappedBreadcrumbsProps) {
  const { children, links = [], ...rest } = props
  const theme = useTheme()
  const router = useRouter()
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ paddingY: theme.spacing(2) }}
      {...rest}
    >
      {children ||
        links.map((link, index, array) => {
          const { children, href } = link
          const last = index === array.length - 1
          return last ? (
            <Typography color="text.primary" key={index}>
              {children}
            </Typography>
          ) : (
            <Link
              color="inherit"
              onClick={() => router.push(href ?? '')}
              sx={{ cursor: 'pointer' }}
              underline="hover"
            >
              {children}
            </Link>
          )
        })}
    </Breadcrumbs>
  )
}
