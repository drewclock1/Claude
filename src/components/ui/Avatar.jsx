import styled from 'styled-components'
import { theme } from '../../styles/theme'

const AvatarCircle = styled.div`
  width: ${p => p.$size || '40px'};
  height: ${p => p.$size || '40px'};
  border-radius: 50%;
  background: ${p => p.$bg || theme.colors.gold};
  color: ${p => p.$color || theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.sans};
  font-size: ${p => p.$fontSize || '0.85rem'};
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 0.02em;
`

export default function Avatar({ initials, size, bg, color, fontSize }) {
  return (
    <AvatarCircle $size={size} $bg={bg} $color={color} $fontSize={fontSize}>
      {initials}
    </AvatarCircle>
  )
}
