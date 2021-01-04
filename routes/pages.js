const express = require("express");
const router = express.Router();
const {
  registration
} = require('../services/registration')
const {
  login
} = require('../services/login')
const status = require('http-status')
const comCon = require('../constants/comCon')
const {
  sendMail
} = require('../services/forgotPass')
const {
  changePassword
} = require('../services/resetPassword')
const alt = require('alert')


//get index page
router.get("/", (req, res, next) => {
  res.render("index", {
    title: "My Home Page"
  });
});

//get home page
router.get("/home", (req, res, next) => {
  res.send("This is home page");
});

//post login data
router.post("/login", async (req, res, next) => {
  try {
    const response = await login(req.body)
    res.setHeader(comCon.FIELD_AUTH_TOKEN, response.token)
    res.setHeader(comCon.FIELD_USER_CODE, response[comCon.FIELD_USER_CODE])
    res.status(status.OK).send(comCon.MSG_LOGGEDIN)
  } catch (error) {
    if (error.status) res.status(error.status).send({
      "error_message": error.message
    })
    res.status(status.INTERNAL_SERVER_ERROR).send({
      "error_message": error
    })
  }
});

//post register data
router.post("/register", async (req, res, next) => {
  try {
    const body = req.body
    if(body['password'] !== body['confirm-password']) {
      alt('password and confirm-password must be same')
      res.redirect('/register')
    }
    delete body ['confirm-password'];
    const response = await registration(body)
    res.status(status.OK).send(response)
  } catch (error) {
    if (error.status) res.status(error.status).send({
      "error_message": error.message
    })
    res.status(status.INTERNAL_SERVER_ERROR).send({
      "error_message": error
    })
  }
});

router.get("/register", (req, res, next) => {
  res.render("reg", {
    title: "Registration"
  });

})

router.get('/forgot', (req, res, next) => {
  res.render("forgot", {
    title: "Forgot Password"
  })
})

router.post('/forgot', async (req, res, next) => {
  try {
    const response = await sendMail(req.body)
    res.status(status.OK).send({"message": "Check your mailbox"})
  } catch (err) {
    if (err.status) res.status(err.status).send({
      "error_message": err.message
    })
    res.status(status.INTERNAL_SERVER_ERROR).send({
      "error_message": err
    })
  }
})

router.get('/reset', (req, res, next) => {
  res.render("reset", {
    title: "Reset Password"
  })
})

router.post('/reset', async (req, res, next) => {
  try {
    const body = req.body
    if(body['password'] !== body['confirm-password']) {
      alt('password and confirm-password must be same')
      res.redirect('/register')
    }
    delete body ['confirm-password'];
    const response = await changePassword(body)
    res.status(status.OK).send({
      "message": "Success! Your Password has been changed"
    })
  } catch (err) {
    if (err.status) res.status(err.status).send({
      "error_message": err.message
    })
    res.status(status.INTERNAL_SERVER_ERROR).send({
      "error_message": err
    })
  }
  // res.json({"message": "Success! Your Password has been changed"})
})

module.exports = router;