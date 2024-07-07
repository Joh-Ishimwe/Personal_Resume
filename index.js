const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000; 

// Configure body parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

const emailSender = 'j.ishimwe3@alustudent.com';
const emailPassword = 'Jojoalustudent@1234';

// Function to send email notification
const sendEmail = async (name, email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: emailSender,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: emailSender,
    to: emailSender, // Replace with recipient email if needed
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;

  // You can add form validation here (optional)

  sendEmail(name, email, subject, message)
    .then(() => {
      res.send('Thank you for your message! We will be in touch soon.');
    })
    .catch(() => {
      res.status(500).send('Error sending message. Please try again later.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
