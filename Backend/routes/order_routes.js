import express from 'express'
const router = express.Router();
import {getOrders, getOrdersById, createOrders, updateOrders, deleteOrders} from '../controllers/order_controllers.js'

router.get('/orders', getOrders);
router.get('/orders/:id', getOrdersById);
router.post('/orders', createOrders);
router.patch('/orders/:id', updateOrders);
router.delete('/orders/:id', deleteOrders);

export default router;