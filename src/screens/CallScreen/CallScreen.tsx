import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, View, StatusBar} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

const CallScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const url = 'https://meet.jit.si/exemples125';
  const userInfo = {
    displayName: 'Praful',
    email: 'infoindore7@gmail.com',
    avatar: 'https:/gravatar.com/avatar/abc123',
  };
  const options = {
    audioMuted: false,
    audioOnly: false,
    videoMuted: false,
    subject: 'Meeting subject',
  };
  const meetFeatureFlags = {
    addPeopleEnabled: false,
    calendarEnabled: false,
    callIntegrationEnabled: false,
    chatEnabled: false,
    closeCaptionsEnabled: false,
    inviteEnabled: false,
    androidScreenSharingEnabled: true,
    liveStreamingEnabled: false,
    meetingNameEnabled: false,
    meetingPasswordEnabled: false,
    pipEnabled: false,
    kickOutEnabled: false,
    conferenceTimerEnabled: true,
    videoShareButtonEnabled: false,
    recordingEnabled: false,
    reactionsEnabled: false,
    raiseHandEnabled: false,
    tileViewEnabled: false,
    toolboxAlwaysVisible: true,
    toolboxEnabled: true,
    welcomePageEnabled: true,
    'car-mode.enabled': false,
    'speakerstats.enabled': false,
    'video-share.enabled': false,
    'lobby-mode.enabled': true,
    'help.enabled': false,
    'security-options.enabled': false,
  };
  useEffect(() => {
    // startVideoCall();
  }, []);

  // const startVideoCall = async () => {
  //   setTimeout(() => {

  //     JitsiMeet.call(url, userInfo, options, meetFeatureFlags);
  //   }, 2000);
  // };

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent: any) {
    console.log('Terminate');
    JitsiMeet.endCall();
    navigation.navigate('BottomTabs');
  }

  function onConferenceJoined(nativeEvent: any) {
    console.log('joined');
  }

  function onConferenceWillJoin(nativeEvent: any) {
    console.log('will');
  }

  return (
    <View style={{flex: 1}}>
      <JitsiMeetView
        onConferenceTerminated={(e: any) => onConferenceTerminated(e)}
        onConferenceJoined={(e: any) => onConferenceJoined(e)}
        onConferenceWillJoin={(e: any) => onConferenceWillJoin(e)}
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
        options={{url, userInfo, meetOptions: options, meetFeatureFlags}}
      />
    </View>
  );
};

export default CallScreen;
