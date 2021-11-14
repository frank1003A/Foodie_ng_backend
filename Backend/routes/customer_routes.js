import express from 'express'
const router = express.Router();
import routeAuth from '../middleware/route-Auth.js'
import 
{
    addCustomer,
    loginCustomer, 
    updateCustomer, 
    addCart, 
    deleteCart, 
    addCraveList, 
    deleteCraveList,
    recoverPassword
} from '../controllers/customer_controllers.js'
import upload from '../middleware/imgWare.js'

//add new customer
router.post('/customer', upload, addCustomer)
/* route to create a new customer account.
    customer will not be able to delete 
    another customer account
 */

//customer login
router.post('/login-customer', loginCustomer)
/* 
  customer will login with username and password detail from customer collection
 */

//password recovery
router.patch('/customer/:id', updateCustomer)

//add to cart
router.post('/cart' , addCart)
/* 
  add to cart containing items that have been selected but not ordered
*/

//delete cart 
router.delete('/cart', deleteCart)
/* 
  delete from cart containing items that have been selected but not ordered
*/ 

//add to cravelist
router.post('/crave', addCraveList)
/* 
  add to list containing items customer craves
*/

//delete from cravelist
router.delete('/crave', deleteCraveList)
/* 
  delete from list containing items customer craves
*/

//recover password when forgotten
router.patch('/password_recovery', recoverPassword)
/**
 * recover password if forgotten
 */

export default router 