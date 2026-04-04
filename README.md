🌸 MugiSUB
Bringing anime closer to Urdu-speaking audiences — one subtitle at a time.
�
�
�
�
Load image
What is MugiSUB?
MugiSUB is an independent Urdu anime fansubbing group dedicated to producing high-quality Urdu-subtitled anime releases for the South Asian community. Our goal is to make anime accessible to Urdu and Hindi speakers who have historically been underserved by the global fansubbing scene.
We handle everything in-house — translation, timing, encoding, and distribution — maintaining a consistent quality standard across all releases.
✨ Features
🎌 Urdu Subtitles — Gender-aware, natural conversational Urdu in Nastaliq-friendly formatting
📺 Anime Releases — Encoded with care for quality and compatibility
🔍 Browse & Search — Explore our release catalog easily
🌐 Web Platform — Clean, fast site built on Next.js
📱 Responsive Design — Works seamlessly on mobile and desktop
🛠️ Tech Stack
Layer
Technology
Frontend
Next.js (React)
Styling
CSS / Tailwind
Encoding
FFmpeg + x264
Subtitles
ASS / SRT formats
Hosting
Static / Vercel
📁 Project Structure
mugisub/
├── app/                  # Next.js app directory
│   ├── page.jsx          # Home page
│   ├── releases/         # Anime releases listing
│   ├── search/           # Search functionality
│   └── layout.jsx        # Root layout
├── components/           # Reusable React components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AnimeCard.jsx
│   └── SearchBar.jsx
├── public/               # Static assets
│   ├── images/
│   └── fonts/
├── styles/               # Global styles
└── data/                 # Release metadata / search data
🚀 Getting Started
Prerequisites
Node.js 18+
npm or yarn
Installation
# Clone the repository
git clone https://github.com/mugisub/mugisub-web.git

# Navigate into the project
cd mugisub-web

# Install dependencies
npm install

# Run development server
npm run dev
Open http://localhost:3000 in your browser.
Build for Production
npm run build
npm run start
🎬 Encoding Standards
All MugiSUB releases follow a consistent encoding pipeline:
Video codec: x264 (H.264) for maximum compatibility
CRF: 20
Preset: faster
Tune: animation
Audio: Japanese (mapped via language tag)
Encoder credit: ZAB @ MugiSUB
📋 Subtitle Standards
Natural, conversational Urdu — not literal translation
Strict gender agreement throughout
Feminine forms for female characters
Masculine forms for male characters
Line breaks using \N in ASS format
Character names written in Urdu script
🤝 Contributing
MugiSUB is a passion project. If you're interested in contributing — whether as a translator, timer, encoder, or web developer — feel free to reach out.
Fork the repository
Create your feature branch (git checkout -b feature/your-feature)
Commit your changes (git commit -m 'Add: your feature')
Push to the branch (git push origin feature/your-feature)
Open a Pull Request
🌐 Links
🌸 Website: mugisub.com
📸 Instagram: @MugiSUB
📄 License
This project's original code and assets are property of MugiSUB.
Subtitle files are fan-made and intended for non-commercial, educational use only.
Anime titles and characters belong to their respective copyright holders.
�
Made with ❤️ for the Urdu-speaking anime community 
MugiSUB — مُگی سَب 

