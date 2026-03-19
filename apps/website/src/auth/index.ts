import { passkey } from "@better-auth/passkey";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { magicLink, organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { database } from "@/db";
import { authSchema } from "@/db/schema";
import { resend } from "@/email";
import { env } from "@/env";

export const auth = betterAuth({
	appName: "Xena Stats",
	baseURL: env.VITE_APP_URL,
	secret: env.AUTH_SECRET,
	database: drizzleAdapter(database, {
		provider: "pg",
		schema: authSchema,
	}),
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			await resend.emails.send({
				to: user.email,
				template: {
					id: "stats-email-verification",
					variables: {
						VERIFICATION_URL: url,
					},
				},
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
	},
	plugins: [
		passkey({
			advanced: {
				webAuthnChallengeCookie: "passkey-challenge",
			},
		}),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				await resend.emails.send({
					to: email,
					template: {
						id: "stats-magic-link",
						variables: {
							SIGN_IN_URL: url,
						},
					},
				});
			},
		}),
		organization(),
		tanstackStartCookies(),
	],
	user: {
		changeEmail: {
			enabled: true,
			sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
				await resend.emails.send({
					to: user.email,
					template: {
						id: "stats-change-email-confirmation",
						variables: {
							NEW_EMAIL: newEmail,
							CONFIRMATION_URL: url,
						},
					},
				});
			},
		},
		deleteUser: {
			enabled: true,
			sendDeleteAccountVerification: async ({ user, url }) => {
				await resend.emails.send({
					to: user.email,
					template: {
						id: "stats-delete-account-verification",
						variables: {
							DELETE_ACCOUNT_URL: url,
						},
					},
				});
			},
		},
	},
	account: {
		encryptOAuthTokens: true,
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"],
			allowDifferentEmails: true,
			allowUnlinkingAll: true,
		},
	},
	advanced: {
		cookiePrefix: "auth",
	},
});
