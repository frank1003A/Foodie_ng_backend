import mongoose from "mongoose";

const orderDetails = mongoose.Schema({
    order_id: {ref: 'Orders', type: mongoose.Schema.Types.ObjectId},
    menu_id: {ref: 'Menu', type: mongoose.Schema.Types.ObjectId},
    amount: Number,
    no_of_orders: Number,
    total_amount: Number
})

const orderdets = mongoose.model('OrderDetails',orderDetails)
export default orderdets


