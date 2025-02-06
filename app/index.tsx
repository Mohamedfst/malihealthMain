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
} from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);
    try {
      // Use the PowerSync specific login method
      await supabaseConnector.login(email, password);
      const role = await fetchUserRole();
      if (role === 'Provider' || role === 'Community worker') {
        router.replace('/(provider)');
      } else {
        router.replace('/(auth)');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = async () => {
    let role: string = 'N/A';
    const { data, error } = await supabaseConnector.client.auth.getSession();
    if (error) {
      throw error;
    }
    if (
      data &&
      data.session &&
      data.session.user &&
      data.session.user.user_metadata &&
      Object.keys(data.session.user.user_metadata.first_name).length > 0
    ) {
      role = data.session.user.user_metadata.role;
    }
    return role;
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            elevation: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            gap: 10,
          }}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', fontSize: 20 }}>Loading...</Text>
        </View>
      )}
      <View style={styles.header}>
        <Text style={{ fontSize: 42, color: 'green' }}>M</Text>
        <Text style={{ fontSize: 42, color: 'yellow' }}>a</Text>
        <Text style={{ fontSize: 42, color: 'red' }}>l</Text>
        <Text style={{ fontSize: 42, color: 'red' }}>i</Text>
        <Text style={{ fontSize: 42 }}> </Text>
        <Text style={{ fontSize: 42, color: 'green' }}>He</Text>
        <Text style={{ fontSize: 42, color: 'yellow' }}>al</Text>
        <Text style={{ fontSize: 42, color: 'red' }}>th</Text>
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
        placeholder="password"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={{ color: '#fff' }}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Link href="/index_">
          <Text style={{ textAlign: 'center', color: 'white' }}> Create an Admin account </Text>
        </Link>
        <Text numberOfLines={1}>{'First line\nSecond line'}</Text>
        <Link href="/addProvider">
          <Text style={{ textAlign: 'center', color: 'white' }}> Create a Provider account </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
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

export default Login;
