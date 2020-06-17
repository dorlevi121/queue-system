const { error404, error422 } = require("../../../utils/error/dbErrorHandler");

const Domain = require("../../../models/domain.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // to generate signed token
const { createToken, transpoter } = require("../../helper/helper.controller");

exports.mail = async (req, res, next) => {
  try {
    transpoter.sendMail({
      to: "dorlevy121@gmail.com",
      from: "kavanu@kavanu.com",
      subject: "are you ready",
      html: "<p> when you us to speak?</p>",
    });

    res.status(200);
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

// const accountSid = "AC71b5c46e2de8d97a3dfb0cd08776cf4a";
// const authToken = "f25ed123c124724259a4cda167f7c230";
// const client = require("twilio")(accountSid, authToken);

exports.employeeSmsResetPassword = async (req, res, next) => {
  try {
    const { phone: email } = req.body;
    const domain = await Domain.findOne({ email: email });
    error404(domain);

    const token = jwt.sign(
      {
        domain,
        email: email,
      },
      process.env.JWT_SECRET
    );

    // client.messages
    //   .create({
    //     body: `אנא לחץ על הלינק https://kavanuu.firebaseapp.com/resetPassword/${token}      ${phone}`,
    //     from: "+12069845943",
    //     to: "+972543055086",
    //   })
    //   .then((message) => console.log(message.sid))
    //   .done();

    // transpoter.sendMail({
    //   to: "igilfu@gmail.com",
    //   from: "kavanu@kavanu.com",
    //   subject: "reset password",
    //   html: `<a>http://localhost:3000/business/resetpassword/${token}</a>
    //             <p> click in here </p>
    //             <p> phone : ${phone} </p>
    //             <p> domain : ${domain} </p>

    //             `,
    // });

    transpoter.sendMail({
      to: email,
      from: "kavanu@kavanu.com",
      subject: "reset password",
      html: ` 
      <div>
      <a>http://localhost:3000/business/resetpassword/${token}</a>
                <p> click in here </p>
                <p> phone : ${email} </p>
                <p> domain : ${domain} </p>
      </div>
                `,
    });

    res.status(200).json({
      message: "sms for reset sent to" + email,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

exports.employeeResetPassword = async (req, res, next) => {
  try {
    error422(req);
    const { password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);
    req.employee.password = hashedPw;

    await req.employee.save();

    const token = createToken(req.employee);
    res.status(205).json({
      message: "employee change password success",
      token,
      domain: req.domain,
    });
  } catch (error) {
    return next(error);
  }
};
