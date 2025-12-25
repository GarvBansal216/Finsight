# FinSight – AI-Powered Financial Intelligence Platform

FinSight is a modern, full-stack web platform designed to **simplify financial document analysis** using AI-driven workflows and a high-quality, animated frontend.  
The project focuses on **automation, clarity, collaboration, and scalable architecture**, making it suitable for **hackathons, portfolios, internships, and startup demos**.

---

## 🚀 Project Overview

Managing financial documents manually is slow, error-prone, and fragmented across tools.  
FinSight solves this by providing a **single platform** where users can upload financial documents, extract structured insights, and collaborate efficiently.

The platform emphasizes:
- AI-powered document understanding
- Clean and modern UI/UX
- Modular and scalable architecture
- Future-ready integrations

---

## 🧠 Core Features

### 📄 AI Document Processing
- Upload financial documents (invoices, statements, reports)
- OCR + AI-based text extraction
- Automatic structuring of financial data
- Insight generation from unstructured documents

### 👥 Team Collaboration
- Shared workspaces
- Role-based access control
- Designed for finance teams, startups, and auditors

### 🎨 Modern UI / UX
- Fully responsive layout
- Smooth animations using **Framer Motion**
- Custom animated hero section (**DicedHeroSection**)
- Dark / Light theme support

### 🧩 Modular Design
- Component-based architecture
- Reusable UI components
- Scalable codebase structure

---

## 🖥️ Frontend Highlights

### Hero Section (Features Page)
The Features page uses a **custom-built animated hero component** with:
- Gradient headings
- Animated text transitions
- 4-image diced grid with warped corners
- ChronicleButton with 3D flip animation

This section visually communicates FinSight’s intelligence-first approach.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS v4**
- **shadcn/ui** (`/components/ui`)
- **Framer Motion**
- **Lucide Icons**

### Backend
- **Node.js**
- **Express.js**
- **REST APIs**
- Authentication-ready architecture

### Architecture & Design
- TypeScript-ready (currently JS-based)
- Modular component structure
- Separation of concerns
- Future integration ready

---

Frontend (React + Tailwind)
↓
Backend APIs (Node.js + Express)
↓
AI Processing Layer (OCR + AI Logic)
↓
Database / Storage


---

## 🔄 Document Processing Workflow

1. User uploads a financial document  
2. OCR extracts raw text  
3. AI processes and structures the data  
4. Insights are generated  
5. Data is displayed in a clean UI  

---

## 🔐 Authentication & Deployment Note

### ⚠️ SSL Limitation
The deployed version **does NOT currently use SSL (HTTPS)**.

Because of this:
- Firebase Authentication does **not work** in production
- Login functionality is demonstrated using a **sample test account**

### 🔑 Sample Login Credentials
Use the following credentials to access the platform:

Email: garv.bansal0412@gmail.com

Password: Garv*2006


> These credentials are for **demo/testing purposes only**.

---

## 📈 Performance & Scalability

- Lazy-loaded components
- Optimized animations
- Asynchronous data handling
- Ready for scaling with real-time integrations

---

## 🔮 Future Roadmap

- Accounting software integration (QuickBooks, Xero, Tally)
- Advanced collaboration workflows
- Secure HTTPS deployment
- Production-ready authentication
- Role-based dashboards
- Exportable financial reports

---

## 🧩 Use Cases

- Students learning fintech & AI
- Startups managing financial data
- Finance teams & auditors
- Hackathon & demo projects
- Portfolio showcases

---

## 🏆 Why FinSight?

- AI-first financial intelligence
- Premium UI with real engineering depth
- Clean architecture & scalability
- Practical, real-world problem solving
- Strong showcase project for recruiters and judges

---

## 📦 Installation (Local Setup)


npm install
npm run dev
Make sure you have:

Node.js ≥ 18

npm or pnpm installed

📄 License

This project is for educational, portfolio, and demonstration purposes.

Author
Garv Bansal
B.Tech CSE (AI)
BAckend Engineer

Punya Mittal
B.Tech CSE (AI)
Full-Stack Developer | AI Engineer

Utsav Gautam
B.Tech CSE (CPS)
Full-Stack Developer | AI Engineer

❓ Questions

Feel free to explore the codebase or reach out for clarifications.


---

If you want, I can also:
- Create a **short README (1-page)**
- Add **screenshots section**
- Add **architecture diagrams**
- Convert this into **startup documentation**
- Make a **college-submission version**

Just tell me what you want next.

## 🧱 System Architecture (High Level)

