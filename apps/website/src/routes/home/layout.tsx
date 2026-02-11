import { createFileRoute, Outlet } from "@tanstack/react-router";

import "./globals.css";

export const Route = createFileRoute("/home/layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="dark landing-theme min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased">
			<Outlet />
		</div>
	);
}
