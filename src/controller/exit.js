import { clearSession } from "../util/session.js";

export const exitDialog = (from, name) => {
  return {
    messaging_product: "whatsapp",
    to: from,
    type: "text",
    text: {
      body: `${name} ¡Gracias por chatear con nosotros 💪! Si quieres volver a \
intentarlo o tienes alguna pregunta, no dudes en escribirnos nuevamente. ¡Hasta pronto!`,
    },
  };
};

// Function to handle exit and clear session
export const handleExit = (replyId, from, name) => {
  clearSession(from); // Clear session using recipientPhoneNumber

  if (replyId == "exit") return exitDialog(from, name);
  else return exitDialog(from, name);
};
