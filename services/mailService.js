const nodeMailer = require('nodemailer')
const {errorGanerator} = require('../common/errorHandlar')
const status  = require('http-status')

let trans = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hemangibavasiya08@gmail.com',
        pass: '97@he777AN'
    }
})

const Mail = (mailOptions) => {
    return new Promise(async (resolve, reject) => {
        trans.sendMail(mailOptions, function (err, info) {
            if (err) {
                return reject(errorGanerator(status.BAD_REQUEST, err))
            } else {
                return resolve(info)
            }
        })
    })
}

module.exports = {
    Mail
}