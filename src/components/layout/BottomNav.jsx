import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Home, Building2, Star, CalendarDays, MessageCircle } from 'lucide-react'
import { theme } from '../../styles/theme'

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(26,22,18,0.97);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(184,150,106,0.15);
  display: flex;
  align-items: stretch;
  z-index: 200;
  padding-bottom: env(safe-area-inset-bottom, 0);
`

const Tab = styled.button`
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
  position: relative;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`

const TabLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  font-weight: 500;
  color: ${p => p.$active ? theme.colors.gold : theme.colors.faint};
  transition: color 0.15s;
  line-height: 1;
`

const GoldDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  margin-top: 1px;
  opacity: ${p => p.$show ? 1 : 0};
`

const MsgBadge = styled.div`
  position: absolute;
  top: 6px;
  right: calc(50% - 20px);
  background: ${theme.colors.gold};
  color: ${theme.colors.bg};
  font-size: 0.5rem;
  font-weight: 700;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TABS = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/property', label: 'My Home', Icon: Building2 },
  { path: '/requests', label: 'Requests', Icon: Star },
  { path: '/events', label: 'Events', Icon: CalendarDays },
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
          <Tab key={path} onClick={() => navigate(path)} aria-label={label}>
            <Icon
              size={21}
              color={active ? theme.colors.gold : theme.colors.faint}
              strokeWidth={active ? 2 : 1.5}
            />
            <TabLabel $active={active}>{label}</TabLabel>
            <GoldDot $show={active} />
            {path === '/messages' && unreadCount > 0 && (
              <MsgBadge>{unreadCount > 9 ? '9+' : unreadCount}</MsgBadge>
            )}
          </Tab>
        )
      })}
    </Nav>
  )
}
