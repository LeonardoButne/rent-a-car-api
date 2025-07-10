import { Router } from 'express';
import { expressAdapterRouter } from '../adapters/express-router-adapter';
import { makeCreateNotificationController } from '../factories/notification/create-notification-factory';
import { makeListNotificationsByUserController } from '../factories/notification/list-notifications-by-user-factory';
import { makeMarkNotificationAsReadController } from '../factories/notification/mark-notification-as-read-factory';

const router = Router();

router.post('/notifications', expressAdapterRouter(makeCreateNotificationController()));
router.get('/notifications', expressAdapterRouter(makeListNotificationsByUserController()));
router.patch('/notifications/:id/read', expressAdapterRouter(makeMarkNotificationAsReadController()));

export default router; 