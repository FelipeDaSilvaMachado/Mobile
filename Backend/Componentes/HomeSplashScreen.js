import { useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import StylesHomeSplashScreen from './StyleHomeSplashScreen';

const HomeSplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Define a duração do splash (4 segundos)
        const timer = setTimeout(() => {
            navigation.replace('CadastroEngenheiro'); // Após o tempo, navega para a tela de cadastroEngenheiro
        }, 5000);
        return () => clearTimeout(timer); // limpa o timer quando o componente for desmontado
    }, [navigation]);

    return (
        <View style={StylesHomeSplashScreen.splashContainer}>
            <Image
                source={{ uri: 'https://cdn.prod.website-files.com/651c2bbd8c40de720b290d09/652ee2f1cf47c99855956167_planejamento-e-controle-de-obras.avif' }}
                style={StylesHomeSplashScreen.splashImage}
            />
            <ActivityIndicator size="large" color="#0000ff" style={StylesHomeSplashScreen.loader} />
        </View>
    );
};

export default HomeSplashScreen;