import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model, SchemaTypes } = mongoose

const UserSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'The fullName is required'],
        },
        email: {
            type: String,
            required: [true, 'The email is required'],
        },
        dni: {
            type: Number,
            required: [true, 'The dni is required'],
        },
        mobile: {
            type: Number,
            required: [true, 'The mobile is required'],
        },
        password: {
            type: String,
            required: [true, 'The password is required'],
        },
        ads: [
            {
                type: SchemaTypes.ObjectId,
                required: true,
                ref: 'Ad',
            },
        ],
    },
    {
        timestamps: true,
    }
)

UserSchema.pre('save', async function () {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync())
    }
})

UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...user } = this.toObject()
    user.uid = _id
    return user
})

const User = model('User', UserSchema)

export default User
