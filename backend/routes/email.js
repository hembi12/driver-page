/* eslint-disable no-undef */
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/send-quote", async (req, res) => {
  const { nombre, correo, telefono, comentarios } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <h2>Gracias por tu solicitud, ${nombre}</h2>
    <p>Hemos recibido los siguientes datos:</p>
    <ul>
      <li><strong>Correo:</strong> ${correo}</li>
      <li><strong>Teléfono:</strong> ${telefono}</li>
      <li><strong>Comentarios:</strong> ${comentarios || "Ninguno"}</li>
    </ul>
    <p>Nos pondremos en contacto contigo pronto.</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Cotizaciones Driver" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Confirmación de tu solicitud",
      html: htmlContent,
    });

    res.status(200).json({ success: true, message: "Correo enviado" });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar correo" });
  }
});

export default router;