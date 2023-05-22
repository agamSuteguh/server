require('dotenv').config()
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

app.use(cors({
origin: ['*'],
credentials: true,
  preflightContinue: true,
}));

app.use(express.json());

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.post("/logins",  async (req, res) => {
  try {
       const { username , password } = req.body;

       const existSiswa = await Siswa.findOne({ username });


    if (!username || !password) {
      return res.json({
        status: "bad",
        msg: "Isi semua baris",
      });
    }



    if (!existSiswa) {
      return res.json({
        status: "bad",
        msg: "Tidak ada akun yang ditemukan untuk nama pengguna yang Anda masukkan!",
      });
    }

    const comparedPass = await bcrypt.compare(password, existSiswa.password);

    if (!comparedPass) {
      return res.json({
        status: "bad",
        msg: "Kata sandi yang dimasukkan salah!",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

   

    const token = await jwt.sign({ Siswa },   "tokenkey");

    res.json({
      status: "ok",
      msg: "Anda berhasil masuk!",
      Siswa:existSiswa,
      password:hashedPass,
      token,

    });
  } catch (error) {
    console.log(error.message);
  }
});


app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/siswa", require("./routes/siswa.js"));
app.use("/api/admin", require("./routes/admin.js"));
app.use("/api/kelas", require("./routes/kelas.js"));
app.use("/api/transaksi", require("./routes/transaksi.js"));
app.use("/api/spp", require("./routes/spp.js"));
