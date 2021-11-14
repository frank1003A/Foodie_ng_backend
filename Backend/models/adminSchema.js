import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        fullname: String,
        date_of_birth: {
            type: Date, 
            required: true,
            default: Date.now()
        },
        image: String,
        sex: String,
        password:{type: String, required: true},
        email: { type: String, unique: true, required: true },
        phone_number: {type:String, unique:true, required: true},
        is_email_verified:Boolean,
        is_phone_verified:Boolean,
        addresses: [
            {
                state: String,
                street: String,
                landmarks: String,
            },
        ],
        tokens: [{ token: String }],
        notifications: [{ message: String, status: Boolean }],
    },
    { timestamps: true },
    { minimize: false }
);

adminSchema.virtual('admin_confirmation',{
    ref:'Orders',
    localField: '_id',
    foreignField: 'confirmed_Id'
})

/*middleware function to encrypt password with bcrypt if modidified*/
adminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

adminSchema.methods.comName = async function(){
    const Admin = this;
    const combine = Admin.firstname + ' '+ Admin.lastname
    Admin.fullname = combine;
    await Admin.save();
    return combine
}

adminSchema.statics.loginAuth = async (email, password) => {
    const user = await admin.findOne({$or: [{ email},{password}] })

    if (!user.password){
        throw new Error('invalid email and passowrd')
    }

    const match = await bcrypt.compare(password, user.password);
  
    if (!match){
        throw new Error("invalid email or password")
    }

    return user;
  }

adminSchema.methods.genToken = async function(){
    const Admin = this;
    const token = jwt.sign({_id: Admin._id.toString()},process.env.TOKEN_KEY,{
        expiresIn: '2h',
    });
    Admin.tokens =Admin.tokens.concat({token})
    await Admin.save();
    return token
}  

const admin = mongoose.model('Admin', adminSchema)
export default admin