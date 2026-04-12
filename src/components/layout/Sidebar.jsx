import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Home, Building2, Star, CalendarDays, MessageCircle } from 'lucide-react'
import { theme } from '../../styles/theme'

const SidebarWrap = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  background: rgba(26,22,18,0.98);
  border-right: 1px solid rgba(184,150,106,0.12);
  display: flex;
  flex-direction: column;
  z-index: 50;
`

const SidebarHeader = styled.div`
  padding: 24px 24px 18px;
  border-bottom: 1px solid rgba(184,150,106,0.12);
`

const WordmarkText = styled.div`
  font-family: ${theme.fonts.serif};
  font-size: 1rem;
  color: ${theme.colors.gold};
  letter-spacing: 0.1em;
  font-weight: 400;
`

const TaglineText = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: 0.7rem;
  color: ${theme.colors.muted};
  margin-top: 4px;
`

const NavList = styled.nav`
  flex: 1;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

const NavItem = styled.button`
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

  &:hover { background: ${theme.colors.surface}; }
`

const NavLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: ${p => p.$active ? 500 : 400};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
`

const SidebarFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid rgba(184,150,106,0.12);
  display: flex;
  align-items: center;
  gap: 12px;
`

const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  color: ${theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
`

const ClientName = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: 0.83rem;
  color: ${theme.colors.cream};
  font-weight: 500;
`

const TierBadge = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: 0.6rem;
  color: ${theme.colors.gold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
`

const TABS = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/property', label: 'My Home', Icon: Building2 },
  { path: '/requests', label: 'Requests', Icon: Star },
  { path: '/events', label: 'Events', Icon: CalendarDays },
  { path: '/messages', label: 'Messages', Icon: MessageCircle },
]

export default function Sidebar({ client, unreadCount = 0 }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/home'
    return location.pathname.startsWith(path)
  }

  return (
    <SidebarWrap>
      <SidebarHeader>
        <WordmarkText>AVARA HOME</WordmarkText>
        <TaglineText>Your home, handled.</TaglineText>
      </SidebarHeader>

      <NavList>
        {TABS.map(({ path, label, Icon }) => {
          const active = isActive(path)
          return (
            <NavItem key={path} $active={active} onClick={() => navigate(path)} aria-label={label}>
              <Icon size={17} color={active ? theme.colors.gold : theme.colors.muted} strokeWidth={active ? 2 : 1.5} />
              <NavLabel $active={active}>
                {label}{path === '/messages' && unreadCount > 0 && ` (${unreadCount})`}
              </NavLabel>
            </NavItem>
          )
        })}
      </NavList>

      {client && (
        <SidebarFooter>
          <AvatarCircle>{client.avatar}</AvatarCircle>
          <div>
            <ClientName>{client.name}</ClientName>
            <TierBadge>Tier {client.tier} Member</TierBadge>
          </div>
        </SidebarFooter>
      )}
    </SidebarWrap>
  )
}
