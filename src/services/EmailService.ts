import { EmailStatus } from "../types";
import { checkRateLimit } from "../utils/rateLimiter";
import { retry } from "../utils/retry";

export interface Email {
  messageId: string;
  to: string;
  subject: string;
  body: string;
}

export interface EmailProvider {
  send(email: Email): Promise<boolean>;
}

export class EmailService {
  private providers: EmailProvider[];
  private sentMessages: Set<string>;
  private statusLog: Record<string, EmailStatus>;

  constructor(providers: EmailProvider[]) {
    this.providers = providers;
    this.sentMessages = new Set();
    this.statusLog = {};
  }

  async sendEmail(email: Email): Promise<EmailStatus> {
    const { messageId } = email;

    // ✅ Rate limiting check
    if (!checkRateLimit()) {
      this.statusLog[messageId] = EmailStatus.FAILED;
      console.log("Rate limit exceeded");
      return EmailStatus.FAILED;
    }

    // ✅ Idempotency check
    if (this.sentMessages.has(messageId)) {
      return EmailStatus.DUPLICATE;
    }

    // 🔁 Try sending with providers and retry logic
    for (const provider of this.providers) {
      try {
        const success = await retry(() => provider.send(email), 3, 500);
        if (success) {
          this.sentMessages.add(messageId);
          this.statusLog[messageId] = EmailStatus.SUCCESS;
          return EmailStatus.SUCCESS;
        }
      } catch (error) {
        console.log(`Provider failed, trying next: ${error}`);
        continue;
      }
    }

    this.statusLog[messageId] = EmailStatus.FAILED;
    return EmailStatus.FAILED;
  }

  // ✅ Status tracking
  getStatus(messageId: string): EmailStatus | undefined {
    return this.statusLog[messageId];
  }
}
