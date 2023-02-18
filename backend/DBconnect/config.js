const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// DATABASE -> collections -> document

 const connectDB = async () => {
    mongoose
        .connect('mongodb+srv://hamidlive6:N1vU4icvRdnK73kK@cluster0.dniojus.mongodb.net/Cluster0?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected Successfully'))
        .catch((err) => console.error(err));
}

  module.exports = connectDB;
