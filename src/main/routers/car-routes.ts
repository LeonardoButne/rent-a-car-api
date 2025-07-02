import { Router } from 'express';
import { makeListAllCarsController } from '../factories/car/list-all-cars-factory';
import { makeGetCarByIdController } from '../factories/car/get-car-by-id-factory';

import { expressAdapterRouter } from '../adapters/express-router-adapter';

const router = Router();

router.get('/cars', expressAdapterRouter(makeListAllCarsController()));
router.get('/:carId', expressAdapterRouter(makeGetCarByIdController()));


export default router; 