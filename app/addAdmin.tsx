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

const index_ = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [personalNum, setPersonalNum] = useState('');
  const [emergencyNum, setEmergencyNum] = useState('');
  const [address, setAddress] = useState('');
  const [medLicense, setMedLicense] = useState('');
  const [natLicense, setNatLicense] = useState('');
  const [languages, setLanguages] = useState('');
  const [team, setTeam] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const role = 'Admin';
  const router = useRouter();
  //Create a new user
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
          first_name: firstName,
          last_name: lastName,
          dob,
          personal_num: personalNum,
          emergency_num: emergencyNum,
          address,
          med_license: medLicense,
          nat_license: natLicense,
          languages,
          team,
          role,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    } else if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    }

    setLoading(false);
    router.replace('/(auth)');
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
          placeholder="john@doe.com"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
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
          placeholder="First Name"
          placeholderTextColor="black"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Last Name"
          placeholderTextColor="black"
          value={lastName}
          onChangeText={setLastName}
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
          placeholder="Personal phone number"
          placeholderTextColor="black"
          value={personalNum}
          onChangeText={setPersonalNum}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Emergency phone number"
          placeholderTextColor="black"
          value={emergencyNum}
          onChangeText={setEmergencyNum}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Full address"
          placeholderTextColor="black"
          value={address}
          onChangeText={setAddress}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Medical identification number if applicable"
          placeholderTextColor="black"
          value={medLicense}
          onChangeText={setMedLicense}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="National identification number"
          placeholderTextColor="black"
          value={natLicense}
          onChangeText={setNatLicense}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Language(s), e.g., English, French, Bambara."
          placeholderTextColor="black"
          value={languages}
          onChangeText={setLanguages}
          style={styles.inputField}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Team, e.g., Community, Health care provider, and Administrator "
          placeholderTextColor="black"
          value={team}
          onChangeText={setTeam}
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

export default index_;
