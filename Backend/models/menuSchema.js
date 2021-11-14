import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    menu_name: String,
    restaurant_Id: {
        ref: 'Restaurant',
        type: mongoose.Schema.Types.ObjectId
    },
    menu_type_Id: {
        ref: 'Menu_Type', 
        type: mongoose.Schema.Types.ObjectId
    },
    items :[{
        ref: 'Item',
        type: mongoose.Schema.Types.ObjectId
    }],
    menu_rating_review: [
        {
            customer_id: {ref: "Customers", type: mongoose.Schema.Types.ObjectId},
            customer_name:String,
            review: {title: String, body: String},
            rating: Number,
        },
    ],
    menu_image: String,
    menu_status: String

},
{timestamps:true},
{minimize: false})

menuSchema.virtual('menu_item',{
    ref: 'Item',
    localField: '_id',
    foreignField: 'menu_Id'
})

menuSchema.virtual('restaurant_menu',{
    ref: 'Restaurant',
    localField: '_id',
    foreignField: 'menus'
})

const Menu = mongoose.model('Menu',menuSchema)
export default Menu;


/*
menuSchema.methods.statusLogic = function(){
    const Available = false;
    if(this.menu_status === 1){
        Available = true;
    }else {
        Availabe = false;
    }
}
*/