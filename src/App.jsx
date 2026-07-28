import { useState, useEffect, useRef } from 'react'
import EditorView from './EditorView'
import Sidebar from './Sidebar'
import GraphView from './GraphView'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [viewMode, setViewMode] = useState('editor') // 'editor' or 'graph'
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('onyx-notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    } else {
      // Create a welcome note
      const welcomeNote = {
        id: Date.now().toString(),
        title: 'Welcome to Onyx',
        content: `# Welcome to Onyx\n\nThis is your **first note**. Start writing!\n\n## Features\n\n- Local-first Markdown editor\n- [[Wikilinks]] support\n- Graph view\n- Dark/Light themes\n\nTry creating a new note or switching to graph view!`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      setNotes([welcomeNote])
      setCurrentNote(welcomeNote)
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('onyx-notes', JSON.stringify(notes))
    }
  }, [notes])

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setNotes([...notes, newNote])
    setCurrentNote(newNote)
  }

  const updateNote = (content) => {
    if (!currentNote) return
    
    const updatedNote = {
      ...currentNote,
      content,
      title: extractTitle(content) || currentNote.title,
      updatedAt: Date.now(),
    }
    
    setCurrentNote(updatedNote)
    setNotes(notes.map(note => note.id === currentNote.id ? updatedNote : note))
  }

  const deleteNote = (id) => {
    const filtered = notes.filter(note => note.id !== id)
    setNotes(filtered)
    if (currentNote && currentNote.id === id) {
      setCurrentNote(filtered.length > 0 ? filtered[0] : null)
    }
  }

  const extractTitle = (content) => {
    const firstLine = content.split('\n')[0]
    if (firstLine.startsWith('# ')) {
      return firstLine.slice(2).trim()
    }
    return null
  }

  return (
    <div className="app">
      {sidebarOpen && (
        <Sidebar 
          notes={notes}
          currentNote={currentNote}
          onSelectNote={setCurrentNote}
          onCreateNote={createNote}
          onDeleteNote={deleteNote}
        />
      )}
      
      <main className="main-content">
        <header className="header">
          <button 
            className="icon-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle sidebar"
          >
            ☰
          </button>
          
          <h1>{currentNote?.title || 'Onyx'}</h1>
          
          <div className="view-toggle">
            <button 
              className={`btn ${viewMode === 'editor' ? 'active' : ''}`}
              onClick={() => setViewMode('editor')}
            >
              Editor
            </button>
            <button 
              className={`btn ${viewMode === 'graph' ? 'active' : ''}`}
              onClick={() => setViewMode('graph')}
            >
              Graph
            </button>
          </div>
        </header>
        
        <div className="workspace">
          {viewMode === 'editor' ? (
            currentNote ? (
              <EditorView 
                content={currentNote.content}
                onChange={updateNote}
              />
            ) : (
              <div className="no-note">
                <p>Select a note or create a new one</p>
                <button className="btn primary" onClick={createNote}>
                  + New Note
                </button>
              </div>
            )
          ) : (
            <GraphView notes={notes} onSelectNote={setCurrentNote} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
