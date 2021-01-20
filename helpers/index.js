const nodeMailer = require("nodemailer");
 
const defaultEmailData = { from: "noreply@node-react.com" };
 
exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        // requireTLS: true,
        service:'gmail',
        auth: {
            user: "viswanathank1499@gmail.com",
            pass: "kxepefkbxsrnlylk"
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};