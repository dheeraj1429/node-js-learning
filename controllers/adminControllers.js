const product = require('../models/productSchema');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const rootFolder = require('../util/rootFolder');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const UserCart = require('../cart');
const UserMail = require('../util/mailler');
const KEY = process.env.SCRET_KEY;
const bcryptjs = require('bcryptjs');

// Product upload page => GET
const uploadProductPage = async (req, res, next) => {
    try {
        // const { userInfo } = req.cookies;
        const userInfo = req.session.userInfo;

        if (userInfo) {
            const varifyToken = await jwt.verify(userInfo, KEY);

            return res.render('pages/productUpload', {
                head: 'product upload',
                userInfo: varifyToken,
            });
        }

        res.render('pages/productUpload', {
            head: 'product upload',
            userInfo: undefined,
        });
    } catch (err) {
        console.log(err);
    }
};

// Create a product => POST
const uploadProduct = async function (req, res, next) {
    try {
        const { title, description, price } = req.body;
        const image = req.file;
        const pathArr = image.path.split('\\');
        pathArr.shift();
        const originalPath = pathArr.join('\\');

        if (!image) {
            return res.render('pages/productUpload', {
                head: 'product upload',
            });
        } else {
            const newProduct = await product({
                name: title,
                discription: description,
                image: originalPath,
                price: price,
            });

            const productRef = await newProduct.save();

            if (productRef) {
                return res.redirect('/home/card');
            }
        }
    } catch (err) {
        console.log(err);
    }
};

// edit products
const editProducts = async function (req, res, next) {
    try {
        const { name, description, price, id } = req.body;
        const image = req.file;

        if (!image) {
            return res.render('pages/productEdit', {
                head: 'product edit',
            });
        } else {
            const findUpdatedProduct = await product.updateOne(
                { $or: [{ name }, { _id: id }] },
                { $set: { name, description, image: image.path, price } }
            );

            if (findUpdatedProduct) {
                return res.redirect('/home/card');
            }
        }
    } catch (err) {
        console.log(err);
    }
};

// delete product
const deleteDbProduct = async function (req, res, next) {
    try {
        const { cardItem } = req.body;
        const findBdProduct = await product.deleteOne({ _id: cardItem });

        if (!findBdProduct) return;

        if (findBdProduct) {
            return res.redirect('/home/card');
        }
    } catch (err) {
        console.log(err);
    }
};

// send email => POST
const sendEmail = async function (req, res, next) {
    try {
        const { email, number, message, name } = req.body;
        const transporter = UserMail.userMellterFunction();

        fs.readFile(
            path.join(rootFolder, 'views', 'pages', 'mail.ejs'),
            'utf-8',
            function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    const html = ejs.render(data, {
                        name,
                        email,
                        message,
                        number,
                    });

                    const mailOptions = UserMail.mailOptionsFunction(
                        UserCart.UserEmail,
                        email,
                        data,
                        html
                    );

                    transporter.sendMail(mailOptions, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/home/card');
                            alert('mail send successful!!');
                        }
                    });
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
};

// forget password
const userForgetPassword = async function (req, res, next) {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email });

        const userDataInfo = await jwt.sign(
            { id: findUser._id, name: findUser.name, email: findUser.email },
            KEY
        );

        if (findUser && userDataInfo) {
            const transporter = UserMail.userMellterFunction();

            fs.readFile(
                path.join(rootFolder, 'views', 'pages', 'userForgetPassword.ejs'),
                'utf-8',
                function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        const html = ejs.render(data, {
                            name: findUser.name,
                            id: userDataInfo,
                            email: findUser.email,
                        });

                        const mailOptions = UserMail.mailOptionsFunction(
                            UserCart.UserEmail,
                            findUser.email,
                            data,
                            html
                        );

                        transporter.sendMail(mailOptions, function (err, result) {
                            if (err) {
                                return res.render('pages/mailerror', {
                                    head: 'somthing worng',
                                    userInfo: undefined,
                                });
                            } else {
                                return res.render('pages/mailsuccess', {
                                    head: 'mail-success',
                                    userInfo: undefined,
                                });
                            }
                        });
                    }
                }
            );
        } else {
            console.log('no user preset!!');
        }
    } catch (err) {
        console.log(err);
    }
};

// rest password
const resetPassword = async function (req, res, next) {
    try {
        const { confirmPassword, password, userToken } = req.body;

        if (password && confirmPassword && password === confirmPassword) {
            const varifyToken = await jwt.verify(userToken, KEY);
            const passwordHash = await bcryptjs.hash(password, 11);

            const updatePasswordUser = await User.updateOne(
                { _id: varifyToken.id },
                { $set: { password: passwordHash } }
            );

            if (updatePasswordUser) {
                res.redirect('/home/signin');
            } else {
                console.log('somthing worng!!');
            }
        } else {
            return;
        }
    } catch (err) {
        console.log(err);
    }
};

// upload videos
const uploadVideos = async function (req, res, next) {
    try {
        console.log(req.body);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    uploadProductPage,
    uploadProduct,
    editProducts,
    deleteDbProduct,
    sendEmail,
    userForgetPassword,
    resetPassword,
    uploadVideos,
};
