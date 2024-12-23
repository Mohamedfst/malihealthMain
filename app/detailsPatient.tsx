import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DataTable, TextInput, FAB } from 'react-native-paper';

import { useSystem } from '~/powersync/PowerSync';

const detailsPatient = () => {
  const passedParams: any = useLocalSearchParams();
  const [editingItemId, setEditingItemId] = useState(null);
  const [name, setName] = useState(passedParams.name);
  const [last_name, setLastName] = useState(passedParams.last_name);
  const [dob, setDob] = useState(passedParams.dob);
  const [national_license, setNatLicense] = useState(passedParams.national_license);
  const [number, setNumber] = useState(passedParams.number);
  const [email, setEmail] = useState(passedParams.email);
  const [address, setAddress] = useState(passedParams.address);
  const [emergency_num, setEmerNum] = useState(passedParams.emergency_num);

  const [languages, setLanguages] = useState(passedParams.languages);
  const { supabaseConnector } = useSystem();

  const handleTextChangeFunction = () => {};
  const changeSupabaseTableContent = async () => {
    await conditionCheck('name', name);
    await conditionCheck('last_name', last_name);
    await conditionCheck('dob', dob);
    await conditionCheck('national_license', national_license);
    await conditionCheck('number', number);
    await conditionCheck('email', email);
    await conditionCheck('address', address);
    await conditionCheck('emergency_num', emergency_num);
    await conditionCheck('languages', languages);

    setEditingItemId(null);

    async function conditionCheck(field: any, newValue: any) {
      const validFields = ['name', 'email', 'address', 'number', 'languages'];
      if (!validFields.includes(field)) {
        throw new Error(`Invalid field name`);
      }
      if (passedParams[field] !== newValue) {
        passedParams[field] = newValue;
        const { error } = await supabaseConnector.client
          .from('centers')
          .update({ [field]: newValue })
          .eq('id', passedParams.id);
        if (error) {
          throw new Error(`Error updating organization field: ${error.message}`);
        }
      }
    }
  };

  const fabAddOn = (itemId: any) => {
    setEditingItemId(itemId);
  };

  return (
    <View style={styles.container}>
      {editingItemId ? (
        <FAB icon="check" style={styles.fab} onPress={() => changeSupabaseTableContent()} />
      ) : (
        <FAB icon="pencil" style={styles.fab} onPress={() => fabAddOn(passedParams.id)} />
      )}

      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title> Properties </DataTable.Title>
            <DataTable.Title> </DataTable.Title>
            <DataTable.Title> Attributes </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Name:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput value={name} onChangeText={setName} onBlur={handleTextChangeFunction} />
              ) : (
                <Text>
                  {'      '} {name}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Email:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {email}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Address:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {address}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Number:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={number}
                  onChangeText={setNumber}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {number}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Languages:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={languages}
                  onChangeText={setLanguages}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {languages}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 12,
  },
  container: {
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    top: 425,
    right: 20,
    alignItems: 'center',
  },
});
export default detailsPatient;
