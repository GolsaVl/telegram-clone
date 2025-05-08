
# Messengerr - A Modern Telegram-Inspired Chat Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Repo Status](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![GitHub Repo stars](https://img.shields.io/github/stars/GolsaVl/telegram-clone?style=social)](https://github.com/GolsaVl/telegram-clone)


## Overview

Messengerr is a web-based chat application inspired by Telegram, built with a modern frontend stack including React, TypeScript, Vite, and Tailwind CSS. It aims to provide a fluid and responsive user experience for real-time communication. This project currently uses hardcoded data for demonstration purposes but includes the structure for API integration and real-time updates via Socket.IO.

## ✨ Key Features

*   **Real-time Messaging:** Leverages Socket.IO for instant message delivery.
*   **Authentication:** Basic Login and Registration flow (currently mocked/hardcoded user).
*   **Chat Interface:** Clean UI for displaying conversations and sending messages.
*   **Private & Group Chats:** Supports different chat types (structure in place).
*   **User Profiles:** View and potentially edit user profile information.
*   **Settings Page:** Includes options for theme switching (Light/Dark/System) and notification preferences (UI only).
*   **Rich Message Types:** Structure ready to support text, images, videos, audio, files, and locations.
*   **User Search:** Functionality to search for users and start new chats.
*   **Chat Archiving:** Ability to archive and unarchive chats.
*   **Online Status:** Displays user online/offline/away status.
*   **Unread Message Count:** Badges indicate unread messages.
*   **Responsive Design:** Adapts to different screen sizes with a dedicated mobile navigation bar.
*   **State Management:** Uses Zustand for efficient global state handling.
*   **Modern Tooling:** Built with Vite for fast development and optimized builds, styled with Tailwind CSS for utility-first styling.
*   **TypeScript:** Ensures type safety and improves developer experience.

## 🛠️ Tech Stack

*   **Frontend:** React 18, TypeScript
*   **Build Tool:** Vite
*   **Routing:** React Router DOM v6
*   **State Management:** Zustand
*   **Styling:** Tailwind CSS v3, PostCSS, Autoprefixer
*   **UI/UX:** Framer Motion (Animations), Lucide React (Icons), `clsx`, `tailwind-merge`
*   **Forms:** React Hook Form v7, Zod (Schema Validation)
*   **Real-time:** Socket.IO Client
*   **Linting:** ESLint, TypeScript ESLint
*   **Utilities:** Day.js

## 📂 Project Structure

```
project 2/
├── public/               # Static assets (e.g., MSW worker)
├── src/
│   ├── components/       # Reusable UI components (chat, layout, sidebar, etc.)
│   ├── context/          # React context providers (Auth, Socket, Theme)
│   ├── data/             # Hardcoded data for demo purposes
│   ├── hooks/            # Custom React hooks (useAuth, useChat)
│   ├── layouts/          # Top-level layout components (App, Auth)
│   ├── lib/              # Utility functions (cn, formatDate, etc.)
│   ├── pages/            # Page components corresponding to routes
│   ├── store/            # Zustand store definitions
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component with routing setup
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and Tailwind directives
├── .gitignore            # Git ignore rules
├── bun.lock              # Bun lockfile (indicates Bun usage)
├── eslint.config.js      # ESLint configuration
├── index.html            # Main HTML entry point for Vite
├── package-lock.json     # NPM lockfile (may indicate mixed/previous usage)
├── package.json          # Project metadata and dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript base configuration
├── tsconfig.app.json     # TypeScript configuration for application code
├── tsconfig.node.json    # TypeScript configuration for Node environment (e.g., config files)
└── vite.config.ts        # Vite configuration
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   Bun (v1.x or later) or npm (v8 or later) / yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GolsaVl/telegram-clone.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd telegram-clone
    ```
3.  **Install dependencies:**
    *   Using Bun (recommended):
        ```bash
        bun install
        ```
    *   Using npm:
        ```bash
        npm install
        ```

### Running the Development Server

1.  **Start the Vite development server:**
    *   Using Bun:
        ```bash
        bun run dev
        ```
    *   Using npm:
        ```bash
        npm run dev
        ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## ⚙️ Environment Variables

This project might require environment variables for certain configurations (e.g., API endpoints if connecting to a backend).

1.  Create a `.env` file in the project root.
2.  Add necessary environment variables:
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    VITE_SOCKET_URL=http://localhost:3000
    ```
    *(Note: Adjust variable names and values as needed. These are examples.)*

The `.gitignore` file is already configured to ignore `.env` files.

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `bun run dev` or `npm run dev`: Runs the app in development mode with hot reloading.
*   `bun run build` or `npm run build`: Builds the app for production to the `dist` folder.
*   `bun run lint` or `npm run lint`: Lints the project files using ESLint.
*   `bun run preview` or `npm run preview`: Serves the production build locally for preview.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application or want to report a bug, please feel free to:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code adheres to the project's linting rules (`bun run lint` or `npm run lint`).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file (you'll need to create this file) for details.

Copyright (c) 2024 Golsa Valizadeh

## 🙏 Acknowledgements & Contact

*   Built by Golsa Valizadeh - [GitHub Profile](https://github.com/GolsaVl)
*   Project Repository: [https://github.com/GolsaVl/telegram-clone](https://github.com/GolsaVl/telegram-clone)
*   Inspiration: Telegram Messenger
