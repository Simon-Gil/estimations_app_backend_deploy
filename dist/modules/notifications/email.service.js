"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    /**
     * Crea una nueva instancia del servicio de correo electrónico utilizando nodemailer.
     */
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMPT_PASSWORD,
            },
        });
    }
    /**
     * Envía un correo electrónico utilizando la configuración de transporte SMTP.
     *
     * @param to - La dirección de correo electrónico del destinatario.
     * @param subject - El asunto del correo.
     * @param text - El cuerpo del correo en texto plano.
     * @param html - El cuerpo del correo en formato HTML (opcional).
     *
     * @returns Una promesa que se resuelve cuando el correo ha sido enviado correctamente.
     */
    async sendEmail(to, subject, text, html) {
        const mailOptions = {
            from: process.env.SMPT_FROM,
            to,
            subject,
            text,
            html,
        };
        return await this.transporter.sendMail(mailOptions);
    }
    /**
    * Envía un correo notificando que una estimación ha sido completada y por lo tanto su
    * propuesta asociada queda pendiente de revisión.
    *
    * @param userEmail - El correo electrónico del usuario que recibirá la notificación.
    * @param proposal - El objeto `ProposalEntity` que contiene detalles sobre la propuesta.
    * @param name - Nombre del usuario que está siendo notificado.
    * @param lastname - Apellido del usuario que está siendo notificado.
    */
    async sendDoneEstimationEmail(userEmail, proposal, name, lastname) {
        const subject = 'Propuesta pendiente de revisión';
        const message = `
            Hola ${name},
    
            La estimación correspondiente a '${proposal.techProposal}' ha sido finalizada. Puede revisarla en el siguiente enlace:
            
            ${process.env.FRONTEND_URL}/dashboard/proposals/workspace/${proposal.id}

            Saludos!
        `;
        const htmlMessage = `
        <p>Hola <strong>${name}</strong>,</p>
        <p>La estimación correspondiente a '<strong>${proposal.techProposal}</strong>' ha sido finalizada. Puede revisarla en el siguiente enlace:</p>
        <p>
            <a href="${process.env.FRONTEND_URL}/dashboard/proposals/workspace/${proposal.id}" 
               style="color: #007bff; text-decoration: underline;">
                Ir a estimación
            </a>
        </p>
        <p>Saludos!</p>
        `;
        await this.sendEmail(userEmail, subject, message, htmlMessage);
    }
    /**
    * Envía un correo de bienvenida a un nuevo usuario con la contraseña generada y el enlace para restablecerla.
    *
    * @param userEmail - El correo electrónico del nuevo usuario.
    * @param userName - El nombre del nuevo usuario.
    * @param password - La contraseña generada para el usuario.
    * @param resetToken - El token para restablecer la contraseña.
    * @param expHrs - Número de horas durante las cuales el enlace de restablecimiento será válido.
    */
    async sendNewUserEmail(userEmail, userName, password, resetToken, expHrs) {
        const subject = '¡Bienvenid@ a la aplicación de estimación de presupuestos!';
        const message = `
            Hola ${userName},
    
            Gracias por unirte a la aplicación de estimación de presupuestos.

            Podrás acceder con tu email y la siguiente contraseña generada: ${password}

            La contraseña puede ser modificada accediendo al siguiente enlace durante las próximas ${expHrs} horas:

            ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}
    
            ¡Esperamos que te resulte útil y que te ayude a alcanzar tus objetivos con facilidad!
    
            Saludos
        `;
        const htmlMessage = `
        <p>Hola <strong>${userName}</strong>,</p>
        <p>Gracias por unirte a la aplicación de estimación de presupuestos.</p>
        <p>Podrás acceder con tu email y la siguiente contraseña generada: <strong>${password}</strong></p>
        <p>
            La contraseña puede ser modificada accediendo al siguiente enlace durante las próximas <strong>${expHrs}</strong> horas:
        </p>
        <p>
            <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" style="color: blue; text-decoration: underline;">
                Restablecer contraseña
            </a>
        </p>
        <p>¡Esperamos que te resulte útil y que te ayude a alcanzar tus objetivos con facilidad!</p>
        <p>Saludos</p>
    `;
        await this.sendEmail(userEmail, subject, message, htmlMessage);
    }
    /**
     * Envía un correo con el enlace para recuperar la contraseña de un usuario.
     *
     * @param user - El objeto `UserEntity` que contiene información sobre el usuario.
     * @param token - El token único para el restablecimiento de contraseña.
     * @param expHrs - El número de horas durante las cuales el enlace será válido.
     */
    async sendRequestPasswordEmail(user, token, expHrs) {
        const subject = 'Recuperación de contraseña';
        const message = `
        Hola ${user.name},

        Para realizar el cambio de contraseña, por favor acceda al siguiente enlace:

        ${process.env.FRONTEND_URL}/reset-password?token=${token}

        El enlace será válido durante las siguientes ${expHrs} horas.
       
        Saludos!
    `;
        const htmlMessage = `
    <p>Hola <strong>${user.name}</strong>,</p>
    <p>Para realizar el cambio de contraseña, por favor haga clic en el siguiente enlace:</p>
    <p>
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}" 
           style="color: #007bff; text-decoration: underline;">
            Restablecer contraseña
        </a>
    </p>
    <p>El enlace será válido durante las siguientes <strong>${expHrs}</strong> horas.</p>
    <p>Saludos!</p>
    `;
        await this.sendEmail(user.email, subject, message, htmlMessage);
    }
    /**
     * Envía un correo notificando que un usuario ha sido asignado a una tarea de estimación.
     *
     * @param userEmail - El correo electrónico del usuario asignado.
     * @param proposal - El objeto `ProposalEntity` que contiene detalles sobre la propuesta.
     * @param name - Nombre del usuario asignado.
     * @param lastname - Apellido del usuario asignado.
     */
    async sendAssignedToEstimationEmail(userEmail, proposal, name, lastname) {
        const subject = 'Asignación a tarea de estimación';
        const message = `
            Hola ${name},
    
            Se te ha asignado a una tarea de estimación, puedes acceder a ella a través del siguiente enlace:

            ${process.env.FRONTEND_URL}/dashboard/proposals/workspace/${proposal.id}
           
            Saludos!
        `;
        const htmlMessage = `
    <p>Hola <strong>${name}</strong>,</p>
    <p>Se te ha asignado a una tarea de estimación. Puedes acceder a ella a través del siguiente enlace:</p>
    <p>
        <a href="${process.env.FRONTEND_URL}/dashboard/proposals/workspace/${proposal.id}" 
           style="color: #007bff; text-decoration: underline;">
            Ir a estimación
        </a>
    </p>
    <p>Saludos!</p>
    `;
        await this.sendEmail(userEmail, subject, message, htmlMessage);
    }
    /**
    * Envía un correo notificando a un supervisor que un usuario ha completado su estimación.
    *
    * @param techManEmail - El correo electrónico del supervisor.
    * @param techManName - Nombre del supervisor.
    * @param userName - Nombre del usuario que ha finalizado la estimación.
    * @param proposal - El objeto `ProposalEntity` que contiene detalles sobre la propuesta.
    */
    async sendUserFinishedEstimation(techManEmail, techManName, userName, proposal) {
        const subject = `${userName} le notifica que ha finalizado la estimación`;
        const message = `
            Hola ${techManName},
    
            ${userName} le informa de que ha completado sus tareas de estimación para la propuesta: ${proposal.techProposal}.

            Puede acceder a la estimación a través del siguiente enlace:

            ${process.env.FRONTEND_URL}/dashboard/proposals/workspace/${proposal.id}
           
            Saludos!
        `;
        const htmlMessage = `
    <p>Hola <strong>${techManName}</strong>,</p>
    <p><strong>${userName}</strong> le informa de que ha completado sus tareas de estimación para la propuesta: <strong>${proposal.techProposal}</strong>.</p>
    <p>Puede acceder a la estimación a través del siguiente enlace:</p>
    <p>
        <a href="${process.env.FRONTEND_URL}/dashboard/proposals/workspace/${proposal.id}" 
           style="color: #007bff; text-decoration: underline;">
            Ir a estimación
        </a>
    </p>
    <p>Saludos!</p>
    `;
        await this.sendEmail(techManEmail, subject, message, htmlMessage);
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
