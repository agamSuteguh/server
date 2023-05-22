require('dotenv').config()
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

app.use(cors('*'));

app.use(express.json());

const mongooseOptions = {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
};

mongoose.connect(process.env.DB_URI, mongooseOptions)
.then(() => {
console.log("Connected to database");
})
.catch((err) => {
console.log(err);
});

app.get("/", (req, res) => {
res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/siswa", require("./routes/siswa.js"));
app.use("/api/admin", require("./routes/admin.js"));
app.use("/api/kelas", require("./routes/kelas.js"));
app.use("/api/transaksi", require("./routes/transaksi.js"));
app.use("/api/spp", require("./routes/spp.js"));
