import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: ${theme.radius.full};
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.micro};
  font-weight: 500;
  letter-spacing: 0.04em;
  white-space: nowrap;

  ${p => {
    switch (p.$variant) {
      case 'completed':
        return `background: ${theme.colors.successBg}; color: ${theme.colors.success};`
      case 'in_progress':
        return `background: ${theme.colors.amberBg}; color: ${theme.colors.amber};`
      case 'new':
        return `background: ${theme.colors.goldPale}; color: ${theme.colors.gold};`
      case 'urgent':
        return `background: ${theme.colors.errorBg}; color: ${theme.colors.error};`
      case 'gold':
        return `background: ${theme.colors.gold}; color: ${theme.colors.bg};`
      case 'tier':
        return `background: rgba(184,150,106,0.12); color: ${theme.colors.gold}; border: 1px solid rgba(184,150,106,0.25);`
      default:
        return `background: ${theme.colors.surface}; color: ${theme.colors.muted};`
    }
  }}
`

export function StatusBadge({ status }) {
  const labels = {
    completed: 'Completed',
    in_progress: 'In Progress',
    new: 'Received',
    confirmed: 'Confirmed',
  }

  return (
    <Badge $variant={status}>
      {labels[status] || status}
    </Badge>
  )
}

export default Badge
