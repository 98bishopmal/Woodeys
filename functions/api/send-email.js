export const onRequestPost = async ({ request }) => {
  try {
    // Parse the form data (application/x-www-form-urlencoded)
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    
    // Prepare SMTP2GO API payload
    const smtpPayload = {
      api_key: "api-7ADDC3FFF91E4AE8886DCC5BB9DD4276", // Replace with your SMTP2GO API key
      sender: "malcolm@thebishops2010.co.uk", // Replace with your verified sender email
      to: ["malcolm@m1c.co.uk"], // Replace with recipient email(s)
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
