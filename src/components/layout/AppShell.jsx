import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BottomNav from './BottomNav'
import Sidebar from './Sidebar'
import Splash from './Splash'
import { ToastList } from './Toast'
import { theme } from '../../styles/theme'
import { LayoutDashboard, Users, MessageSquare, Home } from 'lucide-react'

// View context so all screens can know if we're in owner mode
export const ViewContext = createContext({ view: 'client', setView: () => {} })
export const useView = () => useContext(ViewContext)

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  background: ${theme.colors.bg};
`

const Header = styled.header`
  flex-shrink: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: ${p => p.$ownerMode ? 'rgba(16,14,10,0.99)' : 'rgba(26,22,18,0.98)'};
  border-bottom: 1px solid ${p => p.$ownerMode ? 'rgba(184,150,106,0.25)' : 'rgba(184,150,106,0.1)'};
  backdrop-filter: blur(20px);
  z-index: 90;
  position: relative;

  @media (min-width: 769px) {
    margin-left: ${p => p.$ownerMode ? '0' : '240px'};
  }
`

const Wordmark = styled.span`
  font-family: ${theme.fonts.serif};
  font-size: 0.92rem;
  color: ${theme.colors.gold};
  letter-spacing: 0.1em;
  font-weight: 400;

  @media (min-width: 769px) {
    display: none;
  }
`

const OwnerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 600;
  color: ${theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const OwnerDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.gold};
`

const ViewToggle = styled.div`
  display: flex;
  background: rgba(184,150,106,0.08);
  border: 1px solid rgba(184,150,106,0.22);
  border-radius: ${theme.radius.full};
  padding: 3px;
`

const ViewBtn = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: ${theme.radius.full};
  border: none;
  cursor: pointer;
  transition: all 0.18s;
  min-height: 34px;
  min-width: 60px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  background: ${p => p.$active ? theme.colors.gold : 'transparent'};
  color: ${p => p.$active ? theme.colors.bg : theme.colors.muted};
  letter-spacing: 0.03em;
`

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));

  @media (min-width: 769px) {
    margin-left: 240px;
    padding-bottom: 24px;
  }
`

const OwnerMainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));

  @media (min-width: 769px) {
    margin-left: 220px;
    padding-bottom: 24px;
  }
`

/* Owner Sidebar (desktop) */
const OwnerSidebarWrap = styled.aside`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: 220px;
    height: 100vh;
    background: rgba(16,14,10,0.99);
    border-right: 1px solid rgba(184,150,106,0.15);
    z-index: 50;
    padding: 24px 0 20px;
  }
`

const OwnerSidebarHeader = styled.div`
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(184,150,106,0.1);
  margin-bottom: 12px;
`

const OwnerWordmark = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 0.95rem;
  color: ${theme.colors.gold};
  letter-spacing: 0.1em;
  margin-bottom: 3px;
`

const OwnerModeBadge = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  font-weight: 700;
  color: ${theme.colors.gold};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.7;
`

const OwnerNavList = styled.nav`
  flex: 1;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const OwnerNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: ${theme.radius.md};
  width: 100%;
  background: ${p => p.$active ? 'rgba(184,150,106,0.1)' : 'none'};
  border: none;
  border-left: 2px solid ${p => p.$active ? theme.colors.gold : 'transparent'};
  cursor: pointer;
  transition: background 0.15s;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover { background: rgba(184,150,106,0.06); }
`

const OwnerNavLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: ${p => p.$active ? 500 : 400};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
`

/* Owner Bottom Nav (mobile) */
const OwnerBottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(16,14,10,0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(184,150,106,0.2);
  display: flex;
  align-items: stretch;
  z-index: 200;
  padding-bottom: env(safe-area-inset-bottom, 0);

  @media (min-width: 769px) {
    display: none;
  }
`

const OwnerTab = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 4px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
`

const OwnerTabLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  font-weight: 500;
  color: ${p => p.$active ? theme.colors.gold : theme.colors.faint};
  line-height: 1;
`

const OwnerGoldDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  margin-top: 1px;
  opacity: ${p => p.$show ? 1 : 0};
`

const OWNER_TABS = [
  { path: '/owner', label: 'Overview', Icon: LayoutDashboard },
  { path: '/owner/clients', label: 'Clients', Icon: Users },
  { path: '/owner/messages', label: 'Messages', Icon: MessageSquare },
]

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769)
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 769)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isDesktop
}

function OwnerSidebar({ navigate, pathname }) {
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')
  return (
    <OwnerSidebarWrap>
      <OwnerSidebarHeader>
        <OwnerWordmark>AVARA HOME</OwnerWordmark>
        <OwnerModeBadge>Operator Portal</OwnerModeBadge>
      </OwnerSidebarHeader>
      <OwnerNavList>
        {OWNER_TABS.map(({ path, label, Icon }) => {
          const active = isActive(path)
          return (
            <OwnerNavItem key={path} $active={active} onClick={() => navigate(path)}>
              <Icon size={17} color={active ? theme.colors.gold : theme.colors.muted} strokeWidth={active ? 2 : 1.5} />
              <OwnerNavLabel $active={active}>{label}</OwnerNavLabel>
            </OwnerNavItem>
          )
        })}
      </OwnerNavList>
    </OwnerSidebarWrap>
  )
}

function OwnerMobileNav({ navigate, pathname }) {
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/')
  return (
    <OwnerBottomNav>
      {OWNER_TABS.map(({ path, label, Icon }) => {
        const active = isActive(path)
        return (
          <OwnerTab key={path} onClick={() => navigate(path)} aria-label={label}>
            <Icon size={21} color={active ? theme.colors.gold : theme.colors.faint} strokeWidth={active ? 2 : 1.5} />
            <OwnerTabLabel $active={active}>{label}</OwnerTabLabel>
            <OwnerGoldDot $show={active} />
          </OwnerTab>
        )
      })}
    </OwnerBottomNav>
  )
}

export default function AppShell({ client, children, unreadCount = 0 }) {
  const isDesktop = useIsDesktop()
  const navigate = useNavigate()
  const location = useLocation()
  const [view, setView] = useState(() => localStorage.getItem('avara_view') || 'client')
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('avara_splashed'))

  useEffect(() => {
    if (showSplash) {
      const t = setTimeout(() => {
        setShowSplash(false)
        sessionStorage.setItem('avara_splashed', '1')
      }, 1800)
      return () => clearTimeout(t)
    }
  }, [showSplash])

  const isOwner = view === 'owner'

  const handleViewChange = (newView) => {
    setView(newView)
    localStorage.setItem('avara_view', newView)
    if (newView === 'owner') {
      navigate('/owner')
    } else {
      navigate('/')
    }
  }

  return (
    <ViewContext.Provider value={{ view, setView }}>
      <Shell>
        <Splash show={showSplash} />
        <Header $ownerMode={isOwner}>
          {isOwner ? (
            <OwnerBadge>
              <OwnerDot />
              Operator Portal
            </OwnerBadge>
          ) : (
            <Wordmark>AVARA HOME</Wordmark>
          )}
          <ViewToggle>
            <ViewBtn $active={!isOwner} onClick={() => handleViewChange('client')}>
              Client
            </ViewBtn>
            <ViewBtn $active={isOwner} onClick={() => handleViewChange('owner')}>
              Owner
            </ViewBtn>
          </ViewToggle>
        </Header>

        <Body>
          {isOwner ? (
            <>
              {isDesktop && <OwnerSidebar navigate={navigate} pathname={location.pathname} />}
              <OwnerMainContent>
                {children}
              </OwnerMainContent>
              {!isDesktop && <OwnerMobileNav navigate={navigate} pathname={location.pathname} />}
            </>
          ) : (
            <>
              {isDesktop && <Sidebar client={client} unreadCount={unreadCount} />}
              <MainContent>
                {children}
              </MainContent>
              {!isDesktop && <BottomNav unreadCount={unreadCount} />}
            </>
          )}
        </Body>

        <ToastList />
      </Shell>
    </ViewContext.Provider>
  )
}
