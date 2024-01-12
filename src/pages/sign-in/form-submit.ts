import type { APIRoute } from "astro";

// NB: Demo only, not to be used in production!
// Based on the entered email address, redirect to the appropriate page
export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");

  let redirectUrl;

  if (email === "new@lopenling.org") {
    redirectUrl = "/sign-in/new-account";
  } else if (email === "password@lopenling.org") {
    redirectUrl = "/sign-in/enter-password";
  } else {
    redirectUrl = "/sign-in/check-inbox-sign-in";
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  });
};
