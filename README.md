# MegaProject - React Blog Website with Appwrite

A modern, performant blog website built with **React** and powered by **Appwrite** backend services.  
This project uses Vite for fast development and bundling, along with Redux Toolkit, React Router, and Tailwind CSS for styling.

---

## Tech Stack

- **Frontend:** React 19, React Router DOM, React Hook Form, Redux Toolkit  
- **Backend:** Appwrite (cloud backend platform for authentication, database, storage, etc.)  
- **UI & Styling:** Tailwind CSS, TinyMCE React (rich text editor)  
- **Build Tool:** Vite  
- **Linting:** ESLint with React Hooks plugin  

---

## Features

- User authentication and authorization via Appwrite  
- Rich text blog editor using TinyMCE  
- State management with Redux Toolkit  
- Responsive and modern UI powered by Tailwind CSS  
- Client-side routing with React Router  

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)  
- npm or yarn package manager  
- Appwrite project with necessary collections and authentication configured  

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/megaproject.git
cd megaproject
```
2.**Install dependencies**
```bash
npm install
# or
yarn install
```

3.**Configure environment variables**
```bash
VITE_APPWRITE_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]
VITE_APPWRITE_PROJECT_ID=[YOUR_PROJECT_ID]
```
4.**Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open your browser at http://localhost:5173 to view the app.

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Runs the app in development mode |
| `npm run build`   | Builds the app for production    |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint to check code style   |


### Folder Structure
```
├── public/          # Static assets
├── src/             # React source files
│   ├── components/  # Reusable components
│   ├── pages/       # Route pages
│   ├── redux/       # Redux slices and store
│   └── App.jsx      # Root component
├── .env             # Environment variables
├── vite.config.js   # Vite configuration
└── package.json
```

### Contributing
Feel free to open issues or submit pull requests for improvements or bug fixes.


Built with ❤️ using React and Appwrite