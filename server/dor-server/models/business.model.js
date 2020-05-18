const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    managerDetails: {
        managerFirstName: {
            type: String,
            trim: true,
            required: true, // remove whitespace characters
            maxlength: 32
        },
        managerLastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        managerPhone: {
            type: String,
            trim: true,
            required: true,
            maxlength: 11
        },
        managerEmail: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        hashedPassword: {
            type: String,
            required: true
        }
    },

    businessDetails: {
        businessName: {
            type: String,
            trim: true,
            required: true, // remove whitespace characters
            maxlength: 32
        },
        businessAddress: {
            type: String,
            trim: true,
            required: true,
            maxlength: 64
        },
        businessPhone: {
            type: String,
            trim: true,
            required: true,
            maxlength: 11,
            unique: true
        },
        businessEmail: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        logo: {
            type: String,
            required: false,
            default: ""
        },
        socialMediaLinks: {
            type: Map,
            require: false,
            default: {}
        },
        about: {
            type: String,
            require: false,
            default: ""
        },
        notifications: {
            type: [String],
            require: false,
            default: []
        }
    }
},
    { timestamps: true }
);


module.exports = mongoose.model('Business', businessSchema);