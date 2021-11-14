import mongoose from 'mongoose'
import restaurantSchema from '../models/restaurantSchema.js'
import menuSchema from '../models/menuSchema.js'

//Create restaurant
export const createRestaurants = async (req,res) => {
    const body = req.body
    const newRestaurant = new restaurantSchema(body)
    try {
        await newRestaurant.save()
        res.status(200).json(newRestaurant)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

}

// update restaurant
export const updateRestaurantsId = async (req,res) => {
    res.send('update restaurant by Id')
}

//create menu
export const createMenu = async (req,res) => {
    const body = req.body
    const newMenu = new menuSchema(body)
    const passMenu = await restaurantSchema.findByIdAndUpdate(
        body.restaurant_Id, {$push: {menus : newMenu._id}}, {new: true})
    try {
        await newMenu.save()
        res.status(201).json(newMenu)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}


//get all restaurnt menu
export const getMenu = async (req,res) => {
    try{
        //restaurant id
        const restId = req.body.restId

        //retrieve menu records by restaurnat Id 
        const menu = await menuSchema.find({restaurant_Id : restId})


        res.status(200).send(menu)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

//update menu by id
export const updateMenuById = async (req,res) => {
    const body = req.body;
    try{

    }catch(err){
        
    }

}

//delete menu by id 
export const deleteMenuById = async (req,res) => {
    const menu = req.body.menu;
    const restaurant_Id = req.body.restaurant_Id;
    try {
        const findMenuId = await menuSchema.find({'_id':mongoose.Types.ObjectId(menu._id)})
        //
    
        const updateMenu = await restaurantSchema.findByIdAndUpdate(
            restaurant_Id, {$pull: { menus : menu._id }}, {new: true})

        //    
        const deletedMenuId = await menuSchema.deleteOne({'_id': mongoose.Types.ObjectId(menu._id)})
        res.status(200).send({deletedMenuId, updateMenu})
        console.log(findMenuId)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
