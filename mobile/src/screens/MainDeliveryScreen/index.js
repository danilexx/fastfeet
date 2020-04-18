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
import { View, ActivityIndicator, RefreshControl } from 'react-native';
import { ThemeContext } from 'styled-components';
import useBoolean from 'react-use/lib/useBoolean';
import { useFocusEffect } from '@react-navigation/native';

const LoadingFooter = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <View style={{ display: 'flex', marginVertical: 10 }}>
      <ActivityIndicator color={theme.primary} />
    </View>
  );
};

const formatItems = array =>
  array.map(delivery => ({
    id: delivery.id,
    status: getStatus(delivery),
    city: delivery.recipient.city,
    date: format(new Date(delivery.created_at), 'dd/MM/yyyy'),
    rest: delivery,
  }));

const MainDeliveriesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const info = useStoreState(state => state.deliveryman.info);
  const { name } = info;
  const [deliveriesType, setDeliveriesType] = React.useState('pending');
  const [pages, setPages] = React.useState(pages);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, toggle] = useBoolean(false);
  React.useEffect(() => {
    if (currentPage < pages) {
      toggle(true);
    } else {
      toggle(false);
    }
  }, [pages, currentPage, toggle]);
  const fetchInitialDeliveries = React.useCallback(() => {
    const fetchDeliveries = async ({ type, id, page }) => {
      const fetch = type === 'pending' ? getDeliveries : getDoneDeliveries;
      const {
        data: { pages: newPages, items },
      } = await fetch({ id, currentPage: page });
      const newData = formatItems(items);
      setPages(newPages);
      setData(newData);
      setCurrentPage(page);
    };
    fetchDeliveries({ type: deliveriesType, id: info.id, page: 1 });
  }, [deliveriesType, info.id]);
  useFocusEffect(fetchInitialDeliveries);
  const loadMore = React.useCallback(() => {
    if (currentPage < pages) {
      const fetchDeliveries = async ({ type, id, page }) => {
        const fetch = type === 'pending' ? getDeliveries : getDoneDeliveries;
        const {
          data: { pages: newPages, items },
        } = await fetch({ id, currentPage: page + 1 });
        const newData = formatItems(items);
        setPages(newPages);
        setData(state => [...state, ...newData]);
        setCurrentPage(page + 1);
      };
      fetchDeliveries({ type: deliveriesType, id: info.id, page: currentPage });
    }
  }, [deliveriesType, currentPage, info.id, pages]);
  const [isRefreshing, toggleRefreshing] = useBoolean(false);
  const handleRefresh = () => {
    toggleRefreshing(true);
    fetchInitialDeliveries();
    toggleRefreshing(false);
  };
  const { primary } = React.useContext(ThemeContext);
  return (
    <FilledContainer>
      <TopSection>
        <DeliverymanPhoto size={70} info={info} />
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
        onEndReached={loadMore}
        bounces
        ListFooterComponent={() => hasMore && <LoadingFooter />}
        onEndReachedThreshold={0.1}
        keyExtractor={delivery => delivery.id.toString()}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            colors={[primary]}
            refreshing={isRefreshing}
          />
        }
        renderItem={({ item }) => <DeliveryCard delivery={item} />}
      />
    </FilledContainer>
  );
};

export default React.memo(MainDeliveriesScreen);
