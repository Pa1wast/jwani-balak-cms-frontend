import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  headerInfo: {
    width: '100vw',
  },
  headerInfoImage: {
    width: '95vw',
    marginLeft: '30px',
  },
  footer: { width: '100vw', position: 'absolute', bottom: '0' },
  footerImage: {
    width: '100vw',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
