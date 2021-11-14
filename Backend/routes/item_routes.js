import express from 'express'
const router = express.Router();
import {getItems, getItemsById, createItems, updateItemsById, deleteItemsById} from '../controllers/item_controllers.js'

router.get('/items', getItems)
router.get('/items/:id', getItemsById)
router.post('/items', createItems)
router.patch('/items/:id', updateItemsById)
router.delete('/items/:id', deleteItemsById)

export default router