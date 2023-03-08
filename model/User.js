import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }

},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User