import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useRef } from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from '../navigation/index.js';
import { Audio } from 'expo-av';
import audioData from '../audioData.json';
import questionData from '../questionData.json';
import SoundPlayer from 'react-native-sound-player';
import { Asset } from 'expo-asset';


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};



const Quiz = ({ navigation }) => {
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null);
  const c_scale = require('../assets/audio/c_scale.mp3');
  const csharp_scale = require('../assets/audio/csharp_scale.mp3');
  const d_scale = require('../assets/audio/d_scale.mp3');

  useEffect(() => {
    getQuiz();
    return () => {
      // Unload the sound when component unmounts
      sound && sound.unloadAsync();
    };
  }, []);

  const loadAudio = async () => {
    const audioPromises = audioData.scales.map(async (scale) => {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require(scale.file_path));
        return {
          ...scale,
          soundObject,
        };
      } catch (error) {
        console.error('Error loading audio:', error);
        return null;
      }
    });

    const loadedAudio = await Promise.all(audioPromises);
    setAudioData(loadedAudio.filter((scale) => scale !== null));
  };
  
  const generateOptionsAndShuffle = (_audioFiles) => {
    const options = [..._audioFiles];
    shuffleArray(options);

    // Select the first four options
    const selectedOptions = options.slice(0, 4);

    return selectedOptions.map(option => ({
      name: option.name,
      audio_url: option.file_path
    }));
  };

  const getQuiz = () => {
    setIsLoading(true);

    const scales = audioData.scales;
    const options = generateOptionsAndShuffle(scales);
    setOptions(options);

    // Load audio for the current question
    const { audio_url } = options[0];
    loadAudio(audio_url);

    setIsLoading(false);
  };


  const handleNextPress = async () => {
    if (currentQuestionIndex < audioData.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      const scale = audioData[nextQuestionIndex];
      await scale.soundObject.playAsync();
    }
  };

  
  const handleShowResult = () => {
    navigation.navigate('Result', {
      score: score,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      ) : (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q. {decodeURIComponent(questionData.results[currentQuestion].question)}
            </Text>
          </View>
          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButtom}
                onPress={() => handleSelectedOption(option.name)}
              >
                <Text style={styles.option}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottom}>
            {currentQuestion < questionData.results.length - 1 ? (
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>SKIP</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                <Text style={styles.buttonText}>SHOW RESULTS</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButtom: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
});
