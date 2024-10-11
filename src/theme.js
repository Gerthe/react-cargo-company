export const theme = {
  cssVar: true,
  token: {
    colorPrimary: '#201E50',
    colorBgBase: '#fff',
    borderRadius: 3,
    fontSize: 18,
    layoutHeaderBg: '#201E50',
  },
  components: {
    Button: {
      primaryColor: '#F7B32B',
      defaultHoverColor: '#F7B32B',
      defaultHoverBorderColor: '#F7B32B',
    },
    Menu: {
      activeBarHeight: 5,
    },
  },
};

export const flexTwoColumnsConfig = {
  xs: {
    flex: '100%',
  },
  sm: {
    flex: '100%',
  },
  md: {
    flex: '100%',
  },
  lg: {
    flex: '50%',
  },
  xl: {
    flex: '50%',
  },
  style: { fontSize: 18 },
};

export const headerStyle = {
  textAlign: 'center',
  height: 280,
  lineHeight: '24px',
  backgroundColor: 'var(--light)',
  padding: '24px 0',
};

export const footerStyle = {
  backgroundColor: 'var(--main)',
  color: 'var(--secondary)',
  textAlign: 'center',
};
