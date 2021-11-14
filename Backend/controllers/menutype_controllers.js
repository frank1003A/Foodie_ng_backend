import menuTypeSchema from '../models/menutypeSchema.js'

export const getMenuTypes = async (req,res) => {
    try{
        const types = await menuTypeSchema.find()
        res.status(200).json(types)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export const getMenuTypesById = async (req,res) => {
    res.send('Return a menu type by id')
}

export const createMenuTypes = async (req,res) => {
    const body = req.body
    const newType = new menuTypeSchema(body)
    try {
        await newType.save()
        res.status(200).json(newType)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

export const updateMenuTypeById = async (req,res) => {
    res.send('update menu type by id')
}

export const deleteMenuTypeById = async (req,res) => {
    res.send('delete menu type by id ')
}