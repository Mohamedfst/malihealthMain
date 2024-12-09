import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DataTable, TextInput, FAB } from 'react-native-paper';

import { useSystem } from '~/powersync/PowerSync';

const detailsCenter = () => {
  const passedParams: any = useLocalSearchParams();
  const [editingItemId, setEditingItemId] = useState(null);
  const [name, setName] = useState(passedParams.name);
  const [email, setEmail] = useState(passedParams.email);
  const [address, setAddress] = useState(passedParams.address);
  const [number, setNumber] = useState(passedParams.number);
  const [type, setType] = useState(passedParams.type);
  const { supabaseConnector } = useSystem();

  const handleTextChangeFunction = () => {};
  const changeSupabaseTableContent = async () => {
    await conditionCheck('name', name);
    await conditionCheck('email', email);
    await conditionCheck('address', address);
    await conditionCheck('number', number);
    await conditionCheck('type', type);
    setEditingItemId(null);

    async function conditionCheck(field: any, newValue: any) {
      const validFields = ['name', 'email', 'address', 'number', 'type'];
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
            <DataTable.Cell>Type:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput value={type} onChangeText={setType} onBlur={handleTextChangeFunction} />
              ) : (
                <Text>
                  {'      '} {type}
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
export default detailsCenter;
