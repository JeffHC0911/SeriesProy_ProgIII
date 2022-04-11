const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/*Función para enviar correos electrónicos */
function sendEmailConfirmation(customerName, orderNroSerie) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <img src="https://i.linio.com/cms/6bb6248e-b5e6-11ec-8f33-b26d33f7f0d7.webp" alt="">
  </body>
  </html>`
}

function getMessage(emailParams) {
  /*Establecemos los parámetros establecidos para el envío del corre */
  return {
    to: emailParams.toEmail,
    /*El from lleva el correo con el cual se registró el user en sendgrid */
    from: 'jeffhc911@gmail.com',
    subject: 'Confirmación pedido de Serie y NombreSerie ',
    text: `Cordial saludo ${emailParams.customerName}, te confirmamos la recepción de tu pedido y se ha generado una factura con orden de compra ${emailParams.orderNroSerie}.
    Agradecemos tu compra.`,
    html: sendEmailConfirmation(
      emailParams.customerName,
      emailParams.orderNroSerie
    ),
  }
}

async function sendOrderSerie(emailParams) {
  try {
    await sgMail.send(getMessage(emailParams))
    return { message: 'Confirmación de pedido recibido ha sido enviada ' }
  } catch (error) {
    const message = 'No se pudo enviar la orden de compra al cliente'
    console.error(message);
    console.error(error);
    if (error.response) console.error(error.response.body)
    return { message }
  }
}

// async()=>{
//   console.log('Se ha enviado el correo elctrónico')
//   await sendOrderSerie()
// }

module.exports = { sendOrderSerie }
