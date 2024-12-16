import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';

import { useSystem } from '~/powersync/PowerSync';

const CampaignList = () => {
  const [organization, setOrganization] = useState([{}]);
  const [user, setUser] = useState({});
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    showOrganizations();
    currentUser();
  });

  const currentUser = async () => {
    const { session } = await supabaseConnector.fetchCredentials();
    setUser(session.user.user_metadata);
  };

  const showOrganizations = async () => {
    const { data } = await supabaseConnector.getCampaigns();
    setOrganization(data);
  };
  return (
    <View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          router.push({
            pathname: '/addCampaign',
            params: user,
          });
        }}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="descending">Title</DataTable.Title>
          <DataTable.Title>Active</DataTable.Title>
        </DataTable.Header>

        {organization &&
          organization.map((item, key) => (
            <DataTable.Row key={key}>
              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCampaign',
                    params: item,
                  });
                }}>
                {item.title}
              </DataTable.Cell>

              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCampaign',
                    params: item,
                  });
                }}>
                {item.is_active}
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCampaign',
                    params: item,
                  });
                }}>
                {'                 '}
                <SimpleLineIcons name="arrow-right" size={0} color="black" />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 425,
    right: 20,
    alignItems: 'center',
  },
});

export default CampaignList;
