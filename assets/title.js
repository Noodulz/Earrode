import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earrode</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "#352D39",
    fontSize: 30,
    fontWeight: '600',

  },
  container: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
