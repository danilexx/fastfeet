import { getDeliveryman } from '../../services';
import { action, thunk } from 'easy-peasy';
import { format } from 'date-fns';

const model = {
  deliveryman: {
    info: {
      id: 0,
      name: '',
      email: '',
      date: '',
      avatar: null,
    },
    setDeliveryman: action((state, payload) => {
      state.info = payload;
    }),
    login: thunk(async (actions, payload) => {
      const response = await getDeliveryman(payload.id);
      const {
        data: { id, name, email, created_at, avatar },
      } = response;
      actions.setDeliveryman({
        id,
        name,
        email,
        date: format(new Date(created_at), 'dd/MM/yyyy'),
        avatar,
      });
    }),
  },
};

export default model;
