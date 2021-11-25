import colors from 'theme/colors';
import components from 'theme/components';
import fonts from 'theme/fonts';
import radii from 'theme/radii';
import styles from 'theme/styles';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors,
  fonts,
  radii,
  styles,
  components,
  shadows: {
    outline: '0 !important',
  },
  fontSizes: {
    sm: '0.81rem',
  },
  sizes: {
    container: {
      lg: '1152px',
      xl: '1432px',
      xxl: '1520px',
    },
  },
});

export default theme;
