import mongoose from "mongoose";

const rentSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Images: {
        type: Array,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Rating: {
        type: Number
    },
    Property: {
        type: String,
    },
    Duration: {
        type: Number,
    }
}
)

const Rent = mongoose.model('Rent', rentSchema)

export default Rent