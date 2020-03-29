import * as React from 'react';
import {
  ProblemCard,
  Description,
  ProblemDate,
  TopBar,
  SubHeader,
} from './styles';
import { Container, BackButton, Title, Wrapper } from '../../components/styles';
import { FlatList } from 'react-native-gesture-handler';
import { getProblems } from '../../services';
import { format } from 'date-fns';

const exampleData = [
  { id: 0, description: 'Destinatário ausente', date: '14/01/2020' },
  { id: 1, description: 'Destinatário saliente', date: '15/01/2020' },
];

const ProblemsScreen = ({ navigation, route }) => {
  const { deliveryId } = route.params.state;
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fn = async () => {
      const response = await getProblems(deliveryId);
      const newData = response.data.map(problem => ({
        id: problem.id,
        description: problem.description,
        date: format(new Date(problem.created_at), 'dd/MM/yyyy'),
      }));
      setData(newData);
    };
    fn();
  }, [deliveryId]);
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
          <SubHeader>Encomenda 01</SubHeader>
          <FlatList
            data={data}
            keyExtractor={e => e.id.toString()}
            renderItem={({ item }) => (
              <ProblemCard>
                <Description>{item.description}</Description>
                <ProblemDate>{item.date}</ProblemDate>
              </ProblemCard>
            )}
          />
        </Wrapper>
      </Container>
    </>
  );
};

export default ProblemsScreen;
