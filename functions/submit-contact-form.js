export async function onRequestPost(context) {
    const { request } = context;
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const apiKey = 'api-7ADDC3FFF91E4AE8886DCC5BB9DD4276';
    const apiUrl = 'https://api.smtp2go.com/v3/email/send';

   // Prepare the email data
const emailData = {
    "from": {
      "email": "malcolm@thebishops2010.co.uk", // Replace with your sender email
      "name": "Website form" // Replace with your sender name
    },
    "to": [
      {
        "email": email,
        "name": name
      }
    ],
    "subject": "Test Email",
    "text": `Phone: ${phone}, Message: ${message}`
  };
  
  // Convert the data to JSON
  const jsonData = JSON.stringify(emailData);
  
  // Set up the API request headers
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };
  
  // Make the API request
  fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: jsonData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

}


