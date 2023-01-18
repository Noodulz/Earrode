import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Title from '../assets/title.js';
import Quiz from '../screens/quiz.js';
import Result from '../screens/result.js';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from '../navigation/index.js';
const homeImg = require('../assets/images/Playing-Music-amico.png')

const url = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
const res = fetch(url);
console.log(JSON.stringify(res));


const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText="Earode" />
      <View style={styles.bannerContainer}>
        <Image source={homeImg}
        style={styles.banner}
        resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("Quiz")} style={styles.button}>
        <Text style={styles.start}> Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
    backgroundColor: "#EFF7F6",
  },
  button: {
    width: '100%',
    backgroundColor: "#F2B5D4",
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
    top: 15,
  },
  start: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  }
});