import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	const router = createRouter({
		routeTree,

		// Configuration Options
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		scrollRestoration: true,
	});

	return router;
};
