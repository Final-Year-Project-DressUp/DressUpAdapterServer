const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const cors = require('cors');
const {removeBackground}= require('./clippingmagic');
const fileUpload = require('express-fileupload');
// const ip = require('ip');

app.use(cors());
app.use(fileUpload());

app.get('/', (req, res) => {
  // res.send("Hello there \0 ho");
  res.download("./clipped.png");
  // console.log(new Blob());
})
app.post('/', async (req, res) => {
  fs.writeFileSync("./received.png",req.files["clotheImage"].data);
  removeBackground(()=>{
    res.send("Success");
  },()=>{
    res.send("Failure");
  });
})

app.listen(port, () => {
  console.log(`DressUp Adapter Server listening on port ${port}`);
  console.log(`Links:\nFor Local Machine (Your PC): http://localhost:3000/\nFor Other Devices: http://${ip.address()}`);
})