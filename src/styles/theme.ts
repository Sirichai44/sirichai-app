import { extendTheme } from '@mui/joy';

const theme = extendTheme({
  components: {
    JoyButton: {
      defaultProps: {
        size: 'sm'
      }
    },
    JoyInput: {
      defaultProps: {
        size: 'sm'
      }
    },
    JoySelect: {
      defaultProps: {
        size: 'sm'
      }
    },
    JoyTooltip: {
      defaultProps: {
        size: 'sm'
      }
    }
  },
  fontFamily: {
    body: 'comfortaa'
  }
});

export default theme;
