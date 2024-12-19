import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';

import { PATIENT_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';
const ShowPatients = () => {
  const [patients, setPatients] = useState([{}]);
  const [user, setUser] = useState({});
  const { supabaseConnector, db } = useSystem();

  useEffect(() => {
    showPatients();
    currentUser();
  });

  const currentUser = async () => {
    const { session } = await supabaseConnector.fetchCredentials();
    setUser(session.user.user_metadata);
  };
  const showPatients = async () => {
    const result = await db.selectFrom(PATIENT_TABLE).selectAll().execute();
    setPatients(result);
  };

  return (
    <View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          router.push({
            pathname: '/addPatient',
            params: user,
          });
        }}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="descending">Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title> Type </DataTable.Title>
        </DataTable.Header>

        {patients &&
          patients.map((item, key) => (
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

export default ShowPatients;
