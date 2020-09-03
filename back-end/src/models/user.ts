import mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_ROUNDS: number = 6;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: async (value) => {
                if (!(await validator.isEmail(value))) {
                    throw new Error('Email is invalid');
                }
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            },
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    next();
});

userSchema.methods.comparePassword = function (tryPassword, callback) {
    bcrypt.compare(tryPassword, this.password, callback);
};

//! Remove fields before sending back
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
    },
});

export const User = mongoose.model('User', userSchema);
