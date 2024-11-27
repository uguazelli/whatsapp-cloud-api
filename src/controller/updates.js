import { getSession, updateSession } from "../util/session.js";

export const updates = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: "lua_updates",
      language: {
        code: "en",
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "buddy",
            },
          ],
        },
      ],
    },
  };
};


export const crypto = (recipientPhoneNumber, btc) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text:
          `Bitcoin price is ${btc}`,
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: { id: "previous_menu", title: "🔙 Menú anterior" },
          },
          {
            type: "reply",
            reply: { id: "contact_menu", title: "📞 Contacto" },
          },
          { type: "reply", reply: { id: "exit", title: "❌ Salir" } },
        ],
      },
    },
  };
};

// Function to handle exit and clear session
export const handleUpdates = (menuReplyId, recipientPhoneNumber) => {
  
  return updates(recipientPhoneNumber);
  
  if (menuReplyId == "1") {
    const session = getSession(recipientPhoneNumber) || {};
    return crypto(recipientPhoneNumber, session.data.btc);
  }
  else 
    return updates(recipientPhoneNumber);
};
