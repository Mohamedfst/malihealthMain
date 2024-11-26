import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
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
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Dashboard',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: 'green' },
            headerLeft: () => (
              <TouchableOpacity onPress={onSignOut}>
                <Ionicons name="log-out-outline" size={24} color="yellow" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="components/OrganizationList"
          options={{
            title: 'Organization',
            headerTitleStyle: { color: 'green' },
          }}
        />
        <Stack.Screen
          name="components/CenterList"
          options={{
            title: 'Center',
            headerTitleStyle: { color: 'green' },
          }}
        />
        <Stack.Screen
          name="components/AddOrganization"
          options={{
            title: 'Add an organization',
            headerTitleStyle: { color: 'green' },
          }}
        />
         <Stack.Screen
          name="components/AddCenter"
          options={{
            title: 'Add a center',
            headerTitleStyle: { color: 'green' },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};
export default Layout;
