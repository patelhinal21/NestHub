import mongoose, { mongo } from "mongoose";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";
//Schema for User Details and Room Details
const schema = new mongoose.Schema({


    uniqueID: {
        type: String,

    },

    userEmail: {
        type: String,

    },

    userPassword: {
        type: String,

    },

    firstName: {
        type: String,

    },

    lastName: {
        type: String,

    },

    gender: {
        type: String,

    },

    phone: {
        type: String,

    },

    role: {
        type: String,

    },

    dob_day: {
        type: String,

    },

    dob_month: {
        type: String,

    },

    dob_year: {
        type: String,

    },

    file: {
        type: Array,

    },

    photo: {
        type: String,

    },

    dietary_preferences: {
        type: String,

    },

    smoking_preference: {
        type: String,

    },

    room_photo: {
        type: String,
    },
    title: {
        type: String,

    },
    community: {
        type: String,

    },
    address: {
        type: String,

    },
    from_date: {
        type: Date,

    },
    to_date: {
        type: Date,

    },
    number_of_rooms: {
        type: Number,

    },
    rent_amount: {
        type: Number,

    },
    sharing_price: {
        type: Number,

    },

    private_room_price: {
        type: Number,

    },
    nearest_station: {
        type: String,

    },
    red_eye_accessibility: {
        type: String,

    },
    distance_from_university: {
        type: Number,

    },
    nearby_grocery_stores: {
        type: String,

    },
    amenities: {
        type: String,

    },
    matches: {
        type: Array
    }
}, { timestamps: true, versionKey: false });

const model = mongoose.model('users', schema);

const validate = (data) => {
    const schema = Joi.object({
        userEmail: Joi.string().required().label("User Email ID"),
        userPassword: passwordComplexity().required().label("User password")

    })
    return schema.validate(data);
}

export { model, validate, }