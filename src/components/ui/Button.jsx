import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { theme } from '../../styles/theme'

const base = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-family: ${theme.fonts.sans};
  font-weight: 500;
  border-radius: ${theme.radius.full};
  transition: opacity 0.15s;
  white-space: nowrap;
  text-align: center;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Primary = styled(motion.button)`
  ${base}
  background: ${theme.colors.gold};
  color: ${theme.colors.bg};
  font-size: 0.95rem;
  padding: 0 28px;
  height: 52px;
  width: ${p => p.$fullWidth ? '100%' : 'auto'};
`

const Secondary = styled(motion.button)`
  ${base}
  background: ${theme.colors.surface};
  color: ${theme.colors.cream};
  border: 1px solid rgba(184,150,106,0.3);
  font-size: 0.9rem;
  padding: 0 24px;
  height: 46px;
  width: ${p => p.$fullWidth ? '100%' : 'auto'};
`

const Ghost = styled(motion.button)`
  ${base}
  background: none;
  color: ${theme.colors.muted};
  border: 1px solid rgba(140,126,114,0.3);
  font-size: 0.88rem;
  padding: 0 20px;
  height: 42px;
  width: ${p => p.$fullWidth ? '100%' : 'auto'};
`

const tapAnim = { scale: 0.97 }
const tapSpring = { type: 'spring', stiffness: 400, damping: 25 }

export function PrimaryButton({ children, fullWidth, ...props }) {
  return (
    <Primary
      $fullWidth={fullWidth}
      whileTap={tapAnim}
      transition={tapSpring}
      {...props}
    >
      {children}
    </Primary>
  )
}

export function SecondaryButton({ children, fullWidth, ...props }) {
  return (
    <Secondary
      $fullWidth={fullWidth}
      whileTap={tapAnim}
      transition={tapSpring}
      {...props}
    >
      {children}
    </Secondary>
  )
}

export function GhostButton({ children, fullWidth, ...props }) {
  return (
    <Ghost
      $fullWidth={fullWidth}
      whileTap={tapAnim}
      transition={tapSpring}
      {...props}
    >
      {children}
    </Ghost>
  )
}
