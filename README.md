<div align="center">
  <img src="assets/onyx-logo.svg" alt="Onyx logo" width="120" />
  <h1>Onyx</h1>
  <p><em>The polished, open‑source knowledge base that rivals Obsidian – 100% free.</em></p>
  
  [![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
  [![Discord](https://img.shields.io/discord/1234567890?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/onyx)
  [![Twitter](https://img.shields.io/twitter/follow/OnyxNotes?style=social)](https://twitter.com/OnyxNotes)
</div>

---

## ✨ Why Onyx?

Onyx is a **free and open‑source** note‑taking app that gives you the power of Obsidian with a more refined, premium experience.  
All your notes stay as plain Markdown files on your device. Onyx simply adds a beautiful interface, real‑time sync, and full compatibility with Obsidian plugins – without ever asking for a subscription.

**Key highlights:**
- 📝 **Local‑first Markdown editor** – live preview, split view, `[[wikilinks]]`, graph view.
- 🔄 **Free, encrypted sync** – peer‑to‑peer or self‑hosted relay. Works on Android and desktop.
- 🧩 **Obsidian plugin support** – install community plugins directly and they just work.
- 📥 **One‑click vault import** – bring your entire Obsidian setup over in seconds.
- 🎨 **Polished UI** – thoughtfully designed, smooth animations, dark/light themes.

---

## 🚀 Getting Started

### Download
[![Windows](https://img.shields.io/badge/Windows-0078D6?logo=windows&logoColor=white)](https://github.com/onyx‑notes/onyx/releases/latest)
[![macOS](https://img.shields.io/badge/macOS-000000?logo=apple&logoColor=white)](https://github.com/onyx‑notes/onyx/releases/latest)
[![Linux](https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black)](https://github.com/onyx‑notes/onyx/releases/latest)
[![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)](https://play.google.com/store/apps/details?id=com.onyxnotes.app)

> iOS coming soon – join the [TestFlight](https://testflight.apple.com/join/xxx) waitlist.

### Build from Source
```bash
# Prerequisites: Rust, Node.js 20+, pnpm
git clone https://github.com/onyx-notes/onyx.git
cd onyx
pnpm install
pnpm tauri dev     # desktop
pnpm cap run android  # mobile (requires Android Studio)
