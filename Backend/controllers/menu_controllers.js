import menuSchema from '../models/menuSchema.js'

export const getMenu = async (req,res) => {
    try{
        const menu = await menuSchema.find()
        res.status(200).json(menu)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getMenuById = async (req,res) => {
    res.send('get a menu')
}

export const createMenu = async (req,res) => {
    const body = req.body
    const newMenu = new menuSchema(body)
    try {
        await newMenu.save()
        res.status(201).json(newMenu)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const updateMenuById = async (req,res) => {
    res.send('update menu')
}

export const deleteMenuById = async (req,res) => {
    res.send('delete menu')
}