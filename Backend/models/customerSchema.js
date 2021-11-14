import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const customerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    fullname: String,
    image: String,
    dateofbrith: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    sex: String,
    password: {
        type:String,
        required: true 
    },
    email: {
        type: String,
        unique: true, 
        lowercase: true, 
        required: true
    },
    addresses: [{
        state: String, street: String, landmarks: String
      }],
    phonenumber: {
        type: String,
        unique: true
    },
    default_address: String,
    cart: [{
        item: { ref: "Item", type: mongoose.Schema.Types.ObjectId, unique: true },
        quantity: Number,
        date_added: { type: Date, default: Date.now()},
    }],
    cravelist: [{
        item: { ref: "Item", type: mongoose.Schema.Types.ObjectId, unique : true},
        date_added: { type: Date, default: Date.now()}
    }],
    tokens: [{ token: String }],
    notifications: [{ message: String, status: Boolean }]
},
{timestamps:true},
{minimize: false})


/* mongoose virtual populate to tell mongoose to populate ref field in other collections */
customerSchema.virtual('customer_rate_item',{
    ref: 'Item',
    localField: '_id',
    foreignField: 'customer_id'
})

customerSchema.virtual('customer_rate_restaurant',{
    ref: 'Restaurant',
    localField: '_id',
    foreignField: 'customer_id'
})

customerSchema.virtual('customer_rate_menu',{
    ref: 'Menu',
    localField: '_id',
    foreignField: 'customer_id'
})

customerSchema.virtual('customer_order',{
    ref: 'Orders',
    localField: '_id',
    foreignField: 'customer_id'
})

/*middleware function to encrypt password with bcrypt if it is modidified, 
calling next allows the next middleware function to run after*/
customerSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

customerSchema.methods.comName = async function(){
    const user = this;
    const combine = user.firstname + ' '+ user.lastname
    user.fullname = combine;
    await user.save();
    return combine
}

customerSchema.statics.loginAuth = async (email, password) => {
    const user = await Customer.findOne({$or: [{ email},{password}] })

    if (!user.password){
        throw new Error('invalid email and passowrd')
    }

    const match = await bcrypt.compare(password, user.password);
  
    if (!match){
        throw new Error("invalid email or password")
    }

    return user;
  }

customerSchema.methods.genToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},process.env.TOKEN_KEY,{
        expiresIn: '2h',
    });
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token
}  

const Customer = mongoose.model('Customers', customerSchema);

export default Customer