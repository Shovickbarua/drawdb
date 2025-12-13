<div align="center">
  <img width="64" alt="logo" src="./src/assets/icon-dark.png">
  <h1>drawDB by Shovick Barua</h1>
</div>

<p align="center">
  An open source fork of drawDB focused on reliability and sovereignty.
</p>

## Highlights

- Login
- Multiple projects 
- Delete projects safely
- Persistent backend storage — no risk if browser session data is lost
- Free to use; self-host to retain full control

## Why This Fork

- No need to worry about losing diagrams if browser storage clears. Just log in and your projects are there.
- Deploy on your own platform to keep full sovereignty over your data.

## Notes

- Diagrams are stored as JSON on the backend after login.
- Configure `VITE_API_URL` to point the frontend to your backend.
- If the server is not deployed or reachable:
  - Login will not work.
  - Creating, opening, and deleting projects will not create files.
  - Deploy and set `VITE_API_URL` to enable backend features.

## Deploy for free (Frontend on Vercel, Backend on Render)

### Backend (Render)
- Create a new Web Service from this repository.
- Set root directory to `backend`.
- Build command: `npm install`
- Start command: `npm run start`

### Frontend (Vercel)
- Import the repository and use the Vite/React preset.
- Environment variables:
  - `VITE_API_URL`: set to your Render backend URL (e.g. `https://your-backend.onrender.com`)
- Deploy. The app will use your backend for login and project storage.

## Demo Server

- Demo credentials:
  - Username: `admin`
  - Password: `admin`

Set `VITE_API_URL` to the demo backend to try it without self-hosting.
