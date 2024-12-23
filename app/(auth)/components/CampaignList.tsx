import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';

import { CAMPAIGN_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';
const CampaignList = () => {
  const [campaign, setCampaign] = useState([{}]);
  const [user, setUser] = useState({});
  const { supabaseConnector, db } = useSystem();

  useEffect(() => {
    let isMounted = true;

    const currentUser = async () => {
      try {
        const { session } = await supabaseConnector.fetchCredentials();
        if (isMounted && session && session.user && session.user.user_metadata) {
          setUser(session.user.user_metadata);
        } else if (isMounted) {
          console.warn('Unexpected session data format:', session);
          setUser({});
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user:', error);
        }
      }
    };

    const showPatients = async () => {
      try {
        const result = await db.selectFrom(CAMPAIGN_TABLE).selectAll().execute();
        if (isMounted) {
          setCampaign(result);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching campaigns:', error);
        }
      }
    };

    showPatients();
    currentUser();

    return () => {
      isMounted = false;
    };
  }, []);
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

        {campaign &&
          campaign.map((item, key) => (
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
