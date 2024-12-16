import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DataTable, TextInput, FAB } from 'react-native-paper';

import { useSystem } from '~/powersync/PowerSync';

const detailsCampaign = () => {
  const passedParams: any = useLocalSearchParams();
  const [editingItemId, setEditingItemId] = useState(null);
  const [title, setTitle] = useState(passedParams.title);
  const [description, setDescription] = useState(passedParams.description);
  const [is_active, setIsActive] = useState(passedParams.is_active);
  const { supabaseConnector } = useSystem();

  const handleTextChangeFunction = () => {};
  const changeSupabaseTableContent = async () => {
    await conditionCheck('title', title);
    await conditionCheck('description', description);
    await conditionCheck('is_active', is_active);
    setEditingItemId(null);

    async function conditionCheck(field: any, newValue: any) {
      const validFields = ['title', 'description', 'is_active'];
      if (!validFields.includes(field)) {
        throw new Error(`Invalid field name`);
      }
      if (passedParams[field] !== newValue) {
        passedParams[field] = newValue;
        const { error } = await supabaseConnector.client
          .from('campaigns')
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
            <DataTable.Cell>Title:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {title}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Description:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {description}
                </Text>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>is_active:</DataTable.Cell>
            <DataTable.Cell>
              {editingItemId === passedParams.id ? (
                <TextInput
                  value={is_active}
                  onChangeText={setIsActive}
                  onBlur={handleTextChangeFunction}
                />
              ) : (
                <Text>
                  {'      '} {is_active}
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
export default detailsCampaign;
