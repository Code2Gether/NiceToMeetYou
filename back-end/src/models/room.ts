import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_ROUNDS: number = 6;

const roomSchema = new Schema(
    {
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
        tempRoomId: String,
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

roomSchema.pre('save', async function (next) {
    const room = this;
    if (room.isModified('password'))
        room.password = await bcrypt.hash(room.password, SALT_ROUNDS);
    next();
});

roomSchema.methods.comparePassword = function (tryPassword, callback) {
    bcrypt.compare(tryPassword, this.password, callback);
};

roomSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
    },
});

export const Room = mongoose.model('Room', roomSchema);
