export const onRequestPost = async ({ request }) => {
  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Prepare SMTP2GO payload
    const smtpPayload = {
      api_key: "api-7ADDC3FFF91E4AE8886DCC5BB9DD4276", // Replace with valid API key
      sender: "malcolm@thebishops2010.co.uk", // Verified sender email
      to: ["malcolm@m1c.co.uk"], // Recipient emails
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
      const result = await response.json();
      alert(result.message); // Inform the user of success

      // Redirect to another page after successful submission
      window.location.href = "/index.html"; // Replace with your desired URL
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`); // Handle errors
    }
  } catch (err) {
    console.error("Error submitting the form:", err);
    alert("An error occurred while submitting the form.");
  }
};
