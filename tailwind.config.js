/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nexuRed: '#FF3B3F',
        nexuRedDeep: '#E12A2E',
        nexuCyan: '#9DF1F5',
        nexuCyanDeep: '#2BD4DE',
        nexuInk: '#0F1226',
        nexuInkSoft: '#5B6076',
        nexuLine: '#E7E9F0',
        nexuMist: '#F6F7FB'
      },
      boxShadow: {
        tactile: '0 1px 0 rgba(15,18,38,0.04), 0 8px 22px -12px rgba(15,18,38,0.18)',
        tactilePress: '0 1px 0 rgba(15,18,38,0.04), 0 2px 6px -2px rgba(15,18,38,0.18)',
        glowRed: '0 0 0 6px rgba(255,59,63,0.18)',
        glowCyan: '0 0 0 6px rgba(43,212,222,0.20)'
      },
      keyframes: {
        livePulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(43,212,222,0.55)' },
          '50%': { boxShadow: '0 0 0 14px rgba(43,212,222,0)' }
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        }
      },
      animation: {
        livePulse: 'livePulse 1.6s ease-in-out infinite',
        floatSoft: 'floatSoft 3s ease-in-out infinite',
        shimmer: 'shimmer 1.4s linear infinite'
      }
    }
  },
  plugins: []
}
