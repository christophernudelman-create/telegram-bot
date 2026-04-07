import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TELEGRAM_TOKEN;

// Permitir recibir JSON (CLAVE)
app.use(express.json());

// Webhook de Telegram
app.post("/", async (req, res) => {
  console.log("📩 Mensaje recibido:", JSON.stringify(req.body));

  const message = req.body.message;

  if (!message || !message.text) {
    return res.sendStatus(200);
  }

  const chatId = message.chat.id;
  const text = message.text.trim().toLowerCase();

  let reply = "🤖 No entiendo el comando";

  if (text === "/ping") {
    reply = "🏓 PONG ✅ El bot está vivo";
  }

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply
    })
  });

  res.sendStatus(200);
});

// Ruta de prueba del servidor
app.get("/", (req, res) => {
  res.send("Servidor del bot activo ✅");
});

app.listen(PORT, () => {
  console.log("✅ Servidor escuchando en puerto", PORT);
});
