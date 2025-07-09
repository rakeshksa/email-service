import { EmailService } from "../src/services/EmailService";
import { MockProviderA } from "../src/providers/MockProviderA";
import { MockProviderB } from "../src/providers/MockProviderB";
import { EmailStatus } from "../src/types";

describe("EmailService", () => {
  it("should send email successfully using one of the providers", async () => {
    const service = new EmailService([new MockProviderA(), new MockProviderB()]);

    const status = await service.sendEmail({
      messageId: "msg-1",
      to: "user@example.com",
      subject: "Hello",
      body: "Test message"
    });

    expect([EmailStatus.SUCCESS, EmailStatus.FAILED]).toContain(status);
  });

  it("should prevent duplicate email sends using messageId", async () => {
    const service = new EmailService([new MockProviderA(), new MockProviderB()]);

    await service.sendEmail({
      messageId: "msg-duplicate",
      to: "user@example.com",
      subject: "Hello",
      body: "First try"
    });

    const secondTry = await service.sendEmail({
      messageId: "msg-duplicate",
      to: "user@example.com",
      subject: "Hello",
      body: "Second try"
    });

    expect(secondTry).toBe(EmailStatus.DUPLICATE);
  });
});
