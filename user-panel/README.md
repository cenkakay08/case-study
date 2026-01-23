# User Panel - Task Approval System

A panel where employees create tasks and track their own tasks.

## ✨ Features

- **Session Management:** Secure login with email and password.
- **Dashboard:** Personal task statistics and summary of recent tasks.
- **Create Task:**
  - Form structure with validation support (Zod).
  - Priority (Low, Normal, High, Urgent) and Category selection.
- **My Tasks:**
  - Status-based filtering.
  - View task details.
  - View rejection reason for rejected tasks.

## 🛠️ Technical Details

- **Form Management:** Performant form management was achieved using `@tanstack/react-form`.
- **Language Support:** Multi-language support (TR/EN) infrastructure was prepared with i18next.
- **Styling:** Encapsulated styles were created using CSS Modules.

## 🏃 Local Development

If dependencies are installed in the root directory:

```bash
npm run user-panel:dev
```

The panel will run on `http://localhost:3000` by default.

## 🔑 Test Users

| Email            | Password |
| :--------------- | :------- |
| `user1@test.com` | `123456` |
| `user2@test.com` | `123456` |
