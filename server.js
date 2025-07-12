const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePics", express.static("profilePics"));
app.use(express.static(path.join(__dirname, "./client/build")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "profilePics");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.listen(4444, () => {
  console.log("Listening to the Port Number 4444");
});

app.get("*", (req, res) => {
  res.sendFile("./client/build/index.html");
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);
  let userArray = await user.find().and([{ email: req.body.email }]);
  if (userArray.length > 0) {
    if (userArray[0].password === req.body.password) {
      let dataToSend = {
        firstName: userArray[0].firstName,
        lastName: userArray[0].lastName,
        age: userArray[0].age,
        email: userArray[0].email,
        mobileNumber: userArray[0].mobileNumber,
        profilePic: userArray[0].profilePic,
      };
      res.json({
        status: "Success",
        msg: "Credentials are correct, Login Successfully",
        // data: userArray[0],
        data: dataToSend,
      });
    } else {
      res.json({ status: "Failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "Failure", msg: "User Doesnot Exist" });
  }
});

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  try {
    let newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber,
      profilePic: req.file.path,
    });
    await user.insertMany([newUser]);
    console.log("Successfully inserted the data into MDB");
    res.json({ status: "Success", message: "Account is created successfully" });
  } catch (error) {
    console.log(error);
    console.log("Unable to Inser the data into MDB");
    res.json({ status: "Failure", message: "Unable to create an account" });
  }
});

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobileNumber: Number,
  profilePic: String,
});

let user = new mongoose.model("users", userSchema, "2502users");

// let insertDataIntoDB = async () => {};

const connectToMDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://yugendhar:yugendhar1695@mernbrn.jhqgbl1.mongodb.net/MERN2502?retryWrites=true&w=majority&appName=MERNBRN"
    );
    console.log("Successfully Connected to MDB");
    // insertDataIntoDB();
  } catch (error) {
    console.log(error);
    console.log("Unable to Connect to MDB");
  }
};
connectToMDB();
