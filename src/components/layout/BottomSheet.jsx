import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 500;
`

const Sheet = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 92dvh;
  overflow-y: auto;
  background: ${theme.colors.surfaceRaised};
  border-radius: ${theme.radius.xl} ${theme.radius.xl} 0 0;
  z-index: 501;
  padding: 0 0 env(safe-area-inset-bottom, 24px);

  @media (min-width: 769px) {
    bottom: auto;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    max-width: 480px;
    border-radius: ${theme.radius.xl};
    max-height: 90vh;
  }
`

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: ${theme.colors.faint};
  border-radius: 2px;
  margin: 12px auto 0;
`

const SheetTitle = styled.h2`
  font-family: ${theme.fonts.serif};
  font-size: 1.3rem;
  color: ${theme.colors.cream};
  font-weight: 400;
  padding: 16px 24px 0;
`

const SheetBody = styled.div`
  padding: 16px 24px 24px;
`

export default function BottomSheet({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <Sheet
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <Handle />
            {title && <SheetTitle>{title}</SheetTitle>}
            <SheetBody>{children}</SheetBody>
          </Sheet>
        </>
      )}
    </AnimatePresence>
  )
}
