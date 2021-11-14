import express from 'express'
const router = express.Router();
import {createAdmin, loginAdmin} from '../controllers/admin_controllers.js'
import upload from '../middleware/imgWare.js'

//create admin account
router.post('/admin',upload,createAdmin)

//login Admin
router.post('/auth-admin',loginAdmin)

export default router 