import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Provider } from 'react-redux'
import { store } from './app/store'
import {
  Counter,
  HomeScreen,
  SandBoxScreen
} from './view/index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './Router';
import EditScreen from './view/EditScreen';
import { Button, } from 'react-native'

const Stack = createNativeStackNavigator<RootStackParamList>()


export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="EditScreen"
              component={EditScreen}
              options={{
                headerLeft: () => (
                  <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#ff0000"
                  />
                ),
                title: 'Hello',
              }}
            />
            <Stack.Screen
              name="SandBoxScreen"
              component={SandBoxScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Counter"
              component={Counter}
              options={{

              }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </Provider>

  );
}