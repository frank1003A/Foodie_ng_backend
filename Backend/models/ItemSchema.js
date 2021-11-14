import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
    name: String,
    price_unit: Number,
    image: String,
    images: [],
    item_type: {
        type: String,
        trim: true,
    },
    ingredients: String,
    menu_Id: {
        ref: 'Menu',
        type: mongoose.Schema.Types.ObjectId
    },
    item_rating_review: [
        {
            customer_id: {ref: "Customers", type: mongoose.Schema.Types.ObjectId},
            customer_name:String,
            review: {title: String, body: String},
            rating: Number,
        },
    ],
    status : String
},
{timestamps:true},
{minimize: false})

itemSchema.virtual('menu_items', {
    ref: 'Menu',
    localField: '_id',
    foreignField: 'items'
})

itemSchema.virtual('order_items', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'items'
})

const item = mongoose.model('Item',itemSchema)

export default item