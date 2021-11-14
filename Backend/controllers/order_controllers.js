import orderSchema from '../models/orderSchema.js'

//Get all customer order
export const getOrders = (req,res) => {
    res.send('Get all customer order')
}
//Get order by Id
export const getOrdersById = async (req,res) => {
    res.send('Get order by Id')
}
//Create Order
export const createOrders = async (req,res) => {
    res.send('create order')
}
// update Order
export const updateOrders = async (req,res) => {
    res.send('update order by Id')
}
//delete Order
export const deleteOrders = async (req,res) => {
    res.send('delete order by Id')
}