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

const AddCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [is_active, setIsActive] = useState('');

  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();

  const router = useRouter();
  //const organization_id = process.env.EXPO_PUBLIC_Organization;
  //Create a new organization
  const onSignUpPress = async () => {
    setLoading(true);
    const { error } = await supabaseConnector.client
      .from('campaigns')
      .insert([
        {
          title,
          description,
          is_active,
        },
      ])
      .select();
    if (error) {
      console.log('error', error);
      Alert.alert(error.message);
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
          keyboardType="numeric"
          maxLength={1}
          placeholder="Enter 1 or 0"
          placeholderTextColor="black"
          value={is_active}
          onChangeText={setIsActive}
          style={styles.inputField}
        />
        <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
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
});

export default AddCampaign;
