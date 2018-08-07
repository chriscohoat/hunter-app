import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  Image,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo';

const styles = StyleSheet.create({});

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Record New Sound',
  };

  constructor(props) {
    super(props);
    this.state = {
      areRecording: false,
      loadedSound: undefined,
    };
  }

  componentDidMount() {
    this.askForPermissions();
  }

  askForPermissions = async() => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status === 'granted') {
      this.textInput.focus();
      this.hasAudioPermissions = true;
    } else {
      alert('Need to give audio permission!');
      this.hasAudioPermissions = false;
    }
  };

  startRecording = async() => {
    if (!this.hasAudioPermissions) {
      await this.askForPermissions();
      return;
    }
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
    } catch (error) {
      return console.error(error);
    }
    this.recordingInstance = new Audio.Recording();
    try {
      await this.recordingInstance.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await this.recordingInstance.startAsync();
      this.setState({
        areRecording: !this.state.areRecording,
      })
    } catch (error) {
      // An error occurred!
      console.error(error);
    }
  };

  stopRecording = async() => {
    this.setState({
      areRecording: false,
    });
    let recordingUri, loadedSound;
    try {
      await this.recordingInstance.stopAndUnloadAsync();
      recordingUri = await this.recordingInstance.getURI();
      loadedSound = await this.recordingInstance.createNewLoadedSound();
    } catch (error) {
      return console.error(error);
    }
    console.log(recordingUri);
    console.log(loadedSound);
    this.setState({
      loadedSound,
    })
  };

  toggleRecording = async() => {
    const { areRecording } = this.state;
    if (areRecording) {
      await this.stopRecording();
    } else {
      await this.startRecording();
    }
  };

  playRecording = async() => {
    try {
      console.log(this.state.loadedSound);
      await this.state.loadedSound.sound.playFromPositionAsync(0);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { areRecording, loadedSound } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#476C9B'}}>
        <View style={{padding: 8}}>
          <TextInput ref={(textInput) => this.textInput = textInput} placeholder={"Sound Name"} style={{fontSize: 20}}/>
        </View>
        <View style={{height: 100}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title={areRecording ? 'Stop Recording' : 'Record'} onPress={this.toggleRecording}
                    color='white'/>
          </View>
        </View>
        {loadedSound && <View style={{height: 100}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title={'Play'} onPress={this.playRecording}
                    color='white'/>
          </View>
        </View>}
      </View>

    );
  }
}
