import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultantApi} from '../../service';
import {Colors} from '../../theme';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils';
import {BannerSlider} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const bannerImages = [
  {uri: 'https://picsum.photos/200/300'},
  {uri: 'https://picsum.photos/200/400'},
  {uri: 'https://picsum.photos/200/500'},
];

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const [data, setData] = useState<Array<Consultant>>([]);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await ConsultantApi.getAllConsultants();
        setData(res.data.data);
      } catch (err: any) {
        Alert.alert(err);
      }
    };
    callApi();
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('onConferenceTerminated', nativeEvent);
    JitsiMeet.endCall();
    setShowVideo(false);
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('onConferenceJoined', nativeEvent);
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('onConferenceWillJoin', nativeEvent);
  }

  const onPressVideoCall = async () => {
    //await GoogleSignin.signOut();
    setShowVideo(true);
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
    }, 2000);
  };

  if (showVideo) {
    return (
      <JitsiMeetView
        onConferenceTerminated={e => onConferenceTerminated(e)}
        onConferenceJoined={e => onConferenceJoined(e)}
        onConferenceWillJoin={e => onConferenceWillJoin(e)}
        style={{
          flex: 1,
          height: '80%',
          width: '100%',
        }}
      />
    );
  }

  return (
    <View style={styles.parent}>
      <View style={{backgroundColor: Colors.PRIMARY}}>
        <View style={styles.banner}>
          <BannerSlider data={bannerImages} />
        </View>
      </View>
      <Text style={styles.heading}>Top Rated Consultants</Text>
      <Button title="Video Call " onPress={onPressVideoCall} />
      <FlatList
        keyExtractor={item => item._id}
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{marginLeft: 9}}
              onPress={() =>
                navigation.navigate('ConsultantDetails', {id: item._id})
              }>
              <Image
                source={{uri: item.image}}
                style={{
                  height: 100,
                  width: DEVICE_WIDTH / 2 - 18,
                  resizeMode: 'contain',
                  backgroundColor: Colors.SECONDARY,
                }}
              />
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  banner: {
    height: DEVICE_HEIGHT / 4,
  },
  heading: {
    color: Colors.CHARCOAL_GREY,
  },
});
