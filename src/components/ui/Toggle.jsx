import { motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Track = styled.button`
  width: 44px;
  height: 26px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  padding: 3px;
  background: ${p => p.$on ? theme.colors.gold : theme.colors.surface};
  border: 1px solid ${p => p.$on ? theme.colors.gold : 'rgba(184,150,106,0.2)'};
  transition: background 0.25s, border-color 0.25s;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`

const Thumb = styled(motion.div)`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${p => p.$on ? theme.colors.bg : theme.colors.muted};
`

export default function Toggle({ on, onChange, ariaLabel }) {
  return (
    <Track
      $on={on}
      onClick={() => onChange(!on)}
      aria-label={ariaLabel}
      role="switch"
      aria-checked={on}
    >
      <Thumb
        $on={on}
        animate={{ x: on ? 18 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    </Track>
  )
}
