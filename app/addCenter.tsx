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

import { ORGANIZATION_TABlE, CENTER_TABlE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';

const healthCenters = [
  { label: 'CSCOM', value: 'CSCOM' },
  { label: 'CSREF', value: 'CSREF' },
  { label: 'Regional health center', value: 'Regional health center' },
  { label: 'District/National Health Center', value: 'District/National Health Center' },
  { label: 'Private health center', value: 'Private health center' },
];

const AddCenter = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');
  const [org, setOrg] = useState('');
  const [data, setData] = useState([{}]);
  const [organization, setOrganization] = useState([{}]);

  const [loading, setLoading] = useState(false);
  const { db } = useSystem();

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const showOrganizations = async () => {
      try {
        const result = await db.selectFrom(ORGANIZATION_TABlE).selectAll().execute();

        if (isMounted) {
          setOrganization(result);

          // Create dropdown menu *after* setting the state
          if (result.length > 0) {
            const DropDownMenu = result.map((org) => ({
              label: org.name,
              value: org.id,
            }));
            setData(DropDownMenu);
          } else {
            setData([]); // Ensure data is empty if no results
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching organizations:', error);
        }
      }
    };

    showOrganizations();

    return () => {
      isMounted = false;
    };
  }, []);
  const addCenter = async () => {
    const todoId = uuid();
    try {
      await db
        .insertInto(CENTER_TABlE)
        .values({ id: todoId, name, address, email, number, type, organization_id: org })
        .execute();
    } catch (error) {
      console.error('Error inserting center:', error);
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
          placeholder="Center Name"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="john@doe.com"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Enter the center's address"
          placeholderTextColor="black"
          value={address}
          onChangeText={setAddress}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Center phone number"
          placeholderTextColor="black"
          value={number}
          onChangeText={setNumber}
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
          placeholder="Select Organization"
          searchPlaceholder="Search..."
          value={org}
          onChange={(item) => {
            setOrg(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />
        <Dropdown
          style={styles.inputField}
          placeholderStyle={styles.inputField}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={healthCenters}
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
        <TouchableOpacity onPress={addCenter} style={styles.button}>
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

export default AddCenter;
