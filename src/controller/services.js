import { updateSession } from "../util/session.js";

export const servicesMenuDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "Menu de servicios",
      },
      body: {
        text: "Luatron ofrece servicios especializados en integración y tecnología, que servicio te gustaria conocer mas?",
      },
      action: {
        button: "Selecione una opcion",
        sections: [
          {
            rows: [
              {
                id: "mulesoft",
                title: "Mulesoft",
                description: "Servicios de integracao con Mulesoft",
              },
              {
                id: "iot",
                title: "Internet of things",
                description: "Servicios IOT",
              },
              {
                id: "api",
                title: "API",
                description: "Desarollo de APIs a la medida",
              },
              {
                id: "whatsapp",
                title: "WhatsApp",
                description: "Desarollo de WhatsApp Cloud API",
              },
            ],
          },
        ],
      },
    },
  };
};

export const mulesoftDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `MuleSoft es una plataforma de integración que permite conectar aplicaciones, datos y dispositivos a través de APIs, facilitando la comunicación entre sistemas y la automatización de procesos.\
        \n\nSu entorno Anypoint Platform ofrece herramientas para diseñar, construir y gestionar integraciones y APIs de manera eficiente.\
        \n\nPara saber mas, consulte nuestra pagina web en el menu Mulesoft\
        \n\nhttps://www.luatron.com/mulesoft`,
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

export const iotDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `Nuestros servicios de IoT (Internet de las Cosas) ayudan a conectar dispositivos y recopilar datos en tiempo real para optimizar procesos y tomar decisiones informadas. \
        \n\nPodemos diseñar, implementar y gestionar soluciones de IoT personalizadas para su negocio, impulsando la eficiencia y mejorando la experiencia de sus clientes.\
        \n\nPara saber más, visite nuestra página en el menú IoT Services\
        \n\nhttps://www.luatron.com/iot`,
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

export const apiDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `Ofrecemos servicios de desarrollo y gestión de APIs que permiten la comunicación y el intercambio seguro de datos entre sus aplicaciones y sistemas. \
        \n\nNuestras soluciones API personalizadas ayudan a integrar plataformas, automatizar procesos y facilitar la transformación digital de su negocio.\
        \n\nPara más información, visite nuestra página en el menú APIs Services\
        \n\nhttps://www.luatron.com/apis`,
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

export const whatsAppDialog = (recipientPhoneNumber) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: `Con la API de WhatsApp Cloud, conectamos su empresa directamente con clientes a través de WhatsApp, permitiendo una comunicación rápida y efectiva. \
        \n\nIntegramos WhatsApp en su sistema para mejorar el servicio al cliente, enviar notificaciones automatizadas y aumentar la satisfacción del usuario.\
        \n\nPara saber más, consulte nuestra página en el menú WhatsApp API\
        \n\nhttps://www.luatron.com/whatsapp-api`,
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

export const handleServiceSelection = (replyId, from) => {
  updateSession(from, {
    currentMenu: "services_menu",
    previousMenu: "main_menu",
    data: {},
  });

  if (replyId == "mulesoft") return mulesoftDialog(from);
  else if (replyId == "iot") return iotDialog(from);
  else if (replyId == "api") return apiDialog(from);
  else if (replyId == "whatsapp") return whatsAppDialog(from);
  else return servicesMenuDialog(from);
};
