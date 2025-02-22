import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSystem } from '~/powersync/PowerSync';
const Layout = () => {
  const { supabaseConnector, powersync } = useSystem();

  const onSignOut = async () => {
    await powersync.disconnectAndClear();
    await supabaseConnector.client.auth.signOut();
    router.replace('/');
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
              <TouchableOpacity onPress={onSignOut}>
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
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons size={28} name="organization" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="components/CenterList"
          options={{
            title: 'Center',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="hospital-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="components/CampaignList"
          options={{
            title: 'Campaigns',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="campaign" color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};
export default Layout;
