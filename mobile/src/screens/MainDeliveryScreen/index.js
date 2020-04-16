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
  Row,
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
import { View, ActivityIndicator } from 'react-native';
import { ThemeContext } from 'styled-components';

const LoadingFooter = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <View style={{ display: 'flex', marginVertical: 10 }}>
      <ActivityIndicator color={theme.primary} />
    </View>
  );
};

const MainDeliveriesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const info = useStoreState(state => state.deliveryman.info);
  const { name } = info;
  const [deliveriesType, setDeliveriesType] = React.useState('pending');
  const [pages, setPages] = React.useState(pages);
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    setData([]);
    setCurrentPage(1);
  }, [deliveriesType]);
  useFocusEffect(
    React.useCallback(() => {
      const fn = async () => {
        const fetch =
          deliveriesType === 'pending' ? getDeliveries : getDoneDeliveries;
        const {
          data: { pages: newPages, items },
        } = await fetch({ id: info.id, currentPage });
        const newData = items.map(delivery => ({
          id: delivery.id,
          status: getStatus(delivery),
          city: delivery.recipient.city,
          date: format(new Date(delivery.created_at), 'dd/MM/yyyy'),
          rest: delivery,
        }));
        setPages(newPages);
        setData(state => [...state, ...newData]);
      };
      fn();
    }, [deliveriesType, currentPage, info.id]),
    [deliveriesType, currentPage, info.id],
  );
  return (
    <FilledContainer>
      <TopSection>
        <DeliverymanPhoto info={info} />
        <TextSection>
          <Row>
            <WelcomeBackText>Bem vindo de volta, </WelcomeBackText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <LogoutIcon />
            </TouchableOpacity>
          </Row>
          <DeliverymanName>{name}</DeliverymanName>
        </TextSection>
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
        onEndReached={() => {
          if (currentPage < pages) {
            setCurrentPage(page => page + 1);
          }
        }}
        ListFooterComponent={LoadingFooter}
        onEndReachedThreshold={0.1}
        keyExtractor={delivery => delivery.id.toString()}
        renderItem={({ item }) => <DeliveryCard delivery={item} />}
      />
    </FilledContainer>
  );
};

export default React.memo(MainDeliveriesScreen);
