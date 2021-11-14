import adminSchema from '../models/adminSchema.js'

export const createAdmin = async (req,res) => {
    try{

    const admin  = req.body;

    //image upload logic
    const imagename = req.file.filename;
    admin.image  = imagename;

    //validate empty email and password
    if (!(admin.email && admin.password)){
        res.status(400).send('email and password is required')
    }

    //create new customer
    const newAdmin  = new adminSchema(admin);

    //combine first and lastname
    admin.fullname = await newAdmin.comName();

    //generate token with static method
    const token = await newAdmin.genToken();

    //validate customer 
    await newAdmin.validate();

    //save new customer 
    await newAdmin.save();

    res.status(200).json(newAdmin)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

export const loginAdmin = async (req,res) => {
    try{
       //get admin input
    const {email, password} = req.body

    //validate empty user input
    if (!(email && password)){
        res.status(400).send('email and password is required')
    }

    //Authenticate admin login
    const adminLogin = await adminSchema.loginAuth(email,password)

    //genrate token if admin login is successful 
    const token = await adminLogin.genToken()

    res.status(200).send({token, adminLogin})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}