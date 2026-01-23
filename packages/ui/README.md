# @case-study/ui

Shared component library developed for the Task Approval System project. It is used by both `user-panel` and `admin-panel`.

## 🎨 Design System

The library follows the principles below for a modern and premium look:

- **Design Tokens:** Colors, spacing, and typography are managed via `tokens.css`.
- **Theme flipping:** Variables like `--color-white` and `--color-black` automatically change color based on the theme.
- **Micro-animations:** Smooth transition effects for buttons and dialogs.

## 📦 Content

Some of the core components:

- **Button:** Customizable buttons with different variants (primary, secondary, danger).
- **Badge:** Color-coded labels for indicating Status (Approved, Rejected, Pending) and Priority (Urgent, High, etc.).
- **Tooltip:** `@base-ui/react` based information bubbles with high readability in both themes.
- **Dialog/Modal:** Accessible modals used for forms and approval processes.
- **Fields:** Input and select components compatible with TanStack Form.

## 🛠️ Usage

This package is a shared package within the monorepo. It is imported in applications as follows:

```tsx
import { Button, Badge } from "@case-study/ui";
```

## 🏗️ Structure

```
packages/ui/
├── src/
│   ├── components/  # Reusable React components
│   ├── tokens.css   # Global design tokens and colors
│   └── index.ts     # Export point
└── package.json
```
