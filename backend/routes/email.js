/* eslint-disable no-undef */
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/send-quote", async (req, res) => {
  const {
    nombre,
    correo,
    telefono,
    comentarios,
    numeroConfirmacion,
    tipoServicio,
    numeroPasajeros,
    tipoViaje,
    origen,
    destino,
    fecha,
    hora,
  } = req.body;

  // Formatear fecha y hora
  let fechaFormateada = fecha;
  let horaFormateada = hora;

  try {
    const fechaHora = new Date(`${fecha}T${hora}`);
    fechaFormateada = fechaHora.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    horaFormateada = fechaHora.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (err) {
    console.warn("⚠️ No se pudo formatear la fecha/hora:", err);
  }

  // Link de Google Maps con origen y destino
  const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origen
  )}&destination=${encodeURIComponent(destino)}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 📩 Correo al usuario - Diseño profesional
  const htmlUsuario = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Solicitud</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; line-height: 1.6;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f7fa; padding: 20px 0;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                    
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #003087 0%, #0070ba 100%); padding: 30px; text-align: center;">
                                <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 500;">HM Mobility</h1>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 20px; font-weight: 500;">Más que un viaje, una experiencia confiable.</p>
                            </td>
                        </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h2 style="margin: 0; color: #2c3e50; font-size: 24px; font-weight: 600;"> Hola ${nombre}</h2>                   
                                <p style="margin: 5px 0 0; color: #7f8c8d; font-size: 16px;">
                                    Tu solicitud fue recibida con éxito.
                                </p>
                                <p style="margin: 10px 0 0; color: #7f8c8d; font-size: 16px;">
                                    En breve, el conductor te escribirá por WhatsApp para compartirte el costo del viaje.
                                </p>                            </div>

                            <!-- Confirmation Number -->
                            <div style="background: linear-gradient(135deg, #007f66 0%, #00b894 100%); border-radius: 10px; padding: 20px; margin-bottom: 30px; text-align: center;">
                                <p style="margin: 0; color: white; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">Número de Confirmación</p>
                                <p style="margin: 5px 0 0; color: white; font-size: 28px; font-weight: bold; letter-spacing: 3px;">${numeroConfirmacion}</p>
                            </div>

                            <!-- Trip Details -->
                            <div style="background-color: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 20px; color: #2c3e50; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">Detalles del Viaje</h3>
                                
                                <table width="100%" style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">SERVICIO:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${tipoServicio}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">TIPO DE VIAJE:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${tipoViaje}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">PASAJEROS:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${numeroPasajeros}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">ORIGEN:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${origen}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">DESTINO:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${destino}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">RUTA:</span>
                                        </td>
                                        <td style="padding: 8px 0;" align="right">
                                            <a href="${mapsLink}" target="_blank" style="color: #2563EB; font-weight: 600; text-decoration: none;">
                                            Ver ruta en Google Maps
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">FECHA:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${fechaFormateada}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">HORA:</span>
                                        </td>
                                        <td style="padding: 8px 0; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${horaFormateada}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            ${
                              comentarios
                                ? `
                            <div style="background-color: #e8f4fd; border-left: 4px solid #3498db; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                                <h4 style="margin: 0 0 10px; color: #2980b9; font-size: 16px; font-weight: 600;">Comentarios Adicionales:</h4>
                                <p style="margin: 0; color: #2c3e50; font-style: italic;">"${comentarios}"</p>
                            </div>
                            `
                                : ""
                            }

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #003087 0%, #0070ba 100%); padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #ecf0f1; font-size: 16px; font-weight: 500;">HM Mobility</p>
                            <p style="margin: 0 0 15px; color: #bdc3c7; font-size: 14px;">Más que un viaje, una experiencia confiable.</p>
                            <div style="border-top: 1px solid #aab7b8; padding-top: 15px;">
                                <p style="margin: 0; color: #bdc3c7; font-size: 12px;">Este es un correo automático, por favor no responder directamente.</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  // Dentro del router.post("/send-quote")
  const telefonoLimpio = telefono.replace(/\D/g, ""); // elimina símbolos
  const linkWhatsapp = `https://wa.me/${telefonoLimpio}?text=Hola%20${encodeURIComponent(
    nombre
  )},%20recibimos%20tu%20solicitud%20de%20viaje.%20Te%20contactamos%20para%20confirmarla.`;

  // 📧 Correo interno - Diseño profesional para notificaciones
  const htmlInterno = `
<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva Solicitud de Cotización</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e1e6eb; line-height: 1.6;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #e1e6eb; padding: 20px 0;">
            <tr>
                <td align="center">
                    <table cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #003087 0%, #0070ba 100%); padding: 30px; text-align: center;">
                                <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">Nueva Solicitud de Cotización</h1>
                                <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 20px; font-weight: 500;">HM Mobility</p>
                            </td>
                        </tr>

                        <!-- Alert Banner -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #ffe066 0%, #ffd54f 100%); padding: 15px 30px; text-align: center;">
                                <p style="margin: 0; color: #856404; font-weight: 600; font-size: 14px;">ACCIÓN REQUERIDA - Contestar al cliente costo del viaje</p>
                            </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                            <td style="padding: 30px;">
                            <!-- Confirmation Number -->
                            <div style="background: linear-gradient(135deg, #007f66 0%, #00b894 100%); border-radius: 10px; padding: 20px; margin-bottom: 30px; text-align: center;">
                                <p style="margin: 0; color: white; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">Número de Confirmación</p>
                                <p style="margin: 5px 0 0; color: white; font-size: 28px; font-weight: bold; letter-spacing: 3px;">${numeroConfirmacion}</p>
                            </div>

                                <!-- Contact Info -->
                                <div style="background-color: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 25px;">
                                    <h3 style="margin: 0 0 20px; color: #2c3e50; font-size: 18px; font-weight: 600;">Datos de Contacto</h3>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                        <div>
                                            <p style="margin: 0 0 5px; color: #6c757d; font-size: 12px; font-weight: 500; text-transform: uppercase;">Nombre</p>
                                            <p style="margin: 0; color: #2c3e50; font-weight: 600;">${nombre}</p>
                                        </div>
                                        <div>
                                            <p style="margin: 0 0 5px; color: #6c757d; font-size: 12px; font-weight: 500; text-transform: uppercase;">Email</p>
                                            <p style="margin: 0; color: #2c3e50; font-weight: 600;">${correo}</p>
                                        </div>
                                        <div>
                                            <p style="margin: 0 0 5px; color: #6c757d; font-size: 12px; font-weight: 500; text-transform: uppercase;">Teléfono</p>
                                            <p style="margin: 0; color: #2c3e50; font-weight: 600;">${telefono}</p>
                                        </div>
                                    </div>
                                </div>

                            <!-- Trip Details -->
                            <div style="background-color: #f8f9fa; border-radius: 10px; padding: 25px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 20px; color: #2c3e50; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">Detalles del Viaje</h3>
                                
                                <table width="100%" style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">SERVICIO:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${tipoServicio}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">TIPO DE VIAJE:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${tipoViaje}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">PASAJEROS:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${numeroPasajeros}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">ORIGEN:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${origen}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">DESTINO:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${destino}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">RUTA:</span>
                                        </td>
                                        <td style="padding: 8px 0;" align="right">
                                            <a href="${mapsLink}" target="_blank" style="color: #2563EB; font-weight: 600; text-decoration: none;">
                                            Ver ruta en Google Maps
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">FECHA:</span>
                                        </td>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${fechaFormateada}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;">
                                            <span style="color: #6c757d; font-size: 14px; font-weight: 500;">HORA:</span>
                                        </td>
                                        <td style="padding: 8px 0; text-align: right;">
                                            <span style="color: #2c3e50; font-weight: 600;">${horaFormateada}</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                                ${
                                  comentarios
                                    ? `
                                <div style="background-color: #e8f4fd; border-left: 4px solid #3498db; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
                                    <h4 style="margin: 0 0 10px; color: #2980b9; font-size: 16px; font-weight: 600;">Comentarios del Cliente:</h4>
                                    <p style="margin: 0; color: #2c3e50; font-style: italic; font-size: 15px; line-height: 1.5;">"${comentarios}"</p>
                                </div>
                                `
                                    : ""
                                }

                                <!-- Action Buttons -->
                                <div style="text-align: center; margin-top: 30px;">
                                    <a href="${linkWhatsapp}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #25d366 0%, #075e54 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 20px; font-weight: 600; font-size: 16px; margin: 0 10px 10px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); transition: all 0.3s ease;">
                                        Responder por WhatsApp
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #003087 0%, #0070ba 100%); padding: 30px; text-align: center;">
                                <p style="margin: 0 0 10px; color: #ecf0f1; font-size: 16px; font-weight: 500;">HM Mobility</p>
                                <p style="margin: 0 0 15px; color: #bdc3c7; font-size: 14px;">Más que un viaje, una experiencia confiable.</p>
                                <div style="border-top: 1px solid #aab7b8; padding-top: 15px;">
                                    <p style="margin: 0; color: #bdc3c7; font-size: 12px;">Notificación automática del sistema</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;

  try {
    // Enviar al usuario
    await transporter.sendMail({
      from: `"HM Mobility" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: `Corfirmación de solicitud - ${numeroConfirmacion}`,
      html: htmlUsuario,
    });

    // Enviar al cliente
    await transporter.sendMail({
      from: `"Sistema HM Mobility" <${process.env.EMAIL_USER}>`,
      to: "hectormartilb@gmail.com",
      subject: `Nueva cotización: ${nombre} - ${numeroConfirmacion}`,
      html: htmlInterno,
    });

    console.log("✅ Correos enviados a usuario y cliente");
    res.status(200).json({ success: true, message: "Correos enviados" });
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar correo" });
  }
});

export default router;
