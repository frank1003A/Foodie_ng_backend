import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
    menu_id: {ref: "", type: mongoose.Schema.Types.ObjectId},
    score: Number,
    remarks: String,
    dateRecorded: Date,
    rating_rating: [
        {
          customer: { ref: "Customers", type: mongoose.Schema.Types.ObjectId },
          review: { title: String, body: String },
          rating: Number,
        },
      ],
    customer_id: {ref: "", type: mongoose.Schema.Types.ObjectId}
})

const Rate = mongoose.model('Rate',ratingSchema)
export default Rate