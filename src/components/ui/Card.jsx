import { motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Card = styled(motion.div)`
  background: ${p => p.$bg || theme.colors.surface};
  border: 1px solid ${p => p.$border || theme.colors.surfaceBorder};
  border-radius: ${p => p.$radius || theme.radius.lg};
  padding: ${p => p.$padding || '20px'};
  box-shadow: ${theme.shadows.card};
`

export const GoldCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid rgba(184,150,106,0.25);
  border-radius: ${theme.radius.lg};
  padding: ${p => p.$padding || '20px'};
  box-shadow: ${theme.shadows.goldGlow};
`

export default Card
