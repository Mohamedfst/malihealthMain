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

import { PATIENT_TABLE, CENTER_TABlE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';
const AddPatient = () => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [national_license, setNatLicense] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergency_num, setEmerNum] = useState('');
  const [languages, setLanguages] = useState('');
  const [center, setCenter] = useState([{}]);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [org, setOrg] = useState('');
  const { db } = useSystem();

  const router = useRouter();
  useEffect(() => {
    let isMounted = true;

    const showCentersMembership = async () => {
      try {
        const result = await db.selectFrom(CENTER_TABlE).selectAll().execute();

        if (isMounted) {
          setCenter(result);

          // Process the result *immediately* after fetching, before setting state
          const DropDownMenu =
            result.length > 0 ? result.map((item) => ({ label: item.name, value: item.id })) : []; // Handle empty result case

          setData(DropDownMenu);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching centers:', error);
        }
      }
    };

    showCentersMembership();

    return () => {
      isMounted = false;
    };
  }, []);
  const addPatient = async () => {
    const todoId = uuid();
    try {
      await db
        .insertInto(PATIENT_TABLE)
        .values({
          id: todoId,
          name,
          last_name,
          dob,
          national_license,
          number,
          email,
          address,
          emergency_num,
          languages,
          center_id: org,
        })
        .execute();
    } catch (error) {
      console.error('Error inserting Patient:', error);
    }
    setLoading(false);
    router.push('/(provider)');
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
          placeholder="Patient Name"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Patient Last Name"
          placeholderTextColor="black"
          value={last_name}
          onChangeText={setLastName}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Patient DOB"
          placeholderTextColor="black"
          value={dob}
          onChangeText={setDob}
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
          placeholder="Enter the patient's address"
          placeholderTextColor="black"
          value={address}
          onChangeText={setAddress}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Personal phone number"
          placeholderTextColor="black"
          value={number}
          onChangeText={setNumber}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Emergency phone number"
          placeholderTextColor="black"
          value={emergency_num}
          onChangeText={setEmerNum}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="National License Number"
          placeholderTextColor="black"
          value={national_license}
          onChangeText={setNatLicense}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Languages"
          placeholderTextColor="black"
          value={languages}
          onChangeText={setLanguages}
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
          value={org}
          onChange={(item) => {
            setOrg(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />
        <TouchableOpacity onPress={addPatient} style={styles.button}>
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/(provider)">
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

export default AddPatient;
