const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fileUpload = require('express-fileupload')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(fileUpload())

mongoose.connect('mongodb+srv://oryxsalvucci:Sparky544@cluster0.pzkwt.mongodb.net/MERNapp?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log("MongoDB databsae connection extablished successfully")
})

app.use(express.static('uploads'))



app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok'})
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate email'})
    }
})

app.post('/api/login', async (req, res) => {
   const user = await User.findOne({
       email: req.body.email,
   })

   const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

   if (isPasswordValid) {
       const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
       )
       return res.json({ status: 'ok', user: token })
   } else {
       return res.json({ status: 'error', user: false })
   }
})

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
		return res.json({ status: 'ok', quote: user.quote })
        
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

// app.get('/api/userquotes', async (req, res) => {
//     res.send(User.find())
//     console.log(User.find)
// })

// async (req, res) => {
//     const userdata = await User.find({})
//     console.log(userdata)
// }

app.get('/api/userquotes', async (req, res) => {
    const userdata = await User.find({})
    res.send(userdata)
})

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded'})
    }
    console.log(req.files)
    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})


app.listen(8000, () => {
    console.log('server started')
})