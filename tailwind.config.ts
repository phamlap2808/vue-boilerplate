import fs from 'node:fs'

import { iconsPlugin } from '@egoist/tailwindcss-icons'
import {
  cleanupSVG,
  importDirectorySync,
  // isEmptyColor,
  // parseColors,
  runSVGO,
} from '@iconify/tools'

import type { Config } from 'tailwindcss'

function getCollections(dir: string, size?: { width: number, height: number }) {
  // Import icons
  const iconSet = importDirectorySync(dir, {
    // prefix: '',
  })

  // Validate, clean up, fix palette and optimise
  iconSet.forEachSync((name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = iconSet.toSVG(name)

    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      cleanupSVG(svg)

      // Optimise
      runSVGO(svg)
    }
    catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    if (size) {
      svg.viewBox = {
        left: 0,
        top: 0,
        ...size,
      }
    }
    iconSet.fromSVG(name, svg)
  })

  // Export
  // console.info('::[tailwind icons]:::======\n', dir, iconSet.export())
  return iconSet.export()
}

function getSingleIcon(filePath: string, width: number, height: number, needTrimSvgTag = true) {
  const svg = fs.readFileSync(filePath, 'utf-8')
  return {
    width,
    height,
    body: needTrimSvgTag ? svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '') : svg,
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-animated'),
    require('tailwindcss-mixins'),
    require('tailwindcss-multi'),
    iconsPlugin({
      scale: 1.2,
      collections: {
        custom: {
          icons: {
            ...getCollections('./src/assets/icons/custom').icons,
          }
        }
      }
    })
  ],
} satisfies Config

