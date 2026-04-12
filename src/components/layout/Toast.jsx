import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react'
import { theme } from '../../styles/theme'
import { useToast, ToastContext } from '../../hooks/useToast'

const Container = styled.div`
  position: fixed;
  bottom: 88px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;

  @media (min-width: 769px) {
    bottom: 24px;
  }
`

const ToastItem = styled(motion.div)`
  background: ${theme.colors.surfaceRaised};
  border-left: 3px solid ${p =>
    p.$type === 'success' ? theme.colors.gold :
    p.$type === 'error' ? theme.colors.error :
    theme.colors.amber
  };
  border-radius: ${theme.radius.md};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 320px;
  box-shadow: ${theme.shadows.elevated};
  pointer-events: all;
`

const ToastMessage = styled.p`
  font-family: ${theme.fonts.sans};
  font-size: 0.85rem;
  color: ${theme.colors.cream};
  flex: 1;
`

const CloseBtn = styled.button`
  color: ${theme.colors.muted};
  padding: 2px;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 0;
  flex-shrink: 0;
`

const ICONS = {
  success: <CheckCircle size={16} color={theme.colors.gold} />,
  error: <AlertCircle size={16} color={theme.colors.error} />,
  info: <Info size={16} color={theme.colors.amber} />,
}

function ToastList() {
  const { toasts, removeToast } = useToast()

  return (
    <Container>
      <AnimatePresence>
        {toasts.map(t => (
          <ToastItem
            key={t.id}
            $type={t.type}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {ICONS[t.type] || ICONS.success}
            <ToastMessage>{t.message}</ToastMessage>
            <CloseBtn onClick={() => removeToast(t.id)} aria-label="Dismiss">
              <X size={14} />
            </CloseBtn>
          </ToastItem>
        ))}
      </AnimatePresence>
    </Container>
  )
}

export { ToastList }
export default ToastList
