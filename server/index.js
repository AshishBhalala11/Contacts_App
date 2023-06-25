const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ContactsRoute = require('./src/routes/contactsRoutes')

const app = express();
const PORT = process.env.PORT || 8800;

//miidleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());

app.use('/api', ContactsRoute);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});