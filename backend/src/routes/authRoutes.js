// In routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Bring in your User model
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    "/register",
    [
        // This is the validation part using express-validator
        check("name", "Please add a name").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        // 1. Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are errors, send a 400 (Bad Request) response
            return res.status(400).json({ errors: errors.array() });
        }

        // 2. Get user data from the request body
        const { name, email, password } = req.body;

        try {
            // 3. Check if the user (email) already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }

            // 4. If user doesn't exist, create a new User instance
            // (Note: the password hashing will happen automatically
            // because of the "pre-save hook" you built in User.js)
            user = new User({
                name,
                email,
                password,
            });

            // 5. Save the new user to the database
            await user.save();

            // 6. Create the JSON Web Token (JWT)
            const payload = {
                user: {
                    id: user.id, // This is the new user's ID from the database
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET, // You need to create this secret key
                {
                    expiresIn: "5h", // Token expires in 5 hours
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token }); // Send the token back to the user
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);



// @route   POST api/auth/login
// @desc    Authenticate user & get token (Login)
// @access  Public
router.post(
    "/login",
    [
        // 1. Validation: Check that email and password exist
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // 2. Get data from request body
        const { email, password } = req.body;

        try {
            // 3. Find the user by their email
            // we set 'select: false'. This is the only time we need to
            // manually grab the password.
            let user = await User.findOne({ email }).select("+password");

            // 4. If no user is found with that email, it's an error
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            // 5. THE CRITICAL STEP: Check if the password matches
            // We use bcrypt.compare to check the plain-text password
            // from the user against the hashed password in the database.
            const isMatch = await bcrypt.compare(password, user.password);

            // 6. If the passwords do NOT match, it's an error
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            // 7. If user exists AND password matches, create a JWT
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "5h",
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token }); // Send the token!
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // req.user.id comes from the middleware
    // We use .select('-password') to EXCLUDE the password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;