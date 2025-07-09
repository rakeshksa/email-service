# 📧 Resilient Email Sending Service (TypeScript)

A robust and fault-tolerant Email API built with TypeScript.  
Designed to showcase retry logic, fallback mechanisms, rate limiting, idempotency, and basic status tracking.

---

## 🚀 Features

- ✅ Retry mechanism with exponential backoff
- ✅ Fallback between two mock providers
- ✅ Idempotent email sending
- ✅ Rate limiting (per minute)
- ✅ Email status tracking
- ✅ Simple circuit breaker pattern
- ✅ Unit tests with Jest
- ✅ Clean code following SOLID principles

---

## 📁 Folder Structure

src/
├── providers/
│ ├── MockProviderA.ts
│ └── MockProviderB.ts
├── services/
│ └── EmailService.ts
├── utils/
│ ├── circuitBreaker.ts
│ ├── rateLimiter.ts
│ └── retry.ts
├── types.ts
└── index.ts
tests/
└── EmailService.test.ts

yaml
Copy
Edit

---

## 🛠️ Tech Stack

- TypeScript
- Node.js
- Express
- Jest (for testing)

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/rakeshksa/email-service.git
cd email-service

# 2. Install dependencies
npm install

# 3. Run in dev mode
npm run dev

# 4. Run tests
npm run test

# 5. Build the project
npm run build

# 6. Start production server
npm start
📮 API Endpoints
POST /send-email
Sends a new email with retry and fallback.

Body:

json
Copy
Edit
{
  "messageId": "email-001",
  "to": "demo@example.com",
  "subject": "Hello!",
  "body": "This is a test email."
}
GET /status/:messageId
Get the delivery status of a specific message.

🧪 Testing
bash
Copy
Edit
npm run test
Unit tests are written using Jest and cover:

Success and fallback sending

Rate limit

Duplicate sends (idempotency)