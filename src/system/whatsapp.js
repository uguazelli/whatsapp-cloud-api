import axios from "axios";

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, Version } = process.env;

export const sendMessage = async (business_phone_number_id, payload) => {
  await axios({
    method: "POST",
    url: `https://graph.facebook.com/${Version}/${business_phone_number_id}/messages`,
    headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}` },
    data: payload,
  });
  
  return true
};

export const markMessageAsRead = async (business_phone_number_id, messageId) => {
  await axios({
      method: "POST",
      url: `https://graph.facebook.com/${Version}/${business_phone_number_id}/messages`,
      headers: { Authorization: `Bearer ${GRAPH_API_TOKEN}` },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      },
    });
}