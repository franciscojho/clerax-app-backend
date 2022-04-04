import mongoose from 'mongoose'

const { Schema, model, SchemaTypes } = mongoose

const AdSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'The name is required'],
        },
        expirationDate: {
            type: Date,
            required: [true, 'The expirationDate is required'],
        },
        rate: {
            type: Number,
            required: [true, 'The rate is required'],
        },
        frequency: {
            type: String,
            required: [true, 'The frequency is required'],
        },
        lunchIncluded: {
            type: Boolean,
            required: [true, 'The lunchIncluded is required'],
        },
        fareIncluded: {
            type: Boolean,
            required: [true, 'The fareIncluded is required'],
        },
        description: {
            type: String,
            required: [true, 'The description is required'],
        },
        region: {
            type: String,
            required: [true, 'The region is required'],
        },
        province: {
            type: String,
            required: [true, 'The province is required'],
        },
        city: {
            type: String,
            required: [true, 'The city is required'],
        },
        addressReference: {
            type: String,
            required: [true, 'The addressReference is required'],
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            required: [true, 'The status is required'],
        },
        user: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Ad = model('Ad', AdSchema)

export default Ad
