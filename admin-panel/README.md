# Admin Panel - Task Approval System

A management panel where managers review and approve tasks, and perform user management.

## 🔐 Role-Based Access Control (RBAC)

The panel has three different permission levels:

- **Admin:** All permissions + Add/Edit/Delete users.
- **Moderator:** Permission to approve and reject pending tasks.
- **Viewer:** View-only permission (approve/reject buttons are disabled).

## ✨ Features

- **Advanced Dashboard:** Today's approval/rejection counts and priority-based distribution charts.
- **Pending Tasks:**
  - Search (Title, Task Owner) and filtering.
  - Quick action buttons (Approve/Reject).
  - Mandatory reason entry when rejecting.
- **All Tasks:** List of all past tasks with archive system.
- **User Management (Admin Only):** Add new administrators and manage existing ones.

## 🛠️ Technical Details

- **Security:** Route-level permission control (Guard components).
- **UI/UX:** Consistent interface with `@case-study/ui` library. Premium and responsive design.
- **State:** Global state management with Redux Toolkit.

## 🏃 Local Development

If dependencies are installed in the root directory:

```bash
npm run admin-panel:dev
```

The panel will run on `http://localhost:3001` by default.

## 🔑 Test Users

| Email                | Password    | Role      |
| :------------------- | :---------- | :-------- |
| `admin@test.com`     | `admin123`  | Admin     |
| `moderator@test.com` | `mod123`    | Moderator |
| `viewer@test.com`    | `viewer123` | Viewer    |
