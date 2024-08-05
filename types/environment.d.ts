declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_URL: string;
      VERIFICATION_URL: string;
      GOOGLE_PASSWORD_APP: string;
      GOOGLE_EMAIL_USER: string;
      VERIFICATION_SUBJECT: string;
      AUTH_LOGIN_REDIRECT: string;
      OTP_SUBJECT: string;
      RESET_PASSWORD_URL: string;
      RESET_PASSWORD_SUBJECT: string;
    }
  }
}
export type {};
