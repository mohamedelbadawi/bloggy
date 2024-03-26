import mongoose, { Schema } from "mongoose";
mongoose.Promise = global.Promise;
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})
const postModel = mongoose.models.Post || mongoose.model('Post', postSchema);
export default postModel;