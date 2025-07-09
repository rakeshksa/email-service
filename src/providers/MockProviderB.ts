import { Email, EmailProvider } from "../services/EmailService";

export class MockProviderB implements EmailProvider {
  async send(email: Email): Promise<boolean> {
    console.log("MockProviderB sending...");
    return false; // simulate failure to trigger fallback
  }
}

