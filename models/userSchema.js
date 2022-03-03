const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const KEY = process.env.SCRET_KEY;

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'please enter the name'],
   },
   email: {
      type: String,
      required: [true, 'please enter the email address'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'pelase enter the password'],
   },
   CreatedAt: {
      type: Date,
      default: Date.now,
   },
   tokens: [
      {
         token: {
            type: String,
            required: [true, 'token is required!!'],
         },
      },
   ],
});

userSchema.methods.genrateUserToken = async function () {
   try {
      const token = await jwt.sign({ id: this._id, name: this.name }, KEY);

      this.tokens = this.tokens.concat({ token });
      this.save();

      return token;
   } catch (err) {
      console.log(err);
   }
};

userSchema.pre('save', async function (next) {
   try {
      if (this.isModified('password')) {
         const passwordHash = await bcryptjs.hash(this.password, 11);
         this.password = passwordHash;
      }
      next();
   } catch (err) {
      console.log(err);
   }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
