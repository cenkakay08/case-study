# Task Approval System - Case Study

This project is a two-stage management system where employees within an organization can create task requests, and managers can approve or reject these tasks. It has been developed using a monorepo structure.

## 🏗️ Project Structure

The project consists of the following main directories:

- `user-panel/`: React application where employees create and track tasks (Port: 3000)
- `admin-panel/`: React application where managers handle tasks (Port: 3001)
- `packages/ui/`: Shared UI component library used by both panels
- `mock-server/`: JSON-Server based mock API that serves data needs for both panels

## 🚀 Installation and Running

The project uses `npm workspaces`. You can install dependencies at the root directory in one go:

```bash
# Install dependencies
npm install

# Start all applications simultaneously (including Mock server)
npm run user-panel:dev
npm run admin-panel:dev
npm run mock-server:dev
```

To run them separately:

- User Panel: `npm run user-panel:dev`
- Admin Panel: `npm run admin-panel:dev`
- Mock Server: `npm run mock-server:dev`

## 👥 Test Users

### User Panel (Employees)

| Email            | Password |
| :--------------- | :------- |
| `user1@test.com` | `123456` |
| `user2@test.com` | `123456` |

### Admin Panel (Managers)

| Email                | Password    | Role      |
| :------------------- | :---------- | :-------- |
| `admin@test.com`     | `admin123`  | Admin     |
| `moderator@test.com` | `mod123`    | Moderator |
| `viewer@test.com`    | `viewer123` | Viewer    |

## 🛠️ Technologies Used

- **Frontend:** React 19, TypeScript, Vite
- **State Management:** Redux Toolkit (AsyncThunk)
- **Validation:** TanStack Form + Zod
- **API:** Axios
- **Styling:** CSS Modules, Vanilla CSS (Premium Design Focus)
- **Icons:** React Icons
- **Common:** @base-ui/react

## 📌 Architectural Decisions

- **Monorepo:** A monorepo structure was preferred for sharing common components and types.
- **Shared UI Package:** The `@case-study/ui` package was created to ensure component consistency.
- **Theme Support:** Dark/Light theme support was provided using CSS variables and `color-scheme`.
- **Role-based Access:** Role-based page and button access restrictions were implemented in the Admin panel.

## 🌟 Bonus Features

The following optional features mentioned in the case document were added during development:

- **Multi-language Support (i18n):** Turkish and English language support infrastructure is available within the application.
- **Dark/Light Theme:** Dynamic theme support that works based on the user's system preference or application-wide.
- **Premium UI & Animations:** Smooth transitions, micro-animations, and a modern design language.
- **Hierarchical Role-based Access:** Authorization layers specific to Moderator and Admin roles.

## ⚠️ Known Issues and Notes

- **Unit Tests:** Due to time constraints or current development priorities, unit tests have not been written for the project.
- **Socket:** Real-time updates have been simulated through the mock-server.

---

_This project was prepared as a technical case study._
