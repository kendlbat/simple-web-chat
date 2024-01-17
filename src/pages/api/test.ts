import type { APIRoute } from "astro";

export const GET: APIRoute = async (ctx): Promise<Response> => {
    return new Response("Hello, world!", {
        headers: { "content-type": "text/plain" },
    });
};
