import nodemailer, { TransportOptions } from "nodemailer";

import { mailConfig } from "../configs/config";

export default {
  send: (data: { to: string; subject: string; html: string }) => {
    try {
      let transporter = nodemailer.createTransport({
        host: mailConfig.config.host,
        port: mailConfig.config.port,
        auth: {
          user: mailConfig.config.auth.user,
          pass: mailConfig.config.auth.pass,
        },
      } as TransportOptions);
      transporter.sendMail({
        from: mailConfig.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
      });

      return { success: true };
    } catch (err) {
      return { success: false, message: err };
    }
  },
};
