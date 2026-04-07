import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TELEGRAM_TOKEN;

// MUY IMPORTANTE: permitir JSON
app.use(express.json());

app.post("/", async (req, res) => {
  const message = req.body.message;

  if (message && message.text) {
    const chatId = message.chat.id;
    const text = message.text.toLowerCase();

    let reply = "No entendí el mensaje";

    if (text === "/start") {
      reply = "✅ Misión cumplida: el bot está funcionando 🤖";
    }

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply
      })
    });
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Servidor del bot activo ✅");
});

app.listen(PORT, () => {
  console.log("Servidor activo en puerto", PORT);
});

