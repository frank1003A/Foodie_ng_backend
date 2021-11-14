import mongoose from 'mongoose';

const menuTypeSchema = mongoose.Schema({
    type_name: String,
    description: String
})

menuTypeSchema.virtual('',{
    ref: 'Menu',
    localField: '_id',
    foreignField: 'menu_type_Id'
})

const type = mongoose.model('Menu_Type', menuTypeSchema)

export default type


/*
const input = new Menu_Type({
    type_name: 'Vegetables',
    description: 'This is a type of food, nutritionally perfect for boosting the immune system'
})

const push = await input.save();
*/