import { defineConfig } from "astro/config";
import auth from "auth-astro";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
    integrations: [auth(), tailwind(), svelte()],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
});
