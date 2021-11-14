//imports
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import customerRoutes from './routes/customer_routes.js'
import orderRoutes from './routes/order_routes.js'
import restaurantRoutes from './routes/restaurant_routes.js'
import menuRoutes from './routes/menu_routes.js'
import menutypeRoutes from './routes/menutype_routes.js'
import itemRoutes from './routes/item_routes.js'
import adminRoutes from './routes/admin_routes.js'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.MONGOOSE_CONNECTION_URL;


//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({limit:'30mb', extended:true }))
app.use(bodyparser.json({limit:'30mb', extended:true }))
app.use(express.static("uploads"))

//database connection => mongoDB 
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Connected to database'))
.catch((err) => console.log(err.message));

//routes prefix 
app.use('/foodie', 
adminRoutes, 
customerRoutes, 
restaurantRoutes, 
menuRoutes, 
menutypeRoutes, 
itemRoutes
)

//start server
app.listen(PORT, () => console.log(`Server running at http://localhost: ${PORT}`))