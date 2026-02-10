import { createFileRoute } from "@tanstack/react-router";
import { RouteComponent } from "@/routes/landing";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});
