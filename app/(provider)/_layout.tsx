import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSystem } from '~/powersync/PowerSync';

type RootDrawerParamList = {
  Home: undefined;
  Settings: undefined;
};
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Layout = () => {
  const { supabaseConnector, powersync } = useSystem();

  const onSignOut = async () => {
    await powersync.disconnectAndClear();
    await supabaseConnector.client.auth.signOut();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
              <TouchableOpacity onPress={onSignOut}>
                <Ionicons name="log-out-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={HamburgerMenu}>
                <Ionicons name="menu-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/PatientsList"
          options={{
            title: 'Patients',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="hospital-o" color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );

  function HamburgerMenu() {
    return (
      <NavigationContainer independent>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};
export default Layout;
