import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { CENTER_TABlE, CAMPAIGN_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';
const AddCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [is_active, setIsActive] = useState('');
  const [type, setType] = useState('');
  const [center, setCenter] = useState([{}]);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const { db } = useSystem();
  const router = useRouter();

  useEffect(() => {
    showCentersMembership();
  });

  const showCentersMembership = async () => {
    const DropDownMenu = [];
    const result = await db.selectFrom(CENTER_TABlE).selectAll().execute();
    setCenter(result);
    if (center.length > 0) {
      for (let i = 0; i < center.length; i++) {
        const currentObject = { label: `${center[i].name}`, value: `${center[i].id}` };
        DropDownMenu.push(currentObject);
      }
      setData(DropDownMenu);
    }
  };
  const addCampaign = async () => {
    const todoId = uuid();
    try {
      await db
        .insertInto(CAMPAIGN_TABLE)
        .values({
          id: todoId,
          title,
          description,
          is_active,
          center_id: type,
        })
        .execute();
    } catch (error) {
      console.error('Error inserting Campaign:', error);
    }
    setLoading(false);
    router.push('/(auth)');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles}>
        {loading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              elevation: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              gap: 0,
            }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: '#fff', fontSize: 20 }}>Loading...</Text>
          </View>
        )}
        <View style={styles.header}>
          <Text style={{ fontSize: 42, color: 'green' }}>Si</Text>
          <Text style={{ fontSize: 42, color: 'yellow' }}>gn</Text>
          <Text style={{ fontSize: 42 }}> </Text>
          <Text style={{ fontSize: 42, color: 'red' }}>Up</Text>
        </View>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter Campaign Name"
          placeholderTextColor="black"
          value={title}
          onChangeText={setTitle}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Enter description"
          placeholderTextColor="black"
          value={description}
          onChangeText={setDescription}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Enter TRUE or FALSE"
          placeholderTextColor="black"
          value={is_active}
          onChangeText={setIsActive}
          style={styles.inputField}
        />
        <Dropdown
          style={styles.inputField}
          placeholderStyle={styles.inputField}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select type"
          searchPlaceholder="Search..."
          value={type}
          onChange={(item) => {
            setType(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />
        <TouchableOpacity onPress={addCampaign} style={styles.button}>
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/(auth)">
            <Text style={{ textAlign: 'center', color: '#fff' }}> Cancel </Text>
          </Link>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: 20,
    backgroundColor: '#151515',
  },
  header: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 4,
    padding: 10,
    color: 'yellow',
    backgroundColor: 'grey',
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 4,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddCampaign;
