const mongoose = require("mongoose");

const db = process.env.MONGODB_SECRET;

mongoose
    .connect('mongodb+srv://ivy555:255075100@cluster0.xaofset.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Could not connect to database", error);
    });

mongoose.set("useCreateIndex", true);
