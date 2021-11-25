const Button = {
  defaultProps: {
    size: 'lg',
  },
  variants: {
    outline: {
      bg: 'white',
      color: 'purple.500',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.06)',
      _hover: {
        borderColor: 'purple.500',
        bg: 'white',
      },
    },
    solid: {
      bg: 'linear-gradient(275.14deg, #7549D4 0%, #E2486A 35.94%, #ED6858 69.79%, #F09051 100%)',
      color: 'white',
      _active: {
        bg: 'linear-gradient(275.14deg, #7549D4 0%, #E2486A 35.94%, #ED6858 69.79%, #F09051 100%)',
      },
      _hover: {
        bg: 'linear-gradient(275.14deg, #7549D4 0%, #E2486A 35.94%, #ED6858 69.79%, #F09051 100%)!important',
      },
    },
  },
  sizes: {
    lg: {
      px: 12,
      borderRadius: 30,
      fontSize: '2xl',
      height: '100px',
    },
    md: {
      px: 12,
      borderRadius: 20,
      fontSize: '19px',
      height: '60px',
    },
  },
};

export default Button;
