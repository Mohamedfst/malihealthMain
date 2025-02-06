import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';

import { MEDICATION_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const MedicationList = () => {
  const [medication, setMedication] = useState([{}]);
  const { supabaseConnector, db } = useSystem();
  useEffect(() => {
    let isMounted = true;

    const showMedications = async () => {
      try {
        const result = await db.selectFrom(MEDICATION_TABLE).selectAll().execute();
        console.log('Result ', result);
        setMedication(result);
      } catch (error) {
        console.error('Error fetching Medications:', error);
      }
    };

    if (isMounted) {
      showMedications();
    }

    //After every re-render with changed dependencies, React will first run this cleanup function
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title sortDirection="descending">Name</DataTable.Title>
            <DataTable.Title>Description</DataTable.Title>
          </DataTable.Header>

          {medication &&
            medication.map((item, key) => (
              <DataTable.Row key={key}>
                <DataTable.Cell onPress={() => {}}>{item.name}</DataTable.Cell>
                <DataTable.Cell onPress={() => {}}>{item.description}</DataTable.Cell>
                <DataTable.Cell onPress={() => {}}>
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

export default MedicationList;
