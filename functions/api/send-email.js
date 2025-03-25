export const onRequestPost = async ({ request }) => {
  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    console.log("Parsed Form Data:", { name, email, phone, message });

    // Prepare SMTP2GO payload
    const smtpPayload = {
      api_key: "api-7ADDC3FFF91E4AE8886DCC5BB9DD4276", // Replace with valid API key
      sender: "malcolm@thebishops2010.co.uk", // Verified sender email
      to: ["malcolm@m1c.co.uk"], // Recipient emails
      subject: `New message from ${name}`,
      text_body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
      reply_to: email,
    };

    console.log("SMTP Payload:", smtpPayload);

    // Send email via SMTP2GO API
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(smtpPayload),
    });

    console.log("SMTP Response Status:", response.status);

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      const errorData = await response.json();
      console.error("SMTP2GO Error Response:", errorData);
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
