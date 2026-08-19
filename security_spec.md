# Security Specification & Threat Model

## 1. Data Invariants
1. `contact_messages/{messageId}`:
   - Must contain valid string fields: `name` (1-100 chars), `email` (1-150 chars), `message` (1-5000 chars), and `createdAt` (server timestamp).
   - Only write/create is permitted publicly with valid structure; read/update/delete are blocked or reserved for admin.
2. `project_reactions/{projectId}`:
   - Document ID matches `projectId`.
   - `likesCount` is a non-negative integer.
   - Public read is permitted to display like counts.
   - Increment updates are bounded.

## 2. The Dirty Dozen Payloads (Tested for Rejection)
1. Ghost fields / Shadow update in contact message.
2. Oversized message payload (> 5000 chars).
3. Oversized name (> 100 chars).
4. Non-matching project ID in project reactions.
5. Negative like count in project reactions.
6. Spoofed client-side timestamp in contact messages.
7. Unauthenticated deletion of contact message.
8. Unauthenticated modification of another user's submitted contact message.
9. List scraping on contact messages.
10. Junk character injection in document ID.
11. Arbitrary schema modification on project reactions.
12. Blanket query attempt on contact messages collection.
