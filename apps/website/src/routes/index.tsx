import { createFileRoute, redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/auth";
import { RouteComponent } from "@/routes/home";

// Redirect authenticated users to the account page,
// otherwise show the overview page
const routeMiddleware = createMiddleware().server(async ({ next }) => {
	const session = await auth.api.getSession({
		headers: getRequestHeaders(),
	});

	if (session) {
		throw redirect({ to: "/overview" });
	}

	return await next();
});

export const Route = createFileRoute("/")({
	server: {
		middleware: [routeMiddleware],
	},
	component: RouteComponent,
});
