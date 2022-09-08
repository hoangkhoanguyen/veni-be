const nodemailer = require("nodemailer");

const sendSimpleEmail = async (data, arr) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"Khoa" <anhhaido28@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: data.email == 'vi' ? "Thông tin đặt lịch khám bệnh" : "Booking appointment information", // Subject line
        html: buildHTMLBodyEmail(data, arr)

    });

}

const sendMessageToAdmin = async ({content, email, name}) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"Khoa" <anhhaido28@gmail.com>', // sender address
        to: process.env.EMAIL_APP, // list of receivers
        subject: "Feedback from visitor", // Subject line
        html: `
        <h3>Dear Admin!</h3>
        <p>There is a message from a customer named ${name}:</p>
        <p>${content}</p>
        <p>Email of Customer is: ${email}</p>
        `

    });
}

const sendAttachment = async (data) => {
    // console.log(email)
    // return
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });
    let info = await transporter.sendMail({
        from: '"Khoa" <anhhaido28@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: data.language == 'vi' ? "Thông tin đặt lịch khám bệnh" : "Booking appointment information", // Subject line
        html: getBodyHTMLEmailSendAttachment(data),
        attachments: [
            {
                filename: 'Result',
                content: data.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    });

}

const buildHTMLBodyEmail = (input, arr) => {

        let productListString = arr.map(item=>{
            return `<li style="text-transform: capitalize;">${item.name}</li>`
        })
    
        let result = `
        <h3>Dear ${input.firstName}!</h3>
        <p>You receive this email because you ordered goods from our store.</p>
        <p>These are list of products you ordered:</p>
        <ul>
            ${productListString.join('')}
        </ul>
        <p>Total Price: $${input.totalPrice}</p>
        <p>Your goods will be shipped to your place soon.</p>
        <div>Thank you</div>
        `
    
    return result
}

const getBodyHTMLEmailSendAttachment = (input) => {
    let result = ''
    if (input.language == 'vi') {
        result = `
        <h3>Xin chào ${input.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên web của chúng tôi.</p>
        <p>Thông tin đơn thuốc, hóa đơn được gửi trong file đính kèm</p>

        <div>Xin chân thành cảm ơn</div>
        `
    } else {
        result = `
        <h3>Dear ${input.patientName}!</h3>
        <p>You receive this email because you booked an online medical appointment.</p>
        <p>Information about prescription, bill is in the attached file</p>

        <div>Thank you</div>
        `
    }
    return result
}

module.exports = {
    sendSimpleEmail, sendAttachment,
    sendMessageToAdmin
}