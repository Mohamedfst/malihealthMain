import { useNavigation, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import OrganizationList from './components/OrganizationList';

import { useSystem } from '~/powersync/PowerSync';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState([{}]);
  const [selectedScreen, setSelectedScreen] = useState('show');

  const [center, setCenter] = useState([{}]);
  const [isVisible, setIsVisible] = useState(true);
  const { supabaseConnector } = useSystem();
  const navigation = useNavigation();

  useEffect(() => {
    getUserName();
    showOrganizations();
    showCenters();
  });
  const getUserName = async () => {
    const { data, error } = await supabaseConnector.client.auth.getSession();
    if (error) {
      throw error;
    }

    if (Object.keys(data.session.user.user_metadata.first_name).length > 0) {
      setName(data.session.user.user_metadata.first_name);
    } else {
      setName('');
    }
  };

  const handleScreenChange = (screen) => {
    setSelectedScreen(screen);
  };

  const addOrganization = async () => {
    // eslint-disable-next-line no-unused-expressions
  };
  const showOrganizations = async () => {
    const { data } = await supabaseConnector.getOrganizations();
    setOrganization(data);
  };
  const addCenter = async () => {
    // eslint-disable-next-line no-unused-expressions
  };
  const showCenters = async () => {
    // eslint-disable-next-line no-unused-expressions
    const { data } = await supabaseConnector.getCenters();
    setCenter(data);
  };
  return (
    <View>
      <Text style={styles.container}>
        <Text> Hello Admin,</Text>
        <Text style={styles.content}> {name} </Text>
      </Text>
      <View>
        <Pressable style={styles.button}>
          <Link
            push href={{
              pathname: '/components/OrganizationList',
              params: organization[0],
            }}>
            <Text style={styles.buttonText}>Show Organizations</Text>
          </Link>
        </Pressable>
      </View>

      <View>
        <Pressable style={styles.button}>
          <Link
            push href={{
              pathname: '/components/CenterList',
              params: center[0],
            }}>
            <Text style={styles.buttonText}>Show Centers</Text>
          </Link>
        </Pressable>
      </View>

      <View>
        <Pressable style={styles.button}>
          <Link
            push href={{
              pathname: '/components/AddOrganization',
              params: organization[0],
            }}>
            <Text style={styles.buttonText}>Add an Organization</Text>
          </Link>
        </Pressable>
      </View>

      <View>
        <Pressable style={styles.button}>
          <Link
            push href={{
              pathname: '/components/AddCenter',
              params: center[0],
            }}>
            <Text style={styles.buttonText}>Add a Center</Text>
          </Link>
        </Pressable>
      </View>
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
