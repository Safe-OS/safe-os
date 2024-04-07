import type { ReactElement, ReactNode } from 'react'
import { SvgIcon, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from './styles.module.css'
import { AppRoutes } from '@/config/routes'
import packageJson from '../../../../package.json'
import ExternalLink from '../ExternalLink'
import MUILink from '@mui/material/Link'
import { HELP_CENTER_URL, IS_DEV, IS_OFFICIAL_HOST } from '@/config/constants'
import AddressBookButton from '@/components/floatingnavbar/AddressBookButton'
import AssetsButton from '@/components/floatingnavbar/AssetsButton'
import TransactionsButton from '@/components/floatingnavbar/TransactionsButton'
import AppsButton from '@/components/floatingnavbar/AppsButton'
import SettingsButton from '@/components/floatingnavbar/SettingsButton'
import AssetsIcon from '@/public/images/safe-logo-green.png'

const footerPages = [AppRoutes.home]

const FooterLink = ({ children, href }: { children: ReactNode; href: string }): ReactElement => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </Link>
  ) : (
    <MUILink>{children}</MUILink>
  )
}

const BottomNav = (): ReactElement | null => {
  const router = useRouter()

  if (!footerPages.some((path) => router.pathname.startsWith(path))) {
    return null
  }

  const getHref = (path: string): string => {
    return router.pathname === path ? '' : path
  }

  return (
    <footer className={css.container}>
      <ul>
        {IS_OFFICIAL_HOST || IS_DEV ? (
          <>
            <li>
              <Typography variant="caption">&copy;2022–{new Date().getFullYear()} Core Contributors GmbH</Typography>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.terms)}>Terms</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.privacy)}>Privacy</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.licenses)}>Licenses</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.imprint)}>Imprint</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.cookie)}>Cookie policy</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.settings.index)}>Preferences</FooterLink>
            </li>
            <li>
              <ExternalLink href={HELP_CENTER_URL} noIcon sx={{ span: { textDecoration: 'underline' } }}>
                Help
              </ExternalLink>
            </li>
          </>
        ) : (
          <></>
        )}

        <li>
          <ExternalLink href={`${packageJson.homepage}/releases/tag/v${packageJson.version}`} noIcon>
            <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> v{packageJson.version}
          </ExternalLink>
        </li>
        <li>
          <AddressBookButton>
            <Typography variant="caption">Address book</Typography>
          </AddressBookButton>
        </li>
        <li>
          <AssetsButton>
            <SvgIcon component={AssetsIcon} width={60} height={60} />
          </AssetsButton>
        </li>
        <li>
          <TransactionsButton>
            <Typography variant="caption">Transactions</Typography>
          </TransactionsButton>
        </li>
        <li>
          <AppsButton>
            <Typography variant="caption">Apps</Typography>
          </AppsButton>
        </li>
        <li>
          <SettingsButton>
            <Typography variant="caption">Settings</Typography>
          </SettingsButton>
        </li>      
      </ul>
    </footer>
  )
}

export default BottomNav
