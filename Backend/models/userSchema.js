import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullname: String,
    contact: Number,
    email: String,
    username: {ref: 'Customer', type: mongoose.Schema.Types.ObjectId},
    password: {ref: 'Customer', type: mongoose.Schema.Types.ObjectId}
})

const User = mongoose.model('User',userSchema)
export default User;