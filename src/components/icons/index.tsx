import {Image} from 'react-native';

export const HomeTabBarIcon = () => (
  <Image 
    source={require('../../assets/images/Home.png')} 
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
        width: 24,
        height: 24,
        tintColor: '#fff',
    }} 
    resizeMode="contain"
  />
);

export const WatchlistTabBarIcon = () => (
  <Image 
    source={require('../../assets/images/Watchlist.png')} 
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
        width: 24,
        height: 24,
        tintColor: '#fff',
    }} 
    resizeMode='contain'
  />
);

export const BackIcon = ({styles} : {styles?:any}) => (
    <Image
        source={require('../../assets/images/Back.png')}
        style={styles}
        resizeMode="contain"
    />
)

export const ChevronRightIcon = ({styles} : {styles?:any}) => (
    <Image
        source={require('../../assets/images/chevron-right.png')}
        style={styles}
        resizeMode="contain"
    />
)

export const ChevronDownIcon = ({styles} : {styles?:any}) => (
    <Image
        source={require('../../assets/images/chevron-down.png')}
        style={styles}
        resizeMode="contain"
    />
)

export const Logo = ({styles} : {styles?:any}) => (
    <Image
        source={require('../../assets/images/Logo.png')}
        style={styles}
        resizeMode="contain"
    />
)

