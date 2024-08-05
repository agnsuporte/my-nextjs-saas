"use server";

import { prisma } from "@/lib/db";
import { findUserbyEmail } from "@/services";
import { findVerificationTokenbyToken } from "@/services/auth";
import type { User } from "@prisma/client";
import nodemailer from "nodemailer";

/**
 * This method uses Nodemailer to send an email to the user to verify
 * the ownership of the email by the user.
 *
 * @param {User} user - The user to send the verification email to.
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string, success?: string }>} An object indicating the result of the operation.
 */
export default async function sendVerificationEmail(user: User, token: string) {
  const {
    GOOGLE_PASSWORD_APP,
    GOOGLE_EMAIL_FROM,
    VERIFICATION_SUBJECT,
    NEXT_PUBLIC_URL,
    VERIFICATION_URL,
  } = process.env;
  const verificationUrl = `${NEXT_PUBLIC_URL}${VERIFICATION_URL}?token=${token}`;
  const { email } = user;

  // Configurar o transporte do Nodemailer com o SMTP do Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agnsuporte@gmail.com",
      pass: GOOGLE_PASSWORD_APP, // Use uma senha de aplicativo
    },
  });

  const mailOptions = {
    from: GOOGLE_EMAIL_FROM,
    to: email,
    subject: VERIFICATION_SUBJECT,
    html: `<p>Clique <a href="${verificationUrl}">aqui</a> para confirmar seu e-mail.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: "E-mail enviado com sucesso",
    };
    //res.status(200).json({ success: true, message: 'E-mail enviado com sucesso' });
  } catch (error) {
    return {
      success: "",
      error,
    };
    //res.status(500).json({ success: false, message: 'Erro ao enviar e-mail', error: error.message });
  }
}

/**
 * This method updates the user's record with the date the email was verified.
 *
 * @param {string} token - The verification token.
 * @returns {Promise<{ error?: string, success?: string }>} An object indicating the result of the operation.
 */
export const verifyToken = async (token: string) => {
  const existingToken = await findVerificationTokenbyToken(token);
  if (!existingToken) {
    return {
      error: "Código de verificação não encontrado",
    };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();
  if (isTokenExpired) {
    return {
      error: "Código de verificação expirado",
    };
  }

  const user = await findUserbyEmail(existingToken.email);
  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      success: "E-mail verificado",
    };
  } catch (err) {
    return { error: "Erro ao atualizar verificação de e-mail" };
  }
};
