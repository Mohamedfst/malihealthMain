import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Tabs, Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity, Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import list from './components/OrganizationList';

import { useSystem } from '~/powersync/PowerSync';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Website" onPress={() => Linking.openURL('https://www.expo.dev/')} />
      <Link href="/alpha" onPress={() => props.navigation.closeDrawer()}>
        Organizations
      </Link>
      <Link href="/beta" onPress={() => props.navigation.closeDrawer()}>
        Centers
      </Link>
      <Link href="/charlie" onPress={() => props.navigation.closeDrawer()}>
        Settings
      </Link>
    </DrawerContentScrollView>
  );
}

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
              <TouchableOpacity onPress={CustomDrawerContent}>
                <Ionicons name="menu-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/OrganizationList"
          options={{
            title: 'Organization',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="hospital-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/CenterList"
          options={{
            title: 'Center',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="hospital-o" color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};
export default Layout;
