const Switch = {
  defaultProps: {
    colorScheme: 'purple',
  },
  baseStyle: {
    track: {
      borderRadius: 20,
      width: '116px',
      height: '56px',
      alignItems: 'center',
      _focus: {
        boxShadow: 'none!important',
      },
    },
    thumb: {
      borderRadius: 16,
      width: '40px',
      height: '40px',
      transform: 'translateX(10px)',
      _checked: {
        transform: 'translateX(70px)',
      },
    },
  },
  sizes: {
    xl: {
      borderRadius: '16px',
      px: 6,
      letterSpacing: '0.1em',
      py: 2.5,
    },
  },
};

export default Switch;
