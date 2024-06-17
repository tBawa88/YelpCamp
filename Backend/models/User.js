import mongoose, { Schema } from "mongoose";

//for now only storing username and password
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    // email: {
    //     type: String,
    //     required: [true, "Email is required"],
    //     unique: true,
    //     match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
    //         , 'Please use a valid email address']
    // },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: [true, 'Username is required'],
//         trim: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         unique: true,
//         match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
//             , 'Please use a valid email address']
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//     },
//     verifyCode: {
//         type: String,
//         required: [true, 'Verify code is required'],
//     },
//     verifyCodeExpire: {
//         type: Date,
//         required: [true, 'VerifyCode Expiry is required'],
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     },
//     isAccepting: {
//         type: Boolean,
//         default: true
//     },
// })