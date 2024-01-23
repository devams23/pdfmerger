import express from "express";
import PDFMerger from "pdf-merger-js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mergerx from "./merger.js";
import multer from "multer";


const __dirname = dirname(fileURLToPath(import.meta.url));
const port  = 3000 ;

const mult = multer();
const upload  = multer({ dest: 'uploads/' });

const app = express();


app.use(express.static("public"))

app.get("/" , (req,res)=>{
    res.sendFile("index.html");
})
app.post("/upload", upload.array('files', 2), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  mergerx(__dirname+ "/"+ req.files[0].path , __dirname+ "/"+ req.files[1].path)
  console.log(req.files[0].path)
  res.redirect("http://localhost:3000/merged.pdf");
});
app.listen(port , ()=>{
    console.log(`server connected to http://localhost:${port}`)
});