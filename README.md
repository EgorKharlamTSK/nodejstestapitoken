# 🛡️ JWT Token Service

A simple Node.js and Express backend service that demonstrates basic usage of JWT (JSON Web Tokens).

## 📖 Description

This service provides a minimal yet functional example of how to:

- Generate JWT tokens with a limited lifetime (1 hour);
- Validate existing tokens;
- Refresh a token by issuing a new one based on a valid old token.

It can be used as an educational resource, a prototype for an authentication system, or a foundation for your own auth service.

---

## 🔧 How It Works

### 🔹 1. Generate a New Token (`GET /token`)

When making a GET request to /token, the service:

- Creates a new JWT token with the following payload:
  - userId: 1
  - username: "testuser"
  - exp: 1 hour from now (3600 seconds)
- Returns the token in a JSON response.

Useful for initial authentication or for generating a test token.

---

### 🔹 2. Refresh a Token (`POST /token`)

When making a POST request to /token, the service:

- Accepts an existing JWT token in the request body (under the token key);
- Validates the token’s signature and expiration;
- If the token is valid and not expired, issues a new token;
- If the token is missing or invalid, returns an appropriate error (`400` or `401`).

This simulates a basic "refresh token" mechanism to extend session time without re-authentication.

---

## 🧪 Example Requests

### ✅ Get a New Token

```bash
curl http://localhost:3333/token
