import * as React from 'react';
import {
  Container,
  Delivery,
  DeliveryIcon,
  DeliveryText,
  BottomSection,
  Section,
  Title,
  Content,
  Details,
} from './styles';
import Status from '../Status';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DeliveryCard = ({ delivery }) => {
  const navigation = useNavigation();
  return (
    <Container>
      {/* <City>{delivery.city}</City> */}
      <Delivery>
        <DeliveryIcon />
        <DeliveryText>Encomenda {delivery.id}</DeliveryText>
      </Delivery>
      <Status stage={delivery.status} />
      <BottomSection>
        <Section>
          <Title>Data</Title>
          <Content>{delivery.date}</Content>
        </Section>
        <Section>
          <Title>Cidade</Title>
          <Content>{delivery.city}</Content>
        </Section>
        <Section>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailedDelivery', {
                state: delivery.rest,
              });
            }}>
            <Details>Ver Detalhes</Details>
          </TouchableOpacity>
        </Section>
      </BottomSection>
    </Container>
  );
};

export default DeliveryCard;
