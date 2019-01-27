import { generate } from 'grommet/themes'

import { deepMerge } from 'grommet/utils'

const brandColor = '#6534FF'

const baseSpacing = 24
const scale = 8

export const theme = deepMerge(generate(baseSpacing, scale), {
  global: {
    spacingValue: baseSpacing,
    animation: {
      duration: '1s',
      medium: '0.5s ease',
      jiggle: {
        duration: '0.1s',
      },
    },
    colors: {
      brand: brandColor,
      background: '#FFFFFF',
      selected: brandColor,
      text: {
        dark: '#f8f8f8',
        light: '#444444',
      },
      white: '#FFFFFF',
    },
    font: {
      family: 'Noto Serif, sans-serif',
      weight: 300,
    },
    breakpoints: {
      small: {
        value: baseSpacing * 32, // 0 - 768
      },
      medium: {
        value: baseSpacing * 48, // 0 - 1152
      },
      large: {
        value: baseSpacing * 64, // 0 - 1536
      },
    },
  },
})

export type Theme = typeof theme

export interface ThemeProps {
  theme: Theme
}
