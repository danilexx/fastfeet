import * as React from 'react';
import { FilledContainer } from '../../components/styles';
import {
  TopSection,
  TextSection,
  WelcomeBackText,
  DeliverymanName,
  LogoutIcon,
  Header,
  HeaderText,
  DeliveriesFilters,
  Filter,
  NoDeliveries,
} from './styles';
import DeliverymanPhoto from '../../components/DeliverymanPhoto';
import { getDeliveries, getDoneDeliveries } from '../../services';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import DeliveryCard from '../../components/DeliveryCard';
import { useStoreState } from 'easy-peasy';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import getStatus from '../../utils/getStatus';
import { useFocusEffect } from '@react-navigation/native';

const MainDeliveriesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const info = useStoreState(state => state.deliveryman.info);
  const { name } = info;
  const [deliveriesType, setDeliveriesType] = React.useState('pending');
  useFocusEffect(() => {
    const fn = async () => {
      const fetch =
        deliveriesType === 'pending' ? getDeliveries : getDoneDeliveries;
      const response = await fetch(info.id);
      const newData = response.data.map(delivery => ({
        id: delivery.id,
        status: getStatus(delivery),
        city: delivery.recipient.city,
        date: format(new Date(delivery.created_at), 'dd/MM/yyyy'),
        rest: delivery,
      }));
      setData(newData);
    };
    fn();
  }, [info.id, deliveriesType]);
  return (
    <FilledContainer>
      <TopSection>
        <DeliverymanPhoto info={info} />
        <TextSection>
          <WelcomeBackText>Bem vindo de volta,</WelcomeBackText>
          <DeliverymanName>{name}</DeliverymanName>
        </TextSection>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <LogoutIcon />
        </TouchableOpacity>
      </TopSection>
      <Header>
        <HeaderText>Entregas</HeaderText>
        <DeliveriesFilters>
          <TouchableOpacity
            onPress={() => {
              setDeliveriesType('pending');
            }}>
            <Filter selected={deliveriesType === 'pending'}>Pendentes</Filter>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDeliveriesType('delivered');
            }}>
            <Filter selected={deliveriesType === 'delivered'}>Entregues</Filter>
          </TouchableOpacity>
        </DeliveriesFilters>
      </Header>
      {data.length === 0 && (
        <NoDeliveries>
          Nenhuma Entrega{' '}
          {deliveriesType === 'pending' ? 'Pendente' : 'Entregue'}
        </NoDeliveries>
      )}
      <FlatList
        data={data}
        keyExtractor={delivery => delivery.id.toString()}
        renderItem={({ item }) => <DeliveryCard delivery={item} />}
      />
    </FilledContainer>
  );
};

export default MainDeliveriesScreen;
