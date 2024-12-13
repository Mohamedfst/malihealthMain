import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const { supabaseConnector } = useSystem();

  useEffect(() => {
    getUserName();
  });
  const getUserName = async () => {
    const { data, error } = await supabaseConnector.client.auth.getSession();
    if (error) {
      throw error;
    }

    if (Object.keys(data.session.user.user_metadata.first_name).length > 0) {
      // console.log('ROLE ->', data.session.user.user_metadata.role);
      setRole(data.session.user.user_metadata.role);
      setName(data.session.user.user_metadata.first_name);
    } else {
      setName('');
      setRole('');
    }
  };
  return (
    <View>
      {role && role === 'Admin' && (
        <>
          <Text style={styles.container}>
            <Text> rHello inside provider folder {role},</Text>
            <Text style={styles.content}> {name} </Text>
          </Text>
        </>
      )}
      {role && role === 'Provider' && (
        <>
          <Text style={styles.container}>
            <Text> Hello inside provider folder {role},</Text>
            <Text style={styles.content}> {name} </Text>
          </Text>
        </>
      )}
      {role && role === 'Community worker' && (
        <>
          <Text style={styles.container}>
            <Text> Hello inside provider folder,</Text>
            <Text style={styles.content}> {name} </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 5,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDescription: {
    marginBottom: 5,
  },
  content: {
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Dashboard;
