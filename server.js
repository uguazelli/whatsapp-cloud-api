import express from "express";
import axios from "axios";
import router from "./src/router.js";
import { handleUpdates } from "./src/controller/updates.js";

const app = express();
const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT, Version } = process.env;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  router(req);
  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.get("/apihealthcheck", (req, res) => {
  res.send(`<pre>Server running.</pre>`);
});

// Start the interval for fetching and sending data

setInterval(
  async () => {
    let price = "0";

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      price = response.data.bitcoin.usd;
    } catch (error) {
      console.error("Error fetching crypto price:", error.message);
      return null;
    }

    const req = {
      menuReplyId: "updates_menu",
      businessPhoneNumberId: "436874092849418",
      btc: price
    };
    
    console.log(req)
    router(req);
  },

  // 5000
  2147483647
); // Fetch every 60 seconds

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
