import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Home, Building2, Star, Compass, MessageCircle } from 'lucide-react'
import { theme } from '../../styles/theme'

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(26,22,18,0.96);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(184,150,106,0.12);
  display: flex;
  align-items: center;
  z-index: 100;
  padding: 0 4px;
  padding-bottom: env(safe-area-inset-bottom, 0);
`

const Tab = styled(motion.button)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 100%;
  position: relative;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`

const TabLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.62rem;
  font-weight: 500;
  color: ${p => p.$active ? theme.colors.gold : 'transparent'};
  transition: color 0.2s;
  line-height: 1;
`

const ActiveDot = styled(motion.div)`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  position: absolute;
  bottom: 6px;
`

const Badge = styled.div`
  position: absolute;
  top: 6px;
  right: calc(50% - 18px);
  background: ${theme.colors.gold};
  color: ${theme.colors.bg};
  font-size: 0.55rem;
  font-weight: 700;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TABS = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/property', label: 'My Home', Icon: Building2 },
  { path: '/requests', label: 'Requests', Icon: Star },
  { path: '/lifestyle', label: 'Lifestyle', Icon: Compass },
  { path: '/messages', label: 'Messages', Icon: MessageCircle },
]

export default function BottomNav({ unreadCount = 0 }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home'
    return location.pathname.startsWith(path)
  }

  return (
    <Nav>
      {TABS.map(({ path, label, Icon }) => {
        const active = isActive(path)
        return (
          <Tab
            key={path}
            onClick={() => navigate(path)}
            aria-label={label}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Icon
              size={22}
              color={active ? theme.colors.gold : theme.colors.faint}
              strokeWidth={active ? 2 : 1.5}
            />
            <TabLabel $active={active}>{label}</TabLabel>
            {active && (
              <ActiveDot
                layoutId="navDot"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {path === '/messages' && unreadCount > 0 && (
              <Badge>{unreadCount > 9 ? '9+' : unreadCount}</Badge>
            )}
          </Tab>
        )
      })}
    </Nav>
  )
}
