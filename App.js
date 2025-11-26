import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import HomeSplashScreen from './Backend/Componentes/HomeSplashScreen';
import CadastroEngenheiro from './Frontend/Screens/CadastroEngenheiro/CadastroEngenheiro';
import LoginEngenheiro from './Frontend/Screens/LoginEngenheiro/LoginEngenheiro';
import DashboardEngenheiro from './Frontend/Screens/DashboardEngenheiro/DashboardEngenheiro';

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
          initialRouteName="HomeSplashScreen" 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          {/* Splash Screen - Tela inicial */}
          <Stack.Screen name="HomeSplashScreen" component={HomeSplashScreen} />
          
          {/* Tela de Cadastro específica */}
          <Stack.Screen name="CadastroEngenheiro" component={CadastroEngenheiro} />
          
          {/* Tela de Login específica */}
          <Stack.Screen name="LoginEngenheiro" component={LoginEngenheiro} />
          
          {/* Dashboard após login */}
          <Stack.Screen name="DashboardEngenheiro" component={DashboardEngenheiro} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};