import { Email, EmailProvider } from "../services/EmailService";

export class MockProviderA implements EmailProvider {
  async send(email: Email): Promise<boolean> {
    console.log("MockProviderA sending...");
    return true; // simulate success
  }
}
