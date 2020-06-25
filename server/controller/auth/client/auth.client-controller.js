const mongoose = require("mongoose");
const { isPhoneNumnerExist} = require("../../../utils/error/dbErrorHandler");
const { createTokenClient } = require("../../helper/helper.controller");
const bcrypt = require("bcrypt");

exports.clientRegister = async (req, res, next) => {
  try {
    const { phone, name, lastName } = req.body;
    const Client = require("../../../models/client.model")(req.mongo);
    const client = await Client.findOne({ phone: phone });
    console.log(client);
    //isPhoneNumnerExist(client)
    const newClient = new Client({
      phone,
      name,
      lastName
    });
    await newClient.save();

    const token = createTokenClient(newClient);
    res.status(201).json({ message: "create new client", token: token, clientDetails: newClient });
  } catch (error) {
    return next(error);
  }
};

exports.clientLogin = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const Client = require("../../../models/client.model")(req.mongo);
    const client = await Client.findOne({ phone });
    let token = ''

    if (client) {
      token = createTokenClient(client);
    }


    res.status(200).json({
      message: "Client login success",
      token,
      clientDetails: client,
    });
  } catch (error) {
    return next(error);
  }
};

