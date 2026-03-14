import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/auth";

async function getSession() {
	const headers = getRequestHeaders();
	return auth.api.getSession({ headers });
}

/**
 * Redirects unauthenticated users to the sign-in page.
 */
export const authRequiredMiddleware = createMiddleware().server(
	async ({ next }) => {
		const session = await getSession();
		if (!session) {
			throw redirect({ to: "/sign-in" });
		}

		return await next();
	}
);

/**
 * Redirects authenticated users to the root page.
 */
export const noAuthRequiredMiddleware = createMiddleware().server(
	async ({ next }) => {
		const session = await getSession();
		if (session) {
			throw redirect({ to: "/" });
		}

		return await next();
	}
);
