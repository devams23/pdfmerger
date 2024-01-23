import PDFMerger from 'pdf-merger-js';
import fs, { unlink } from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
var filePath = __dirname + "/public/merged.pdf"; 


var merger = new PDFMerger();

const mergerx = async(p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2
  console.log(filePath)
  unlink(filePath);
  // Set metadata
  await merger.setMetadata({
    producer: "pdf-merger-js based script",
    author: "John Doe",
    creator: "John Doe",
    title: "Your Pdf"
  });

  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
 
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
};


export default mergerx;
