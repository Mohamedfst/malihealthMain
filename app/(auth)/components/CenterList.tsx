import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const CenterList = () => {
  const [center, setCenter] = useState([{}]);
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    showCenters();
  });

  const showCenters = async () => {
    const { data } = await supabaseConnector.getCenters();
    setCenter(data);
  };
  return (
    <View>
      <Text> Centers List </Text>
      {center.map((item, key) => (
        <View key={key}>
          <Text>Name: {item.name}</Text>
          <Text>Email: {item.email}</Text>
        </View>
      ))}
    </View>
  );
};
export default CenterList;
