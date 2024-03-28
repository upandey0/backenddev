import mongoose from 'mongoose'


const user = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

const newUser = mongoose.model('user',user);
export default newUser