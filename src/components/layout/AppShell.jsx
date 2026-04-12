import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import Sidebar from './Sidebar'
import Splash from './Splash'
import { ToastList } from './Toast'
import { theme } from '../../styles/theme'

const Shell = styled.div`
  height: 100dvh;
  display: flex;
  overflow: hidden;
`

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 80px;
  position: relative;

  @media (min-width: 769px) {
    margin-left: 240px;
    padding-bottom: 0;
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
  const [showSplash, setShowSplash] = useState(() => {
    const splashed = sessionStorage.getItem('avara_splashed')
    return !splashed
  })

  useEffect(() => {
    if (showSplash) {
      const t = setTimeout(() => {
        setShowSplash(false)
        sessionStorage.setItem('avara_splashed', '1')
      }, 1800)
      return () => clearTimeout(t)
    }
  }, [showSplash])

  return (
    <Shell>
      <Splash show={showSplash} />
      {isDesktop ? (
        <Sidebar client={client} unreadCount={unreadCount} />
      ) : (
        <BottomNav unreadCount={unreadCount} />
      )}
      <MainContent>
        {children}
      </MainContent>
      <ToastList />
    </Shell>
  )
}
