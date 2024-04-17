const express = require("express");
const router = express.Router();
const User = require("./userSchema");
router.use(express.json());
const jwt = require("jsonwebtoken");
router.use(express.urlencoded({ extended: true }));
const auth = require("./auth.js");

router.route("/").get((req, res) => {
   res.send("get all users");
});

// router.route("/:id").get((req, res) => {
//   res.send(`get the user ${req.params.id}`);
// });

// router.route("/new").post((req, res) => {
//   const newUser = new User({
//     email: "email2@email.com",
//     password: "passss12",
//   });
//   newUser.save();
//   res.send("I am the new user");
// });

router.route("/register").post((req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).send({
        message: "user created sucessfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    });
});

router.route("/login").post(async (req, res) => {
  await User.findOne({ email: req.body.email })
    .then((User) => {
      if (req.body.password == User.password) {
        const token = jwt.sign(
          {
            userId: User._id,
            userEmail: User.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );
        res.status(200).send({
          message: "login was succesfull",
          email: User.email,
          token,
        });
      } else {
        res.status(400).send({ message: "passwords dont match" });
      }
    })
    .catch((error) => {
      console.log(error, "===err");
      res.status(404).send({ message: "email not found", error });
    });
});

router.route("/auth-endpoint")
  .get(auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });



module.exports = router;
