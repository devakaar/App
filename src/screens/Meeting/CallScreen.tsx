import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

const CallScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const route = useRoute<RouteProp<RootStack, 'CallScreen'>>();
  const {meetingLink, consultant} = route.params.item;

  const url = meetingLink;
  const userInfo = {
    displayName: consultant.name,
    email: '',
    avatar: consultant.image,
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

  function onConferenceTerminated() {
    console.log('Terminate');
    JitsiMeet.endCall();
    navigation.navigate('BottomTabs');
  }

  function onConferenceJoined() {
    console.log('joined');
  }

  function onConferenceWillJoin() {
    console.log('will');
  }

  return (
    <View style={{flex: 1}}>
      <JitsiMeetView
        onConferenceTerminated={onConferenceTerminated}
        onConferenceJoined={onConferenceJoined}
        onConferenceWillJoin={onConferenceWillJoin}
        style={styles.jitsi}
        options={{url, userInfo, meetOptions: options, meetFeatureFlags}}
      />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  jitsi: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
