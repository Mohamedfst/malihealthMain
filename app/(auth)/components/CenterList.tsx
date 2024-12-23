import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';

import { CENTER_TABlE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const CenterList = () => {
  const [center, setCenter] = useState([{}]);
  const { db } = useSystem();

  useEffect(() => {
    let isMounted = true;

    const showCenters = async () => {
      try {
        const result = await db.selectFrom(CENTER_TABlE).selectAll().execute();
        if (isMounted) {
          setCenter(result);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching centers:', error);
        }
      }
    };

    showCenters();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View>
      <FAB icon="plus" style={styles.fab} onPress={() => router.push('/addCenter')} />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="descending">Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title> Type </DataTable.Title>
        </DataTable.Header>

        {center &&
          center.map((item, key) => (
            <DataTable.Row key={key}>
              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCenter',
                    params: item,
                  });
                }}>
                {item.name}
              </DataTable.Cell>

              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCenter',
                    params: item,
                  });
                }}>
                {item.email}
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCenter',
                    params: item,
                  });
                }}>
                {'     '}
                {item.type}
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => {
                  router.push({
                    pathname: '/detailsCenter',
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

export default CenterList;
