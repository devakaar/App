import React, {useEffect} from 'react';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

const CallScreen = () => {
  console.log('in callscreeen');
  useEffect(() => {
    startVideoCall();
  }, []);

  const startVideoCall = async () => {
    setTimeout(() => {
      const url = 'https://meet.jit.si/exemple';
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
        addPeopleEnabled: true,
        calendarEnabled: true,
        callIntegrationEnabled: true,
        chatEnabled: true,
        closeCaptionsEnabled: true,
        inviteEnabled: true,
        androidScreenSharingEnabled: true,
        liveStreamingEnabled: true,
        meetingNameEnabled: true,
        meetingPasswordEnabled: true,
        pipEnabled: true,
        kickOutEnabled: true,
        conferenceTimerEnabled: true,
        videoShareButtonEnabled: true,
        recordingEnabled: true,
        reactionsEnabled: true,
        raiseHandEnabled: true,
        tileViewEnabled: true,
        toolboxAlwaysVisible: false,
        toolboxEnabled: true,
        welcomePageEnabled: false,
      };
      JitsiMeet.call(url, userInfo, options, meetFeatureFlags);
      /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
      /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }, 3000);
  };

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent: any) {
    /* Conference terminated event */
    console.log('onConferenceTerminated', nativeEvent);
    JitsiMeet.endCall();
  }

  function onConferenceJoined(nativeEvent: any) {
    /* Conference joined event */
    console.log('onConferenceJoined', nativeEvent);
  }

  function onConferenceWillJoin(nativeEvent: any) {
    /* Conference will join event */
    console.log('onConferenceWillJoin', nativeEvent);
  }

  return (
    <JitsiMeetView
      onConferenceTerminated={(e: any) => onConferenceTerminated(e)}
      onConferenceJoined={(e: any) => onConferenceJoined(e)}
      onConferenceWillJoin={(e: any) => onConferenceWillJoin(e)}
      style={{
        flex: 1,
        height: '80%',
        width: '100%',
      }}
    />
  );
};

export default CallScreen;
