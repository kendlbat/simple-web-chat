import GitHub from "@auth/core/providers/github";
import AzureAD from "@auth/core/providers/azure-ad";
import { defineConfig } from "auth-astro";
import dba from "./dbadapter.config.mjs";

export default defineConfig({
    adapter: dba,
    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        }),
        AzureAD({
            clientId: import.meta.env.AZURE_AD_CLIENT_ID,
            clientSecret: import.meta.env.AZURE_AD_CLIENT_SECRET,
            tenantId: import.meta.env.AZURE_AD_TENANT_ID,
        }),
    ],
    secret: import.meta.env.AUTHJS_SECRET,
});
