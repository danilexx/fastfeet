import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { Error } from '../../components/Input/styles';
import {
  CameraView,
  TakePicture,
  CameraIcon,
  CameraWrapper,
  CameraPhoto,
} from './styles';
import {
  Container,
  BackButton,
  Title,
  Wrapper,
  TopBar,
  SendButton,
  SendButtonText,
} from '../../components/styles';
import { uploadImage, updateDelivery } from '../../services';
import { useStoreState } from 'easy-peasy';
const PendingView = () => (
  <View>
    <Text>Waiting</Text>
  </View>
);

const ConfirmDeliveryScreen = ({ navigation, route }) => {
  const cameraRef = React.useRef(null);
  const { deliveryId } = route.params.state;
  const deliverymanId = useStoreState(state => state.deliveryman.info.id);
  const [error, setError] = React.useState('');
  const [imgPath, setImgPath] = React.useState(null);
  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setImgPath(data.uri);
  };
  const handleSubmit = async () => {
    if (imgPath === null) {
      setError('Tire uma foto da assinatura do cliente para continuar');
    } else {
      const formData = new FormData();
      formData.append('file', {
        uri: imgPath,
        type: 'image/png',
        name: 'assignature.png',
      });
      const { data: image } = await uploadImage(formData);
      const nowDate = new Date().toISOString();
      try {
        await updateDelivery(deliverymanId, deliveryId, {
          end_date: nowDate,
          signature_id: image.id,
        });
        navigation.goBack();
      } catch (err) {
        Alert.alert(err.response?.data?.error);
      }

      setError('');
    }
  };
  return (
    <>
      <TopBar>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Title>Confirmar Entrega</Title>
      </TopBar>
      <Container>
        <Wrapper>
          <CameraWrapper>
            {imgPath !== null ? (
              <CameraPhoto source={{ uri: imgPath }} />
            ) : (
              <CameraView ref={cameraRef}>
                {({ camera, status, recordAudioPermissionStatus }) => {
                  if (status !== 'READY') {
                    return <PendingView />;
                  }
                  return (
                    <TakePicture onPress={() => takePicture(camera)}>
                      <CameraIcon />
                    </TakePicture>
                  );
                }}
              </CameraView>
            )}
          </CameraWrapper>
          {error !== '' && <Error>{error}</Error>}
          <SendButton onPress={() => handleSubmit()}>
            <SendButtonText>Enviar</SendButtonText>
          </SendButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default ConfirmDeliveryScreen;
