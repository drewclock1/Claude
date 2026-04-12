import { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BottomNav from './BottomNav'
import Sidebar from './Sidebar'
import Splash from './Splash'
import { ToastList } from './Toast'
import { theme } from '../../styles/theme'

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
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(26,22,18,0.98);
  border-bottom: 1px solid rgba(184,150,106,0.1);
  backdrop-filter: blur(20px);
  z-index: 90;

  @media (min-width: 769px) {
    margin-left: 240px;
  }
`

const Wordmark = styled.span`
  font-family: ${theme.fonts.serif};
  font-size: 0.95rem;
  color: ${theme.colors.gold};
  letter-spacing: 0.1em;
  font-weight: 400;

  @media (min-width: 769px) {
    display: none;
  }
`

const ViewToggle = styled.div`
  display: flex;
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.2);
  border-radius: ${theme.radius.full};
  padding: 2px;
`

const ViewBtn = styled.button`
  font-family: ${theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 500;
  padding: 5px 14px;
  border-radius: ${theme.radius.full};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 32px;
  background: ${p => p.$active ? theme.colors.gold : 'transparent'};
  color: ${p => p.$active ? theme.colors.bg : theme.colors.muted};
`

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
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

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769)
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 769)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isDesktop
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
        <Header>
          <Wordmark>AVARA HOME</Wordmark>
          <ViewToggle>
            <ViewBtn $active={view === 'client'} onClick={() => handleViewChange('client')}>
              Client
            </ViewBtn>
            <ViewBtn $active={view === 'owner'} onClick={() => handleViewChange('owner')}>
              Owner
            </ViewBtn>
          </ViewToggle>
        </Header>
        <Body>
          {view === 'client' && (
            isDesktop ? (
              <Sidebar client={client} unreadCount={unreadCount} />
            ) : (
              <BottomNav unreadCount={unreadCount} />
            )
          )}
          <MainContent style={view === 'owner' ? { marginLeft: 0 } : {}}>
            {children}
          </MainContent>
        </Body>
        <ToastList />
      </Shell>
    </ViewContext.Provider>
  )
}
