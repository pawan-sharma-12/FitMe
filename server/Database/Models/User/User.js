import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import Session from '../Session/Session.js';
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,

        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    phone: {
        type: String,
        required: true,

        trim: true,
        match: /^[0-9]{10}$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    sessions: [{
        yoga_poses: [],
          created_at: {
            type: Date,
            default: Date.now
          }
    }]
    

    ,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
})

userSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        //   await this.save();
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating token');
    }
};

const User = mongoose.model('User', userSchema);

export default User;
