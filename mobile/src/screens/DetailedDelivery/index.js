import * as React from 'react';
import {
  Container,
  TopBar,
  BackButton,
  Title,
  Wrapper,
} from '../../components/styles';
import { useFocusEffect } from '@react-navigation/native';
import {
  Card,
  Header,
  DeliveryIcon,
  HeaderText,
  InfoTitle,
  InfoContent,
  PendingCalendarIcon,
  RowWrapper,
  Row,
  ProblemIcon,
  Actions,
  Action,
  ActionDescription,
  ViewProblemsIcon,
  ConfirmIcon,
} from './styles';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { useStoreState } from 'easy-peasy';
import { getDelivery, updateDelivery } from '../../services';

const formatDate = date =>
  date ? format(new Date(date), 'dd / MM / yyyy') : '-- / -- / ----';

const DetailedDelivery = ({ navigation, route, ...rest }) => {
  const initialDelivery = route.params.state;
  const [delivery, setDelivery] = React.useState(initialDelivery);
  const deliverymanId = useStoreState(state => state.deliveryman.info.id);
  useFocusEffect(() => {
    const fn = async () => {
      const response = await getDelivery(deliverymanId, initialDelivery.id);
      setDelivery(response.data);
    };
    fn();
  }, [deliverymanId, initialDelivery.id]);
  const {
    recipient: { number, street, state, city, cep, name },
    product,
    start_date: rawStartDate,
    end_date: rawEndDate,
  } = delivery;
  const status = React.useMemo(() => {
    if (delivery.end_date) {
      return 'Entregue';
    } else if (delivery.start_date) {
      return 'Retirado';
    } else {
      return 'Pendente';
    }
  }, [delivery]);

  const start_date = React.useMemo(() => formatDate(rawStartDate), [
    rawStartDate,
  ]);
  const end_date = React.useMemo(() => formatDate(rawEndDate), [rawEndDate]);

  const handleFinishDelivery = async () => {
    if (rawStartDate === null) {
      const nowDate = new Date().toISOString();
      try {
        await updateDelivery(deliverymanId, delivery.id, {
          start_date: nowDate,
        });
        setDelivery(value => ({ ...value, start_date: nowDate }));
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    } else {
      navigation.navigate('ConfirmDelivery', {
        state: {
          deliveryId: delivery.id,
        },
      });
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
        <Title>Detalhes da encomenda</Title>
      </TopBar>
      <Container>
        <Wrapper>
          <Card>
            <Header>
              <DeliveryIcon />
              <HeaderText>Informações da entrega</HeaderText>
            </Header>
            <InfoTitle>Destinatário</InfoTitle>
            <InfoContent>{name}</InfoContent>
            <InfoTitle>Endereço de entrega</InfoTitle>
            <InfoContent>
              {`${street}, ${number}, ${city} - ${state}, ${cep}`}
            </InfoContent>
            <InfoTitle>Produto</InfoTitle>
            <InfoContent>{product}</InfoContent>
          </Card>
          <Card>
            <Header>
              <PendingCalendarIcon />
              <HeaderText>Situação da entrega</HeaderText>
            </Header>
            <InfoTitle>Status</InfoTitle>
            <InfoContent>{status}</InfoContent>
            <Row>
              <RowWrapper>
                <InfoTitle>Data de retirada</InfoTitle>
                <InfoContent>{start_date}</InfoContent>
              </RowWrapper>
              <RowWrapper>
                <InfoTitle>data de entrega</InfoTitle>
                <InfoContent>{end_date}</InfoContent>
              </RowWrapper>
            </Row>
          </Card>
          <Actions>
            {rawEndDate === null && (
              <Action
                onPress={() => {
                  navigation.navigate('InformProblem', {
                    state: {
                      deliveryId: delivery.id,
                    },
                  });
                }}>
                <ProblemIcon />
                <ActionDescription>Informar Problema</ActionDescription>
              </Action>
            )}
            <Action
              onPress={() => {
                navigation.navigate('ViewProblems', {
                  state: {
                    deliveryId: delivery.id,
                  },
                });
              }}>
              <ViewProblemsIcon />
              <ActionDescription>Visualizar Problemas</ActionDescription>
            </Action>
            {rawEndDate === null && (
              <Action onPress={handleFinishDelivery}>
                <ConfirmIcon />
                <ActionDescription>
                  {rawStartDate === null
                    ? 'Retirar Entrega'
                    : 'Confirmar Entrega'}
                </ActionDescription>
              </Action>
            )}
          </Actions>
        </Wrapper>
      </Container>
    </>
  );
};
export default DetailedDelivery;
