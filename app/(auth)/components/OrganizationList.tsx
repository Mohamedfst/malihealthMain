import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';

import { ORGANIZATION_TABlE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const OrganizationList = () => {
  const [organization, setOrganization] = useState([{}]);
  const [user, setUser] = useState({});
  const { supabaseConnector, db } = useSystem();
  useEffect(() => {
    let isMounted = true;

    const showOrganizations = async () => {
      try {
        const result = await db.selectFrom(ORGANIZATION_TABlE).selectAll().execute();
        if (isMounted) {
          setOrganization(result);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching organizations:', error);
        }
      }
    };

    const currentUser = async () => {
      try {
        const { session } = await supabaseConnector.fetchCredentials();
        if (isMounted && session && session.user && session.user.user_metadata) {
          setUser(session.user.user_metadata);
        } else if (isMounted) {
          // Handle cases where session or nested properties are missing
          console.warn('Unexpected session data format:', session);
          setUser({}); // or set to a default value if appropriate
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user:', error);
        }
      }
    };

    showOrganizations();
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
            pathname: '/addOrganization',
            params: user,
          });
        }}
      />
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">Name</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title> Type </DataTable.Title>
          </DataTable.Header>

          {organization &&
            organization.map((item, key) => (
              <DataTable.Row key={key}>
                <DataTable.Cell
                  onPress={() => {
                    router.push({
                      pathname: '/detailsOrganization',
                      params: item,
                    });
                  }}>
                  {item.name}
                </DataTable.Cell>

                <DataTable.Cell
                  onPress={() => {
                    router.push({
                      pathname: '/detailsOrganization',
                      params: item,
                    });
                  }}>
                  {item.email}
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => {
                    router.push({
                      pathname: '/detailsOrganization',
                      params: item,
                    });
                  }}>
                  {'     '}
                  {item.type}
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => {
                    router.push({
                      pathname: '/detailsOrganization',
                      params: item,
                    });
                  }}>
                  {'                 '}
                  <SimpleLineIcons name="arrow-right" size={0} color="black" />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
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

export default OrganizationList;
