import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Home, Building2, Star, Compass, MessageCircle } from 'lucide-react'
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
  padding: 28px 24px 20px;
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
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: ${theme.radius.md};
  width: 100%;
  background: ${p => p.$active ? theme.colors.goldPale : 'none'};
  border: none;
  border-left: 2px solid ${p => p.$active ? theme.colors.gold : 'transparent'};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${theme.colors.surface};
  }
`

const NavLabel = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: 0.88rem;
  font-weight: ${p => p.$active ? 500 : 400};
  color: ${p => p.$active ? theme.colors.gold : theme.colors.muted};
`

const SidebarFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid rgba(184,150,106,0.12);
  display: flex;
  align-items: center;
  gap: 12px;
`

const AvatarCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${theme.colors.gold};
  color: ${theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.sans};
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
`

const ClientName = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.cream};
  font-weight: 500;
`

const TierBadge = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: 0.62rem;
  color: ${theme.colors.gold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
`

const TABS = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/property', label: 'My Home', Icon: Building2 },
  { path: '/requests', label: 'Requests', Icon: Star },
  { path: '/lifestyle', label: 'Lifestyle', Icon: Compass },
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
            <NavItem
              key={path}
              $active={active}
              onClick={() => navigate(path)}
              aria-label={label}
            >
              <Icon
                size={18}
                color={active ? theme.colors.gold : theme.colors.muted}
                strokeWidth={active ? 2 : 1.5}
              />
              <NavLabel $active={active}>
                {label}
                {path === '/messages' && unreadCount > 0 && ` (${unreadCount})`}
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
