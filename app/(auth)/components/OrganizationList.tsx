import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const OrganizationList = () => {
  const [organization, setOrganization] = useState([{}]);
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    showOrganizations();
  });

  const showOrganizations = async () => {
    const { data } = await supabaseConnector.getOrganizations();
    setOrganization(data);
  };
  return (
    <View>
      {organization.map((item, key) => (
        <View key={key}>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
        </View>
      ))}
    </View>
  );
};

export default OrganizationList;
