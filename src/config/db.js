import mongoose from "mongoose";
export const connection = async () => {
    try {
        mongoose.connect(process.env.DB_URL)
        mongoose.connection.on(('connected'), () => {
            console.log('Db connection established')
        })
        mongoose.connection.on(('error'), (err) => {
            console.log('Db connection error', err);
            process.exit();
        })
    } catch (error) {
        console.error(error)
    }
}