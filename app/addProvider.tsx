import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const AddProvider = () => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [emergency_num, setEmergencyNum] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nat_license, setNatLicense] = useState('');
  const [medical_license, setMedicalLicense] = useState('');
  const [languages, setLanguages] = useState('');
  const [team, setHealthTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();

  const router = useRouter();
  //const organization_id = process.env.EXPO_PUBLIC_Organization;
  const role: string = 'Provider';
  //Create a new organization
  const onSignUpPress = async () => {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabaseConnector.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name,
          last_name,
          dob,
          personal_num: number,
          emergency_num,
          address,
          med_license: medical_license,
          nat_license,
          languages,
          team,
          role,
        },
      },
    });

    if (error) {
      console.log(error);
      Alert.alert(error.message);
    } else if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    }
    setLoading(false);
    router.replace('/(provider)');
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
          placeholder="Provider Name"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Provider Last Name"
          placeholderTextColor="black"
          value={last_name}
          onChangeText={setLastName}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="DOB"
          placeholderTextColor="black"
          value={dob}
          onChangeText={setDob}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="password"
          placeholderTextColor="black"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Personal Number"
          placeholderTextColor="black"
          value={number}
          onChangeText={setNumber}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Emergency Number"
          placeholderTextColor="black"
          value={emergency_num}
          onChangeText={setEmergencyNum}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Address"
          placeholderTextColor="black"
          value={address}
          onChangeText={setAddress}
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
        <TextInput
          autoCapitalize="none"
          placeholder="Medical License"
          placeholderTextColor="black"
          value={medical_license}
          onChangeText={setMedicalLicense}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="National License"
          placeholderTextColor="black"
          value={nat_license}
          onChangeText={setNatLicense}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Health Team"
          placeholderTextColor="black"
          value={team}
          onChangeText={setHealthTeam}
          style={styles.inputField}
        />
        <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
          <Text style={{ color: '#fff' }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/">
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
});

export default AddProvider;
