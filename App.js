import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Login from './screens/Login';
import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import { AuthProvider } from './src/context/AuthContext';
import PasswordReset from './screens/PasswordReset';
import UserPanel from './screens/UserPanel';
import AbrirChamado from './screens/AbrirChamado';
import ChamadosUsuario from './screens/ChamadosUsuario';
import AdminChamados from './screens/AdminChamados';
import logoImage from './assets/favicon.png';
import DetalhesChamado from './screens/DetalhesChamado';
import DetalhesAdminChamado from './screens/DetalhesAdminChamado';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        cardStyle: {
          backgroundColor: '#19a0b8',
          borderWidth: 0,
        },
        headerStyle: {
          backgroundColor: '#19a0b8',
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        cardShadowEnabled: false,
        elevation: 0,
        shadowOpacity: 0,
        headerRight: () => (
          <Image
            source={logoImage}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="UserPanel" component={UserPanel} />
      <Stack.Screen name="AbrirChamado" component={AbrirChamado} />
      <Stack.Screen name="ChamadosUsuario" component={ChamadosUsuario} />
      <Stack.Screen name="AdminChamados" component={AdminChamados} />
      <Stack.Screen name="DetalhesChamado" component={DetalhesChamado} />
      <Stack.Screen name="DetalhesAdminChamado" component={DetalhesAdminChamado} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
