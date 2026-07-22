const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML file
app.use(express.static(__dirname));

// Resume Upload Storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({ storage: storage });


// Registration Route

app.post("/submit-registration", upload.single("resumeFile"), (req, res) => {

    const user = {

        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        mobileNumber: req.body.mobileNumber,
        userType: req.body.userType,
        dob: req.body.dob,
        preferredDomain: req.body.preferredDomain,
        experienceLevel: req.body.experienceLevel,
        githubProfile: req.body.githubProfile,
        linkedinProfile: req.body.linkedinProfile,
        recommendations: req.body.recommendations,
        termsAgreement: req.body.termsAgreement,
        resume: req.file ? req.file.filename : null

    };

    console.log("--------------------------------");
    console.log("New Registration");
    console.log(user);
    console.log("--------------------------------");

    res.send(`
    <h2>Registration Successful</h2>

    <h3>Welcome ${user.fullName}</h3>

    <p>Email : ${user.emailAddress}</p>

    <p>Mobile : ${user.mobileNumber}</p>

    <p>User Type : ${user.userType}</p>

    <p>Date Of Birth : ${user.dob}</p>

    <p>Preferred Domain : ${user.preferredDomain}</p>

    <p>Experience : ${user.experienceLevel}</p>

    <p>Resume Uploaded Successfully.</p>

    <a href="registration.html">
    Back
    </a>

    `);

});


// Start Server

app.listen(3000, () => {

    console.log("Server Running");
    console.log("http://localhost:3000/register.html");

});