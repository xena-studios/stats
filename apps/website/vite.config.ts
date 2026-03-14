import { fileURLToPath, URL } from "node:url";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { reflectPolyfillPlugin } from "./src/lib/reflect-polyfills";

const config = defineConfig({
	plugins: [
		devtools(),
		nitro(),
		tailwindcss(),
		tanstackStart(),
		react(),
		babel({
			presets: [reactCompilerPreset()],
		} as Parameters<typeof babel>[0]),
		reflectPolyfillPlugin(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 3000,
	},
	ssr: {
		noExternal: ["tslib", /^@radix-ui\//, "radix-ui"],
	},
});

export default config;
