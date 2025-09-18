// utils/exportUtils.js
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";
import fs from "fs";
import path from "path";

//  PDF Export
export const exportToPdf = (text, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);
      doc.fontSize(12).text(text, { align: "left" });
      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

//  DOCX Export
export const exportToDocx = async (text, filePath) => {
  const doc = new Document({
    sections: [
      {
        children: [new Paragraph({ children: [new TextRun(text)] })],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

//  TXT Export
export const exportToTxt = (text, filePath) => {
  fs.writeFileSync(filePath, text, "utf-8");
  return filePath;
};
