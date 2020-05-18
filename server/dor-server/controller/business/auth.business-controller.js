const Business = require('../../models/business.model');
const { errorHandler } = require('../../helper/dbErrorHandler');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); // to generate signed token
const expressjwt = require('express-jwt'); // for authorization check

exports.register = async (req, res) => {
    const { managerFirstName, managerLastName, managerPhone, managerEmail, password, businessName, businessAddress, businessPhone,
        businessEmail, logo, socialMediaLinks, about, notifications } = req.body;
    //hash password
    const hashedPw = await bcrypt.hash(password, 12);
    const business = new Business({
        managerDetails: {
            managerFirstName,
            managerLastName,
            managerPhone,
            managerEmail,
            hashedPassword: hashedPw
        },
        businessDetails: {
            businessName,
            businessAddress,
            businessPhone,
            businessEmail,
            logo,
            socialMediaLinks,
            about,
            notifications
        }
    });
    business.save((error, business) => {
        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }
        res.json({
            business
        });
    });
};
