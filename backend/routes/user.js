const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Prod = require("../models/prod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const multer = require("multer");
const checkauth = require("../middleware/check-user");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts, please try again later.",
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-profile");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

/*************-Signup-********** */

router.post("/signup", async (req, res, next) => {
  try {
    const emailExists = await User.exists({ email: req.body.email });
    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const result = await user.save();
    res.status(201).json({
      message: "User created!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "An error occurred while creating the user.",
    });
  }
});

/*************-Login-********** */

router.post("/login", limiter, (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Incorrect Phone number !",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrecst password !",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer_secret_this_should_be_longer_",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        userName: fetchedUser.name,
        userPicture: fetchedUser.imgPath,
        userRole: fetchedUser.roles[0],
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed !",
      });
    });
});
/*************-Edit User-********** */

router.patch(
  "/EditUser",
  multer({ storage: storage }).single("file"),
  async (req, res, next) => {
    try {
      const id = req.body.userId;
      const url = req.protocol + "://" + req.get("host");

      const userUpdated = {
        userId: req.body.userId,
        name: req.body.name,
        phonenum: req.body.phonenum,
        imgPath: url + "/file-profile/" + req.file.filename,
        password: hash,
        email: req.body.email,
        category: req.body.category,
        speciality: req.body.speciality,
        location: req.body.location,
      };
      const options = { new: true };

      const userYP = await User.findByIdAndUpdate(id, userUpdated, options);
      res.send(userYP);
      console.log("User updated !");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: err,
        message: "User update failed !",
      });
    }
  }
);

/*************-Get Users-********** */

router.get("/data", (req, res, next) => {
  User.find({ roles: "user" })
    .select(["-password", "-imgPath", "-location", "-orders", "-__v"])
    .then((documents) => {
      res.status(200).json({
        message: "Users data runs seccesfully !",
        users: documents,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Users data Failed !",
      });
    });
});
/*************-Get Users with filter-********** 

router.get("/search", async (req, res) => {
  const query = req.query.name;

  try {
    const user = await User.find({
      name: { $regex: "^" + query, $options: "i" },
      roles: "student",
    }).select(["_id", "name", "imgPath", "email"]);
    res.status(200).json({
      message: "User runs seccesfully !",
      users: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "User Failed !",
    });
  }
});


/*************-Update User-********** */

router.patch(
  "/UpdateUser",
  multer({ storage: storage }).single("file"),
  async (req, res, next) => {
    try {
      const id = req.body.userId;
      const url = req.protocol + "://" + req.get("host");

      const userUpdated = {
        name: req.body.name,
        phonenum: req.body.phonenum,
        imgPath: url + "/file-profile/" + req.file.filename,
        email: req.body.email,
        category: req.body.category,
        location: req.body.location,
        verified: "true",
      };
      const options = { new: true };
      const userYP = await User.findByIdAndUpdate(id, userUpdated, options);
      res.send(userYP);
      console.log("User updated !");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: err,
        message: "User update failed !",
      });
    }
  }
);

/*************-Admin Add User-********** */

router.post(
  "/AdminAddUser",
  multer({ storage: storage }).single("file"),
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const url = req.protocol + "://" + req.get("host");

      const user = new User({
        name: req.body.name,
        phonenum: req.body.phonenum,
        imgPath: url + "/file-profile/" + req.file.filename,
        password: hash,
        email: req.body.email,
        category: req.body.category,
        speciality: req.body.speciality,
        location: req.body.location,
        verified: "true",
        roles: [req.body.role],
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "user created!",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
            message: "This user already exited !",
          });
        });
    });
  }
);

/***************-Delete-*******************/

router.delete("/delete", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User Deleted seccesfully !",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});
module.exports = router;
