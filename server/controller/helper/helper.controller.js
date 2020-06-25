const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

exports.transpoter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.createToken = (employee) => {
  return jwt.sign(
    {
      employeeId: employee._id.toString(),
    },
    process.env.JWT_SECRET
  );
};

exports.createTokenClient = (client) => {
  return jwt.sign(
    {
      clientId: client.phone.toString(),
    },
    process.env.JWT_SECRET
  );
};
