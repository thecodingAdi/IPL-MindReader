# IPL MindReader 🏏

IPL MindReader is a cinematic, AI-powered interactive game that guesses your favorite IPL legends. Using a sophisticated Bayesian probability engine and conversational AI, it provides a high-stakes "Game Show" experience with live metrics and immersive visuals.

![IPL MindReader Banner](https://images.freekaamaal.com/post_images/1597833450.jpg)

## 🚀 Key Features

- **Bayesian Reasoning Engine**: A high-performance probabilistic engine that selects the most informative questions using entropy-based statistical analysis.
- **Conversational AI Host**: Powered by **Groq (Llama 3.1 8B Instant)** for lightning-fast, natural-sounding reactions and dynamic question rephrasing.
- **Live "AI Brain" Metrics**: Real-time analysis panel showing:
    - AI Confidence Level (%)
    - Remaining Player Candidates
    - Real-time "Front-runners" predictions
- **Cinematic UI**: Premium dark-mode stadium theme with high-quality animations, glassmorphic effects, and interactive legends banners.
- **Mobile Responsive**: Optimized for both desktop and mobile "game-show" play.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI Integration**: Groq SDK (Llama 3.1 8B & 70B)
- **Styling**: Vanilla CSS (Premium Custom Design System)
- **Logic**: Entropy-based Probabilistic Reasoning (JS Engine)

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js 18.17 or later
- npm or yarn

### 2. Clone and Install
```bash
git clone https://github.com/thecodingAdi/IPL-MindReader.git
cd IPL-MindReader
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

## 🏃 How to Run

### Development Mode
Run the app locally with hot-reloading:
```bash
npm run dev
```
Access the game at [http://localhost:3000](http://localhost:3000).

### Production Build
Build for production and start the optimized server:
```bash
npm run build
npm start
```

## 📂 Project Structure

- `app/`: Next.js App Router (Pages, API Routes, Global Styles)
- `lib/`: Core game logic:
  - `engine.js`: The Bayesian probability engine
  - `groq.js`: AI rephrasing and reaction logic
- `data/`: Structured databases:
  - `players.json`: 350+ IPL Player profiles with statistical attributes
  - `questions_structured.js`: Category-based question bank
- `public/`: Static assets and branding

## 🌐 Deployment

The project is optimized for **Vercel**. To deploy:
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add `GROQ_API_KEY` to the Environment Variables in the Vercel Dashboard.
4. Deploy!

---
Built with ❤️ for IPL Fans.
