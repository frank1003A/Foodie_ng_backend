import mongoose from 'mongoose'

const restaurantSchema = mongoose.Schema({
    name: String,
    default_address: String,
    addresses: [{
        state: String, street: String, landmarks: String
      }],
    images: [{type: String}],
    buisness_phone: String,
    phone_numbers: [{type:String}],
    menus: [{
        ref: 'Menu', 
        type: mongoose.Schema.Types.ObjectId
    }],
    notifications: [{ message: String, status: Boolean }],
    Admins: [{ 
        ref: 'Admin',
        type: mongoose.Schema.Types.ObjectId
    }],
    rating_review: [
        {
            customer_id: {ref: "Customers", type: mongoose.Schema.Types.ObjectId},
            customer_name:String,
            review: {title: String, body: String},
            rating: Number,
        },
    ],
},
{timestamps:true}, 
{minimize: false}
)

restaurantSchema.virtual('menu_populate',{
    ref: 'Menu',
    localField: '_id',
    foreignField: 'restaurant_Id'
})

restaurantSchema.virtual('order_populate',{
    ref: 'Orders',
    localField: '_id',
    foreignField: 'restaurant_Id'
})



const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant