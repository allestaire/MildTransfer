import Nodemailer from 'nodemailer'

/**
 * @var string to
 * @var string from 
 * @var string subject
 * @var string html In html format
 * @var string plain html's plain format
 */
const send = async (to, from, subject, html, plain = '') => {
  const transferer = Nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false
  })
  transferer.sendMail({
    from,
    to,
    subject,
    text: plain,
    html
  }, (err, info) => {
    if (err) {
      throw new Error(err)
    }
    console.log(info)
  })
}



export default {
  send
}
