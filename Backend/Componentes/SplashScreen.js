import { useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import StylesSplashScreen from './StyleSplashScreen';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Define a duração do splash (4 segundos)
        const timer = setTimeout(() => {
            navigation.replace('Home'); // Após o tempo, navega para a tela de cadastroEngenheiro
        }, 5000);
        return () => clearTimeout(timer); // limpa o timer quando o componente for desmontado
    }, [navigation]);

    return (
        <View style={StylesSplashScreen.splashContainer}>
            <Image
                source={require('../../assets/img/SplashScreen/SplashScreen.png')}
                style={StylesSplashScreen.splashImage}
            />
            <ActivityIndicator size="large" color="#0000ff" style={StylesSplashScreen.loader} />
        </View>
    );
};

export default SplashScreen;