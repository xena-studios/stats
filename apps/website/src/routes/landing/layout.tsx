import { createFileRoute, Outlet } from "@tanstack/react-router";

import "./globals.css";

export const Route = createFileRoute("/landing/layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="dark font-sans antialiased">
			<Outlet />
		</div>
	)
}
