import { updateSession } from "../util/session.js";

export const contactMenuDialog = (recipientPhoneNumber, name) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "🌟 Menú de Contacto 🌟",
      },
      body: {
        text: `Por favor, elige una de las siguientes opciones:`,
      },
      footer: {
        text: "Powered by Luatron",
      },
      action: {
        button: "Seleccionar",
        sections: [
          {
            rows: [
              {
                id: "our_contact",
                title: "Info de contacto",
                description: "📞 Obtén nuestros detalles.",
              },
              {
                id: "client_contact",
                title: "Cliente",
                description: "✉️ Proporciona tus datos.",
              },
              {
                id: "previous_menu",
                title: "Menú anterior",
                description: "🔙 Regresa al menú anterior.",
              },
              {
                id: "exit",
                title: "Salir",
                description: "❌ Termina la conversación.",
              },
            ],
          },
        ],
      },
    },
  };
};

export const ourContactInfoDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text:
          `¡Hola! Aquí tienes nuestra información de contacto:\n\n` +
          `📞 **Teléfono:** +55 9 11 27978237\n` +
          `📧 **Email:** admin@boxdigital.net\n` +
          `🌐 **Sitio web:** [www.luatron.com](https://www.luatron.com)\n\n` +
          `Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.\n\n` +
          `Para más información sobre MuleSoft, consulta nuestra página web en el menú MuleSoft:\n` +
          `https://www.luatron.com/mulesoft`,
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

export const clientContactInfoDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text:
          `¡Hola! Aquí tienes nuestra información de contacto:\n\n` +
          `📞 **Teléfono:** +55 9 11 27978237\n` +
          `📧 **Email:** admin@boxdigital.net\n` +
          `🌐 **Sitio web:** [www.luatron.com](https://www.luatron.com)\n\n` +
          `Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.\n\n` +
          `Para más información sobre MuleSoft, consulta nuestra página web en el menú MuleSoft:\n` +
          `https://www.luatron.com/mulesoft`,
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

// Function to handle contact menu based on replyId
export const handleContactSelection = (replyId, from) => {
  // Update session with current menu and previous menu
  updateSession(from, {
    currentMenu: "contact_menu",
    previousMenu: "main_menu",
    data: {},
  });

  if (replyId == "our_contact") return ourContactInfoDialog(from);
  else if (replyId == "client_contact") return clientContactInfoDialog(from);
  else return contactMenuDialog(from);
};
