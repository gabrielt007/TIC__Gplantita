import sendMail from "../config/nodemaler.js";

const sendMailToRegister = (userMail, token) => {
    return sendMail(
        userMail,
        "Bienvenido a backend",
        `
            <h1>Confirma tu cuenta</h1>
            <p>Hola, haz clic en el siguiente enlace para confirmar tu cuenta:</p>
            <a href="${process.env.URL_FRONTEND}confirmar/${token}">
                Confirmar cuenta
            </a>
            <hr>
            <footer>El equipo de SMARTVET te da la más cordial bienvenida.</footer>
        `
    )
}
const sendMailToRecoveryPassword = (userMail, token) => {

    return sendMail(
        userMail,
        "Recupera tu contraseña",
        `
            <h1>BackWeb ☘</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <a href="${process.env.URL_BACKEND}recuperarpassword/${token}">
            Clic para restablecer tu contraseña
            </a>
            <hr>
            <footer>El equipo de webback te da la más cordial bienvenida.</footer>
        `
        )
}
export {
    sendMailToRegister,
    sendMailToRecoveryPassword
}