import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack, Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSystem } from '~/powersync/PowerSync';

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
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/OrganizationList"
          options={{
            title: 'Organization',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="hospital-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/CenterList"
          options={{
            title: 'Center',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="hospital-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/AddOrganization"
          options={{
            title: 'Add an organization',
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={28} name="hospital-user" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="components/AddCenter"
          options={{
            title: 'Add a center',
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={28} name="hospital-user" color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};
export default Layout;
