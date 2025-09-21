import { exportToTxt, exportToPdf, exportToDocx } from "../utils/exportUtils.js";
import Content from "../models/Content.js";

export const exportContent = async (req, res) => {
  try {
    const { id, format } = req.params;
    const content = await Content.findById(id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    let file;

    if (format === "txt") {
      file = await exportToTxt(content.output, `exports/${id}.txt`);
    } else if (format === "pdf") {
      file = await exportToPdf(content.output, `exports/${id}.pdf`);
    } else if (format === "docx") {
      file = await exportToDocx(content.output, `exports/${id}.docx`);
    } else {
      return res.status(400).json({ message: "Invalid format" });
    }

    res.download(file);
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ message: "Error exporting file" });
  }
};