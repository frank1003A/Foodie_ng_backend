import itemSchema from '../models/ItemSchema.js'

export const getItems = async (req,res) =>{
    try {
        const items = await itemSchema.find()
        res.status(200).json(items)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

export const getItemsById = async (req,res) =>{
    res.send('Get items by id')
}

export const createItems = async (req,res) =>{
    const body = req.body
    const newItem = new itemSchema(body)
    try {
        await newItem.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

export const updateItemsById = (req,res) =>{
    res.send('update an item')
}

export const deleteItemsById = (req,res) =>{
    res.send('delete an item')
}