import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

/*
think of more stuff to add to the user schema?

what important items should a user have?

most important promoter things?
- easy to see location
- easy to get all forms of contact

most important band things?
- easy method to listen to tunes
- easy contact (all band's numbers/emails?)
*/
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    type: {
        type: String,
        required: true,
        enum: {
            values: ['band', 'promoter'],
            message: 'User can either be a Band or a Promoter, please pick one.'
        }
    }
    /*name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    links: [{
        linkName: {
            type: String
        },
        linkUrl: {
            type: String
        }
    }]*/
});

userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.statics.validateLogin = async (username, password) => {
    const user = await userModel.findOne({ username });

    if(!user){
        throw new Error('Please enter a valid username/password!');
    }

    const isCorrectUser = await bcrypt.compareSync(password, user.password);
    if(!isCorrectUser){
        throw new Error('Please enter a valid username/password!');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

const userModel = mongoose.model('User', userSchema);

export default userModel;