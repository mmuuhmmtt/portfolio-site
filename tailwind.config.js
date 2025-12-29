/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#05050a',
          surface: '#0a0a15',
          card: '#0f0f1a',
          border: '#1a1a2e',
        },
        terminal: {
          green: '#00ff41',
          cyan: '#00ffff',
          amber: '#ffb000',
          red: '#ff0040',
          gray: '#6b7280',
        },
      },
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
        sans: ['Share Tech Mono', 'monospace'],
        retro: ['Share Tech Mono', 'monospace'],
      },
      boxShadow: {
        'terminal': '0 0 10px rgba(0, 255, 65, 0.2), inset 0 0 10px rgba(0, 255, 65, 0.05)',
        'terminal-glow': '0 0 20px rgba(0, 255, 65, 0.3), 0 0 40px rgba(0, 255, 65, 0.1)',
      },
    },
  },
  plugins: [],
}
