import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${theme.colors.bg};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const Wordmark = styled(motion.div)`
  font-family: ${theme.fonts.serif};
  font-size: 1.8rem;
  color: ${theme.colors.cream};
  letter-spacing: 0.15em;
  font-weight: 400;
`

const GoldLine = styled(motion.div)`
  height: 1px;
  background: ${theme.colors.gold};
  border-radius: 1px;
`

const Tagline = styled(motion.p)`
  font-family: ${theme.fonts.sans};
  font-size: 0.75rem;
  color: ${theme.colors.muted};
  letter-spacing: 0.05em;
`

export default function Splash({ show, onDone }) {
  return (
    <AnimatePresence>
      {show && (
        <Overlay
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Wordmark
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AVARA HOME
          </Wordmark>

          <GoldLine
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />

          <Tagline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            Your home, handled.
          </Tagline>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
