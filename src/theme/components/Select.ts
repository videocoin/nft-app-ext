const Select = {
  defaultProps: {
    size: 'lg',
    focusBorderColor: 'purple.500',
  },
  sizes: {
    lg: {
      field: {
        height: '80px',
        border: '2px solid #edf0f4',
        fontSize: '2xl',
        fontWeight: 500,
        pl: 30,
        pr: 55,
        borderRadius: 30,
      },
      icon: {
        insetEnd: '1rem',
        width: '2.5rem',
        fontSize: '2rem',
      },
    },
  },
};

export default Select;
