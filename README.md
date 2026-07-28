# Onyx - Knowledge Base

A free, open-source note-taking app compatible with Obsidian.

## Features

- 📝 **Local-first Markdown editor** – live preview with CodeMirror
- 🔗 **Wikilinks support** – link notes together with `[[wikilinks]]`
- 🕸️ **Graph view** – visualize connections between your notes
- 🎨 **Dark theme** – polished, modern UI
- 💾 **LocalStorage persistence** – your notes are saved automatically

## Tech Stack

- React + Vite
- CodeMirror 6 for markdown editing
- Canvas API for graph visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. You can serve them with any static file server or open `dist/index.html` directly in a browser.

## Project Structure

```
onyx/
├── src/
│   ├── App.jsx          # Main application component
│   ├── EditorView.jsx   # Markdown editor with CodeMirror
│   ├── Sidebar.jsx      # Notes list sidebar
│   ├── GraphView.jsx    # Graph visualization
│   └── *.css            # Stylesheets
├── index.html
├── vite.config.js
└── package.json
```

## License

AGPL-3.0
