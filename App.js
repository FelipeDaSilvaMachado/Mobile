import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import SplashScreen from './Backend/Componentes/SplashScreen';
import Home from './Frontend/Screens/Home/Home';
import Login from './Frontend/Screens/Login/Login';
import CadastroEngenheiro from './Frontend/Screens/CadastroEngenheiro/CadastroEngenheiro';
import CadastroSindico from './Frontend/Screens/CadastroSindico/CadastroSindico';
import DashboardEngenheiro from './Frontend/Screens/DashboardEngenheiro/DashboardEngenheiro';
import MaoObra from './Frontend/Screens/MaoObra/MaoObra';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#001F3F"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: '#FFFFFF' }
          }}
        >
          {/* Splash Screen - Tela inicial */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />

          {/* Tela de Cadastro específica */}
          <Stack.Screen name="Home" component={Home} />

          {/* Tela de Login específica */}
          <Stack.Screen name="Login" component={Login} />

          {/* Tela de Cadastro específica */}
          <Stack.Screen name="CadastroEngenheiro" component={CadastroEngenheiro} />

          {/* Tela de Cadastro específica */}
          <Stack.Screen name="CadastroSindico" component={CadastroSindico} />

          {/* Dashboard após login */}
          <Stack.Screen name="DashboardEngenheiro" component={DashboardEngenheiro} />

          {/* Dashboard após login */}
          <Stack.Screen name="MaoObra" component={MaoObra} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};