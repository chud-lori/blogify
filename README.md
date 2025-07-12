# Go Boilerplate Frontend (React + Vite + Tailwind)

This project is a modern, responsive frontend for the [Go Boilerplate backend](https://github.com/chud-lori/go-boilerplate), built with React, Vite, and Tailwind CSS.

## Features
- Beautiful SaaS-style landing page
- Authentication (Sign Up, Sign In, JWT)
- Public and private post browsing
- Create, edit, and view posts (with author info)
- Responsive design for all devices
- Pagination on the posts list
- Dark mode toggle
- Modern UI/UX with animated hero, features, and footer
- Informative footer with links to contribute and connect

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Connect to your Go backend:**
   - By default, the frontend expects the backend API at `/api`. Adjust the API base URL in `src/api.ts` if needed.

## API Example (Pagination)
To fetch posts with pagination:
```bash
curl -X 'GET' \
  'http://localhost:1234/api/post?search=page&page=1&limit=10' \
  -H 'accept: application/json' \
  -H 'X-API-KEY: secret-api-key'
```

## Contributing
Want to contribute? PRs are welcome!
- [Contribute on GitHub](https://github.com/chud-lori/go-boilerplate)

## About the Author
- Website: [lori.my.id](https://lori.my.id)
- LinkedIn: [chud-lori](https://www.linkedin.com/in/chud-lori)
