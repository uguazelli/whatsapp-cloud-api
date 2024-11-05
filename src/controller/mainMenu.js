import { updateSession } from "../util/session.js";

const mainMenuDialog = (recipientPhoneNumber, name) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Menu",
      },
      body: {
        text: `Hola ${name} 👋, bienvenido.`,
      },
      footer: {
        text: "Powered by Luatron",
      },
      action: {
        button: "Selecione una opcion",
        sections: [
          {
            rows: [
              {
                id: "services_menu",
                title: "Servicios",
                description: "👨🏻‍ 💻Servicios ofrecidos por Luatron",
              },
              {
                id: "contact_menu",
                title: "Contacto",
                description: "📞 Entre en contacto con un representante",
              },
              {
                id: "game_menu",
                title: "Juego",
                description: "🥇 Teste tus conecimentos",
              },
            ],
          },
        ],
      },
    },
  };
};

export const mainMenu = (from, contactName) => {
  // Update a session
  updateSession(from, {
    currentMenu: "main_menu",
    previousMenu: "main_menu",
    data: {},
  });

  return mainMenuDialog(from, contactName);
};
