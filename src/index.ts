import express from "express";
import { EmailService } from "./services/EmailService";
import { MockProviderA } from "./providers/MockProviderA";
import { MockProviderB } from "./providers/MockProviderB";

const app = express();
app.use(express.json());

const emailService = new EmailService([new MockProviderA(), new MockProviderB()]);

app.post("/send-email", async (req, res) => {
  const status = await emailService.sendEmail(req.body);
  res.json({ status });
});

app.get("/status/:id", (req, res) => {
  const status = emailService.getStatus(req.params.id);
  res.json({ status });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Email API running on port ${PORT}`);
});
