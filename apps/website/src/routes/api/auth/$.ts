import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/auth";

// Catch-all route that forwards all auth requests to better-auth
const handler = async ({ request }: { request: Request }) => {
	return auth.handler(request);
};

export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			GET: handler,
			POST: handler,
		},
	},
});
