import sendMail from "../config/nodemaler.js";

const sendMailToRegister = (userMail, token) => {
    return sendMail(
        userMail,
        "Bienvenido a greenHOUSE ☘",
        `
            <h1>Confirma tu cuenta</h1>
            <p>Hola, haz clic en el siguiente enlace para confirmar tu cuenta:</p>
            <a href="${process.env.URL_FRONTEND}confirmar/${token}">
                Confirmar cuenta
            </a>
            <hr>
            <footer>El equipo de greenHOUSE ☘ te da la más cordial bienvenida.</footer>
        `
    )
}
const sendMailToRecoveryPassword = (userMail, token) => {

    return sendMail(
        userMail,
        "Recupera tu contraseña",
        `
            <h1>greenHOUSE ☘</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <a href="${process.env.URL_FRONTEND}recuperarpassword/${token}">
            Clic para restablecer tu contraseña
            </a>
            <hr>
            <footer>El equipo de greenHOUSE ☘ te da la más cordial bienvenida.</footer>
        `
        )
}
const sendMailToOwner = (userMail, passwordPropietario) => {
    return sendMail(
        userMail,
        "Bienvenido a greenHOUSE ☘",
        `
            <h1>Estas son tus credenciales</h1>
            <p>Hola, aquí están tus credenciales:</p>
            <p>Usuario: ${userMail}</p>
            <p>Contraseña: ${passwordPropietario}</p>
            <hr>
            <footer>El equipo de greenHOUSE ☘ te da la más cordial bienvenida.</footer>
        `
    )
}
export {
    sendMailToRegister,
    sendMailToRecoveryPassword,
    sendMailToOwner
}