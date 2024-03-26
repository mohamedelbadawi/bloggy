import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    },
    images: {
        type: String,
    }
})
const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;