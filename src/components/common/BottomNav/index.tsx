import type { ReactElement, ReactNode } from 'react'
import { SvgIcon, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Tooltip from '@mui/material/Tooltip'
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
import AssetsNavIcon from '@/public/images/sidebar/AssetsNav.png'
import AppsNavIcon from '@/public/images/sidebar/AppsNav.png'
import SettingsNavIcon from '@/public/images/sidebar/SettingsNav.png'
import AddressBookNavIcon from '@/public/images/sidebar/AddressBookNav.png'
import TransactionsNavIcon from '@/public/images/sidebar/TransactionsNav.png'
import Image from 'next/image'

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
            <Tooltip title="Address book" placement="top" arrow>
              <Image src={AddressBookNavIcon} alt="Address book Icon" width={60} height={60} />
            </Tooltip>
          </AddressBookButton>
        </li>
        <li>
          <AssetsButton>
            <Tooltip title="Assets" placement="top" arrow>
              <Image src={AssetsNavIcon} alt="Assets Icon" width={60} height={60} />
            </Tooltip>
          </AssetsButton>
        </li>
        <li>
          <TransactionsButton>
            <Tooltip title="Transactions" placement="top" arrow>
              <Image src={TransactionsNavIcon} alt="Transactions Icon" width={60} height={60} />
            </Tooltip>
          </TransactionsButton>
        </li>
        <li>
          <AppsButton>
            <Tooltip title="Apps" placement="top" arrow>
              <Image src={AppsNavIcon} alt="Apps Icon" width={60} height={60} />
            </Tooltip>
          </AppsButton>
        </li>
        <li>
          <SettingsButton>
            <Tooltip title="Settings" placement="top" arrow>
              <Image src={SettingsNavIcon} alt="Settings Icon" width={60} height={60} />
            </Tooltip>
          </SettingsButton>
        </li>      
      </ul>
    </footer>
  )
}

export default BottomNav
