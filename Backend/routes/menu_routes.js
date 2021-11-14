import express from 'express'
const router = express.Router()
import {getMenu, getMenuById, createMenu, updateMenuById, deleteMenuById} from '../controllers/menu_controllers.js'

// Return all restaurant menu
router.get('/menu', getMenu);

//Return a single menu
router.get('/menu/:id', getMenuById);

//create menu 
router.post('/menu', createMenu);

//update menu by Id
router.patch('/menu/:id', updateMenuById);

//delete menu
router.delete('/menu/:id', deleteMenuById);

router.post('/menu/:retaurant/:')

export default router


