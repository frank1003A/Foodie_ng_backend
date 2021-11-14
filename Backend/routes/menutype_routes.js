import express from 'express'
const router = express.Router()

import {getMenuTypes, getMenuTypesById, createMenuTypes, updateMenuTypeById, deleteMenuTypeById} from '../controllers/menutype_controllers.js'

router.get('/types', getMenuTypes)
router.get('/types/:id', getMenuTypesById)
router.post('/types', createMenuTypes)
router.patch('/types/:id', updateMenuTypeById)
router.delete('/types/:id', deleteMenuTypeById)

export default router