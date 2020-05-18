exports.businessSignupValidator = (req, res, next) => {
    // Manager Details
    req.check("managerFirstName").not().isEmpty().withMessage('שם פרטי הוא שדה חובה')
    req.check("managerLastName", "שם משפחה הוא שדה חובה").notEmpty();
    req.check("managerEmail", 'אימייל חייב להיות בין 3 ל 32 תווים')
        .matches(/.+\@.+\..+/)
        .withMessage('אימייל חייב להכיל @')
        .isLength({
            min: 6,
            max: 32
        });
    req.check("password", "סיסמא הוא שדה חובה").notEmpty();
    req.check('password')
    .isLength({
        min: 6
    })
    .withMessage('הסיסמא חייבת להכיל לפחות 6 תווים')
    .matches(/\d/)
    .withMessage('הסיסמא חייבת להכיל מספר');
    req.check("managerPhone", "טלפון הוא שדה חובה").notEmpty();

    //Business Details
    req.check("businessName").not().isEmpty().withMessage('שם העסק הוא שדה חובה')
    req.check("businessAddress", "כתובת העסק הוא שדה חובה").notEmpty();
    req.check("businessEmail", 'אימייל חייב להיות בין 3 ל 32 תווים')
        .matches(/.+\@.+\..+/)
        .withMessage('אימייל חייב להכיל @')
        .isLength({
            min: 6,
            max: 32
        });
    req.check("businessPhone", "טלפון העסק הוא שדה חובה").notEmpty();


    const errors = req.validationErrors();
    if(errors) {         
        const firstError = errors.map(err => err.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};