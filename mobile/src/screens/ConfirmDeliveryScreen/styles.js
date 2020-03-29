import { RNCamera } from 'react-native-camera';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, TouchableOpacity } from 'react-native';

export const CameraWrapper = styled.View`
  width: 90%;
  height: 60%;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background-color: black;
`;

export const CameraPhoto = styled(Image)`
  flex: 1;
`;

export const CameraView = styled(RNCamera).attrs({
  type: RNCamera.Constants.Type.back,
  androidCameraPermissionOptions: {
    title: 'Permission to use camera',
    message: 'We need your permission to use your camera',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancel',
  },
  captureAudio: false,
  androidRecordAudioPermissionOptions: {
    title: 'Permission to use audio recording',
    message: 'We need your permission to use your audio',
    buttonPositive: 'Ok',
    buttonNegative: 'Cancel',
  },
})`
  background-color: black;
  flex: 1;
`;

export const TakePicture = styled(TouchableOpacity)`
  width: 50px;
  /* margin: 10px auto; */
  height: 50px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-25px);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const CameraIcon = styled(Icon).attrs(props => ({
  color: props.theme.white,
  size: 25,
  name: 'camera',
}))``;
