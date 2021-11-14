import express from "express";
const router = express.Router();
import upload from '../middleware/imgWare.js'
import 
{   
    createRestaurants, 
    updateRestaurantsId,
    createMenu,
    getMenu,
    updateMenuById,
    deleteMenuById
    //restaurantLogic
} 
from '../controllers/restaurant_controllers.js'

//create restaurant 
router.post('/restaurants/add',upload, createRestaurants);

//update restaurant detail by Id
router.patch('/restaurants/:id', updateRestaurantsId);

//create menu 
router.post('/restaurant/menu/add', createMenu);

// Return all restaurant menu
router.get('/restaurant/menu', getMenu);

//update menu by Id
router.patch('/restaurant/menu', updateMenuById);

//delete menu
router.delete('/restaurent/menu', deleteMenuById);

//router.get('/:restaurant/:menus/', restaurantLogic);

export default router