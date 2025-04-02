export const onRequestPost = async ({ request, env }) => {
  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Access hidden API key from environment variables
    const apiKey = env.SMTP2GO_API_KEY;
    const sender = env.SENDER;
    const sendto = env.SENDTO;

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
