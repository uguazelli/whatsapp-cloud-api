import { getSession, updateSession, clearSession } from "./util/session.js";
import { sendMessage, markMessageAsRead } from "./system/whatsapp.js";
import { mainMenu } from "./controller/mainMenu.js";
import { handleExit } from "./controller/exit.js";
import { handleServiceSelection } from "./controller/services.js";
import { handleContactSelection } from "./controller/contact.js";

const router = (req) => {
  const values = req.body.entry?.[0]?.changes[0]?.value;
  const message = values?.messages?.[0];

  if (message) {
    const businessPhoneNumberId = values?.metadata?.phone_number_id;
    const contactName = values?.contacts[0]?.profile?.name;
    const menuReplyId = message?.interactive?.list_reply?.id;
    const buttonReplyId = message?.interactive?.button_reply?.id;
    const session = getSession(message.from) || {};
    const sessionMenu = session.currentMenu ?? "main_menu";
    const replyId = buttonReplyId ?? menuReplyId ?? sessionMenu;

    const actionMap = {
      previous_menu: (from) => {
        const previousMenu = session.previousMenu || "main_menu";
        if (previousMenu === "main_menu") {
          return mainMenu(from, contactName);
        } else if (previousMenu === "services_menu") {
          return handleServiceSelection(menuReplyId, from);
        } else if (previousMenu === "contact_menu") {
          return handleContactSelection(menuReplyId, from);
        }
        return mainMenu(from, contactName);
      },
      exit: (from) => handleExit(menuReplyId, from, contactName),
      contact_menu: (from) => handleContactSelection(menuReplyId, from),
      our_contact: (from) => handleContactSelection(menuReplyId, from),
      client_contact: (from) => handleContactSelection(menuReplyId, from),
      services_menu: (from) => handleServiceSelection(menuReplyId, from),
      mulesoft: (from) => handleServiceSelection(menuReplyId, from),
      iot: (from) => handleServiceSelection(menuReplyId, from),
      api: (from) => handleServiceSelection(menuReplyId, from),
      whatsapp: (from) => handleServiceSelection(menuReplyId, from),
    };

    // Get the payload based on the replyId, or use mainMenu by default
    const action = actionMap[replyId];
    const payload = action
      ? action(message.from)
      : mainMenu(message.from, contactName);

    // Respond to message
    sendMessage(businessPhoneNumberId, payload);
    // Mark it as read
    markMessageAsRead(businessPhoneNumberId, message.id);
  }
};

export default router;
