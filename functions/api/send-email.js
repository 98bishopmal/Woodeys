export default {
    async fetch(request) {
      if (request.method === "POST") {
        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const message = formData.get("message");
  
        // SMTP2GO API Request
        const smtpRequest = new Request("https://api.smtp2go.com/v3/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: "api-7ADDC3FFF91E4AE8886DCC5BB9DD4276",
            sender: "website@woodeystrees.co.uk",
            to: ["malcolm@thebishops2010.co.uk"],
            subject: `New message from ${name}`,
            text_body: `Name: ${name}\nEmail: ${email}\nphone: ${phone}\nMessage:\n${message}`,
            reply_to: email,
          }),
        });
  
        const smtpResponse = await fetch(smtpRequest);
        return smtpResponse.ok
          ? new Response("Email sent successfully!", { status: 200 })
          : new Response("Failed to send email.", { status: 500 });
      }
  
      return new Response("Invalid request method.", { status: 405 });
    },
  };
  