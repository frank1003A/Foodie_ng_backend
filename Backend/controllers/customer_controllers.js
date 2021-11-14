import customerSchema from "../models/customerSchema.js";
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


//Register customer
export const addCustomer = async (req,res) => {
    try {
    const body = req.body;

    //image upload logic
    const imagename = req.file.filename;
    body.image  = imagename;
    
    //validate empty email and password
    if (!(body.email && body.password)){
        res.status(400).send('email and password is required')
    }
    
    /*check if customer already exist in database*/
    const oldCustomer = await customerSchema.findOne(body)
    if(oldCustomer){
        return res.status(409).send('user already exist, please login')
    }

    //create new customer
    const newCustomer = new customerSchema(body);

    //combine first and lastname
    body.fullname = await newCustomer.comName();

    //validate customer 
    await newCustomer.validate();

    //generate token with static method
    const token = await newCustomer.genToken();

    //save new customer 
    await newCustomer.save();

    res.status(201).json(newCustomer)

    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//login customer 
export const loginCustomer = async (req,res) => {
    try{
    //get user input
    const {email, password} = req.body

    //validate empty user input
    if (!(email && password)){
        res.status(400).send('email and password is required')
    }

    //Authenticate customer login
    const customerLogin = await customerSchema.loginAuth(email,password)
    //genrate token if customer login is successful 
    const token = await customerLogin.genToken()

    res.status(200).send({token, customerLogin})
    }catch(err){
        res.status(404).json({error: err.message})
    }
}

//Update customer details
export const updateCustomer = async (req,res) => {
    const condition = {_id: req.params.id}
    try{
        const updateCustomer = await customerSchema.updateOne(condition, req.body)
        res.status(200).json(updateCustomer)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//add to cart
export const addCart = async (req,res) => {
    try{
        const customer = req.body.customer;
        const cart = req.body.cart;
    const updatedCart = await customerSchema.findByIdAndUpdate(customer, { $push: { cart } }, { new: true })
    .populate()
    res.status(200).send(updatedCart.cart)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

//delete from cart
export const deleteCart = async (req,res) => {
    try{
        const customer = req.body.customer;
        const cart = req.body.cart;
    const removeFromCart = await customerSchema.findByIdAndUpdate(customer, { $pull: { cart: { _id: cart._id } } }, { new: true} )
    res.status(200).send(removeFromCart.cart);
    }catch(err){
        res.status(500).json({error: err.message})
    }
    

}

//add to crave list
export const addCraveList = async (req,res) => {
    try{
        const customer = req.body.customer;
        const cravelist = req.body.cravelist;
    const updateCraveList = await customerSchema.findByIdAndUpdate(customer, {$push: {cravelist}}, {new: true})
    res.status(200).send(updateCraveList.cravelist)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

//delete from crave list
export const deleteCraveList = async (req,res) => {
    try{
        const customer = req.body.customer;
        const cravelist = req.body.cravelist;
        const updateCraveList = await customerSchema.findByIdAndUpdate(
        customer, 
        { $pull: { cravelist : {_id: cravelist._id}}}, 
        { new: true }
        )
        console.log(cravelist)
        res.status(200).send(updateCraveList.cravelist)
        }catch(err){
            res.status(500).json({error: err.message})
        }
}

//password recovery
export const recoverPassword = async (req,res) => {
    try{
        const {email, phonenumber} = req.body;
        const recoverPass = await customerSchema.findOne({$or: [{email },{phonenumber}]})
        res.status(200).send(recoverPass.email)
    }catch(err){
        res.status(404).send(err.message)
    }
}



async function getCustomer(req,res,next){
    try{
        customer = await customerSchema.findById(req.params.id)
        if (customer === null){
            return res.status(404).json({message:"Cannot find customer"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.customer = customer;
    next();
}
