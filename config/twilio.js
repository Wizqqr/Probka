import twilio from 'twilio';

export const sendSMS = async (to, body) => {
  try {
    const accountSid = 'ACc8be9de3f8e8d3581dc1681953bc0764'; 
    const authToken = '95c34124ef646067657017b95d6b49d2';
    const client = twilio(accountSid, authToken);
    await client.messages
    .create({
        body: body, 
        messagingServiceSid: 'MG96632c943b1d703b759121b375a7ad4e',
        to: to
    })
    .then(message => console.log(message.sid));
  }catch (error) {
    console.error('Error sending SMS:', error);
  }
};
