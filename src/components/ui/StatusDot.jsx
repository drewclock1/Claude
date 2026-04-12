import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Dot = styled.span`
  display: inline-block;
  width: ${p => p.$size || '8px'};
  height: ${p => p.$size || '8px'};
  border-radius: 50%;
  flex-shrink: 0;
  background: ${p => {
    switch (p.$status) {
      case 'good':
      case 'clear': return theme.colors.success
      case 'attention': return theme.colors.amber
      case 'critical':
      case 'issue': return theme.colors.error
      default: return theme.colors.faint
    }
  }};
`

export default Dot
