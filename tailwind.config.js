module.exports = {
    theme: {
      extend: {
        keyframes: {
          fadeOut: {
            '0%': { opacity: 1 },
            '100%': { opacity: 0 },
          },
        },
        animation: {
          fadeOut: 'fadeOut 2s forwards',
        },
      },
    },
    plugins: [],
  };
  