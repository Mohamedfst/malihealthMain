import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const AddCenter = () => {
  const { name, email, address, number, type } = useLocalSearchParams();

  useEffect(() => {});

  return (
    <View>
      <Text> Organization List </Text>
      <Text> Name: {name}</Text>
      <Text> Name: {email}</Text>
      <Text>Name: {address}</Text>
      <Text> Name: {number}</Text>
      <Text>Name: {type}</Text>
    </View>
  );
};

export default AddCenter;
