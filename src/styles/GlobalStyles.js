import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  :root {
    --bg: ${theme.colors.bg};
    --surface: ${theme.colors.surface};
    --surface-raised: ${theme.colors.surfaceRaised};
    --gold: ${theme.colors.gold};
    --gold-light: ${theme.colors.goldLight};
    --cream: ${theme.colors.cream};
    --muted: ${theme.colors.muted};
    --faint: ${theme.colors.faint};
    --success: ${theme.colors.success};
    --amber: ${theme.colors.amber};
    --error: ${theme.colors.error};
  }

  html, body, #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.cream};
    font-family: ${theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: ${theme.colors.gold};
    color: ${theme.colors.bg};
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(184,150,106,0.3);
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(184,150,106,0.5);
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    border: none;
    cursor: pointer;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *:focus-visible {
    outline: 2px solid ${theme.colors.gold};
    outline-offset: 2px;
  }
`

export default GlobalStyles
