import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    order_id: {ref: "Order", type: mongoose.Schema.Types.ObjectId},
    amount: {ref: "", type: mongoose.Schema.Types.ObjectId},
    paid_By: {ref: "", type: mongoose.Schema.Types.ObjectId},
    payment_date: {ref: "", type: mongoose.Schema.Types.ObjectId},
    confirmed_by: {ref: "", type: mongoose.Schema.Types.ObjectId}
})

const Payment = mongoose.model('Payment', paymentSchema)
export default Payment