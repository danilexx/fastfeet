import { Router } from 'express';
import multer from 'multer';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import auth from './app/middlewares/auth';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import DeliverymanDeliveryDoneController from './app/controllers/DeliverymanDeliveryDoneController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import redis from './config/redis';

const routes = new Router();
const bruteStore = new BruteRedis(redis);
const bruteForce = new Brute(bruteStore);

routes.post('/users', UserController.store);

routes.post('/sessions', bruteForce.prevent, SessionController.store);
routes.get('/deliverymans/:id', DeliverymanController.show);

routes.get(
  '/deliveryman/:deliveryman_id/deliveries',
  DeliverymanDeliveryController.index
);
routes.get(
  '/deliveryman/:deliveryman_id/deliveries/:id',
  DeliverymanDeliveryController.show
);
routes.put(
  '/deliveryman/:deliveryman_id/deliveries/:id',
  DeliverymanDeliveryController.update
);
routes.get(
  '/deliveryman/:deliveryman_id/deliveries_done',
  DeliverymanDeliveryDoneController.index
);

routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.index);
routes.get(
  '/delivery/:delivery_id/problems/:id',
  DeliveryProblemController.show
);
routes.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);

const upload = multer(multerConfig);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(auth);

routes.post('/recipients', RecipientController.store);
routes.delete('/recipients/:id', RecipientController.destroy);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.destroy);

routes.get('/deliveries/:id', DeliveryController.show);
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);
routes.get('/problems', ProblemController.index);
routes.delete('/problems/:id/cancel-delivery', ProblemController.destroy);

export default routes;
