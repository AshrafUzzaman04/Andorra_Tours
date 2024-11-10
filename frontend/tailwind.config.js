module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        confetti: 'confetti 5s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotateZ(0deg)' },
          '100%': { transform: 'translateY(100vh) rotateZ(720deg)' },
        },
      },
    },
  },
  plugins: [],
}
