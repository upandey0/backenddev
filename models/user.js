import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const user = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String, // Cloudinary URL 
        required: true
    },
    coverimage: {
        type: String
    },
    wathhistory: [
        {
            tpye: mongoose.Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    password:{
        type: String,
        required: [true, 'password is required']
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

user.pre('save', async function (next){
    if(this.isModified("password")){
         this.password = bcrypt.hash( this.password, 10)
    }
    next();
})

user.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const newUser = mongoose.model('user',user);
export default newUser