import { StyleSheet, View } from 'react-native';
import { Logo } from './icons';

export const LogoComponent = () => {
  return (
    <View style={styles.logoContainer}>
      <Logo styles={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  logo: {
    width: 81,
    height: 58,
  },
});
