import type { APIRoute } from "astro";

const siteUrl = import.meta.env.PUBLIC_SITE_URL;

export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  try {
    let data = await request.formData();
    const formDataJson: Record<string, any> = {};
    data.forEach((valor, clave) => {
      formDataJson[clave] = valor;
    });

    let response = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(formDataJson),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Cookie: `${request.headers.get("cookie")}`,
      },
    });

    if (response.status == 200) {
      return new Response("Logged in", {
        status: 200,
        headers: {
          "Set-Cookie": `${response.headers.get("set-cookie")}`,
          "HX-Redirect": `/home`,
        },
      });
    } else {
      return new Response("Failed to login", { status: response.status });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};
