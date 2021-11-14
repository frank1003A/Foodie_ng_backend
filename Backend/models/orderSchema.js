import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    restaurant_Id: { ref: "Restaurant", type: mongoose.Schema.Types.ObjectId },
    customer_Id: { ref: "Customers", type: mongoose.Schema.Types.ObjectId },
    confirmed_Id: { ref: "Admins", type: mongoose.Schema.Types.ObjectId },
    items: [{
        item: { ref: "Items", type: mongoose.Schema.Types.ObjectId },
        quantity: Number,
        price: Number,
        total:Number,
        status:Boolean
    }],
    delivery_address:String,
    invoice_number:Number,
    status: {type: String}, // betwwen in-transit, delivered, unavailable  
    order_date: {
        type: Date,
        default: Date.now(),
    },
    delivery_type: {type: String}, //between pick-up and deliver to address   
    delivery_date: Date, //only visible if delivery type is set to => deliver to address 
    return_date: Date, //only visble if item is was somehow affected on transit or spilt
    order_total: Number
},
{timestamps:true},
{minimize: false})

orderSchema.virtual('orderdetails_info',{
    ref: 'OrderDetails',
    localField: '_id',
    foreignField: 'order_id'
})

const Orders = mongoose.model("Orders", orderSchema);
export default Orders