import jwt from 'jsonwebtoken'
import adminSchema from '../models/adminSchema.js'
import customerSchema from '../models/customerSchema.js'
const config = process.env

const verifyToken = async (req,res,next) => {
    try{
    const token = req.header('Authorization').replace('Bearer ', '');

    const Decode = jwt.verify(token, config.TOKEN_KEY);

    const Person = await adminSchema.findOne({_id: Decode._id, 'tokens.token': token}) ||
    await customerSchema.findOne({_id: Decode._id, 'tokens.token': token})

    if(!Person) {
        //throw new Error('UNAUTHORIZED')
        res.status(404).send('Not Authorized')
    }
    req.user = await Person;
    req.token = await token;
    next();
    
    }catch(err){
        res.status(401).send(err)
    }
}

export default verifyToken