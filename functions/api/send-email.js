export const onRequestPost = async ({ request, env }) => {
  try {
    // Parse form data
    const formData = await request.formData();
    const turnstileToken = formData.get("cf-turnstile-response");
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Access hidden API key from environment variables
    const apiKey = env.SMTP2GO_API_KEY;
    const sender = env.SENDER;
    const sendto = env.SENDTO;
    // Validate Turnstile token
    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY, // Use your secret key from Cloudflare
        response: turnstileToken,
      }),
    });

    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ success: false, message: "Turnstile validation failed." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    
    // Proceed with email logic if Turnstile validation succeeds
    // Prepare SMTP2GO API payload
    const smtpPayload = {
      api_key: apiKey,
      sender: sender,
      to: [sendto],
      subject: `New message from ${name}`,
      text_body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
      reply_to: email,
    };

    // Send email via SMTP2GO API
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smtpPayload),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      const errorData = await response.json();
      console.error("SMTP2GO Error:", errorData);
      return new Response(JSON.stringify({ success: false, message: "Failed to send email." }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error handling form submission:", error);
    return new Response(JSON.stringify({ success: false, message: "An error occurred." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};
