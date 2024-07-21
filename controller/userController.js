const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const userValidator = require("../validation/userValidator");
// Load User model
const User = require("../models/User.js");

const userController = {

  StoreUser: (req, res) => {

    const { first_name, middle_name, last_name, phone_number, sex,
      username, password, role, b_date, region, zone,
      wereda, kebele, Efull_name, Eaddress, Ephone_number } = req.body

    var profile_pic;
    if (req.file) {
      if (req.file.mimetype.startsWith("image"))
        profile_pic = `user_${username}`
    }

    // Form validation
    const { errors, isValid } = userValidator.StoreInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    User.findOne({ username: req.body.username, state: 1 }).then(user => {
      if (user) {
        return res.status(400).json({ status: "fail", message: "User name already exists" });
      } else {
        const newUser = new User({
          first_name, middle_name, last_name, phone_number, sex,
          username, password, profile_pic, role, b_date, region, zone,
          wereda, kebele, Efull_name, Eaddress, Ephone_number
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json({
                status: "success",
                massage: "User added successfully",
                data: { user }
              })
              )
              .catch(err => console.log(err));
          });
        });
      }
    });
  },
  AllUser: (req, res) => {

    User.find({ state: 1 }).then(
      users => res.json({ status: "success", data: { users } })
    ).catch(err => res.status(400).json(err));

  },
  OneUser: (req, res) => {
    User.findOne({ _id: req.params.id, state: 1 }).then(
      user => {
        if (user.state)
          res.json({ status: "success", data: { user } })
        else
          res.json({ status: "fail", massage: "User not found" })
      }
    ).catch(err => res.status(400).json(err));
  },
  ChangeProfile: (req, res) => {

    const { username } = req.body
    if (!username) return res.status(400).json({ status: "fail", message: "User name is required" });
    var profile_pic;
    if (req.file) {
      if (req.file.mimetype.startsWith("image"))
        profile_pic = `user_${username}`
    }

    User.findOne({ _id: req.params.id, username, state: 1 }).then(user => {
      if (profile_pic) user.profile_pic = profile_pic;
      if (user) user.username = username;

      user.save();
      res.json({ status: "success", data: { user } });
    }).catch(err => res.status(400).json({ status: "fail", message: "User name not found" }));
  },
  UpdateUser: (req, res) => {

    const { first_name, middle_name, last_name, phone_number, sex,
      role, b_date, region, zone, wereda, kebele, Efull_name,
      Eaddress, Ephone_number } = req.body

    // Form validation
    const { errors, isValid } = userValidator.UpdateInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }

    User.findOne({ _id: req.params.id, state: 1 }).then(
      user => {
        if (user) {
          user.first_name = first_name;
          user.middle_name = middle_name;
          user.last_name = last_name;
          user.phone_number = phone_number;
          user.b_date = b_date;
          user.sex = sex;
          user.role = role;
          user.region = region;
          user.zone = zone;
          user.wereda = wereda;
          user.kebele = kebele;
          user.Efull_name = Efull_name;
          user.Ephone_number = Ephone_number;
          user.Eaddress = Eaddress;

          user.save()
          res.json({ status: "success", data: { user } })
        } else
          res.json({ status: "fail", massage: "User not found" })
      }
    ).catch(err => res.json({ status: "fail", err, massage: "User not found" }));
  },
  ChangePassword: (req, res) => {

    const { password, oldPassword } = req.body

    // Form validation
    const { errors, isValid } = userValidator.PasswordInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    User.findOne({ _id: req.params.id, state: 1 }).then(
      user => {
        if (user) {
          bcrypt.compare(oldPassword, user.password).then(isMatch => {
            if (isMatch) {
              // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                  user.save().then(
                    user => res.json({ status: "success", massage: "Password changed successfully" })
                  )
                });
              });
            }
            else
              res.json({ status: "fail", message: "Older password is incorect" });
          })
        }
        else
          res.json({ status: "fail", massage: "User not found" })
      }
    ).catch(err => res.json({ status: "fail", err, massage: "User not found" }));
  },
  DeleteUser: (req, res) => {

    User.findOne({ _id: req.params.id, state: 1 }).then(

      user => {
        if (user) {
          user.state = 0;
          user.deleted_at = Date.now()
          user.save();
          res.json({ status: "success", massage: "User deleted successfully" })
        }
        else
          res.json({ status: "fail", massage: "User not found" })
      }
    ).catch(err => res.json({ status: "fail", err, massage: "User not found" }));
  },
  LoginUser: (req, res) => {

    const { username, password } = req.body;

    // Form validation
    const { errors, isValid } = userValidator.LoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json({ status: "fail", errors });
    }
    // Find user by username
    User.findOne({ username, state: 1 }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ status: "fail", message: "User name not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched Create JWT Payload
          const payload = {
            id: user.id,
            role: user.role,
            username: user.username

          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 86400 // 1 Day in seconds
            },
            (err, token) => {
              res.json({
                status: "success",
                token: "Bearer " + token,
                username: user.username,
                role: user.role
              });
            }
          );
        } else {
          return res.status(400).json({ status: "fail", message: "Password incorrect" });
        }
      });
    });
  }
}

module.exports = userController