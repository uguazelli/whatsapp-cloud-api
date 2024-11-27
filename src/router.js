import { getSession, updateSession, clearSession } from "./util/session.js";
import { sendMessage, markMessageAsRead } from "./system/whatsapp.js";
import { mainMenu } from "./controller/mainMenu.js";
import { handleExit } from "./controller/exit.js";
import { handleServiceSelection } from "./controller/services.js";
import { handleContactSelection } from "./controller/contact.js";
import { handleUpdates } from "./controller/updates.js";

const router = (req) => {
  const values = req?.body?.entry?.[0]?.changes[0]?.value;
  const message = values?.messages?.[0];
  
  if(req.menuReplyId == "updates_menu"){
    const recipientPhoneNumber = ["5491170823016"]
    console.log(req)
    const payload = handleUpdates(req.menuReplyId, recipientPhoneNumber[0])
    // Update session with current menu and previous menu
    updateSession(recipientPhoneNumber[0], {
      currentMenu: "updates_menu",
      previousMenu: "main_menu",
      data: { btc: req.btc },
    });
    sendMessage(req.businessPhoneNumberId, payload);
  }
  
  
  else if (message) {
    const businessPhoneNumberId = values?.metadata?.phone_number_id;
    const contactName = values?.contacts[0]?.profile?.name;
    const menuReplyId = message?.interactive?.list_reply?.id;
    const buttonReplyId = message?.interactive?.button_reply?.id;
    const session = getSession(message.from) || {};
    const sessionMenu = session.currentMenu ?? "main_menu";
    const replyId = buttonReplyId ?? menuReplyId ?? sessionMenu;

    const actionMap = {
      // If user press back
      previous_menu: (from) => {
        const previousMenu = session.previousMenu || "main_menu";
        if (previousMenu === "main_menu") return mainMenu(from, contactName);
        else if (previousMenu === "services_menu")
          return handleServiceSelection(menuReplyId, from);
        else if (previousMenu === "contact_menu")
          return handleContactSelection(menuReplyId, from);
        else return mainMenu(from, contactName);
      },
      // Check for reply or current session
      exit: (from) => handleExit(menuReplyId, from, contactName),
      contact_menu: (from) => handleContactSelection(menuReplyId, from),
      our_contact: (from) => handleContactSelection(menuReplyId, from),
      client_contact: (from) => handleContactSelection(menuReplyId, from),
      services_menu: (from) => handleServiceSelection(menuReplyId, from),
      mulesoft: (from) => handleServiceSelection(menuReplyId, from),
      iot: (from) => handleServiceSelection(menuReplyId, from),
      api: (from) => handleServiceSelection(menuReplyId, from),
      whatsapp: (from) => handleServiceSelection(menuReplyId, from),
      updates_menu: (from) => handleUpdates(menuReplyId, from),
    };

    // Get the payload based on the replyId, or use mainMenu by default
    const action = actionMap[replyId];
    const payload = action
      ? action(message.from)
      : mainMenu(message.from, contactName);
    
    
    sendMessage(businessPhoneNumberId, payload);
    // Mark it as read
    markMessageAsRead(businessPhoneNumberId, message.id);
  }
};

export default router;
