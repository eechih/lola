import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs'
import Link, { LinkProps } from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import NextLink from 'next/link'

export type WrappedBreadcrumbsProps = BreadcrumbsProps & {
  // An alternative to a property called "children" to quickly and easily define the content of a Breadcrumbs.
  // Note that the "children" property will take precedence over this.
  links?: LinkProps[]
}

export default function WrappedBreadcrumbs(props: WrappedBreadcrumbsProps) {
  const { children, links = [], ...rest } = props
  const theme = useTheme()
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{
        paddingY: theme.spacing(2),
        [theme.breakpoints.down('md')]: { paddingY: 0 },
      }}
      {...rest}
    >
      {children ||
        links.map((link, index) => {
          const { children, href, ...rest } = link
          return href ? (
            <Link
              component={NextLink}
              href={href}
              color="inherit"
              underline="hover"
              key={index}
              {...rest}
            >
              {children}
            </Link>
          ) : (
            <Typography color="text.primary" key={index} {...rest}>
              {children}
            </Typography>
          )
        })}
    </Breadcrumbs>
  )
}
