import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const { supabaseConnector } = useSystem();

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const getUserName = async () => {
      try {
        const { data, error } = await supabaseConnector.client.auth.getSession();
        if (error) {
          // It's generally better to log the error rather than throwing it inside a useEffect
          console.error('Error fetching session:', error);
          return; // Important: Exit the function if there's an error
        }

        if (isMounted) {
          // Check if the component is still mounted
          if (
            data &&
            data.session &&
            data.session.user &&
            data.session.user.user_metadata &&
            data.session.user.user_metadata.first_name
          ) {
            if (Object.keys(data.session.user.user_metadata.first_name).length > 0) {
              setRole(data.session.user.user_metadata.role);
              setName(data.session.user.user_metadata.first_name);
            } else {
              setName('');
              setRole('');
            }
          } else {
            // Handle cases where data or nested properties are missing.
            console.warn('Unexpected session data format:', data);
            setName('');
            setRole('');
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error in getUserName:', error);
        }
      }
    };

    getUserName();

    return () => {
      isMounted = false; // Set the flag to false on unmount
    };
  }, []);
  return (
    <View>
      {role && role === 'Admin' && (
        <>
          <Text style={styles.container}>
            <Text> Hello {role},</Text>
            <Text style={styles.content}> {name} </Text>
          </Text>
        </>
      )}
      {role && role === 'Provider' && (
        <>
          <Text style={styles.container}>
            <Text> Hello {role},</Text>
            <Text style={styles.content}> {name} </Text>
          </Text>
        </>
      )}
      {role && role === 'Community worker' && (
        <>
          <Text style={styles.container}>
            <Text> Hello provider ,</Text>
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
