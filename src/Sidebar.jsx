import './Sidebar.css'

function Sidebar({ notes, currentNote, onSelectNote, onCreateNote, onDeleteNote }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Onyx</h2>
        <button className="btn primary" onClick={onCreateNote}>
          + New
        </button>
      </div>
      
      <div className="notes-list">
        {notes.map(note => (
          <div 
            key={note.id}
            className={`note-item ${currentNote?.id === note.id ? 'active' : ''}`}
            onClick={() => onSelectNote(note)}
          >
            <div className="note-title">{note.title}</div>
            <div className="note-preview">
              {note.content.slice(0, 50).replace(/[#*`]/g, '') || 'Empty note'}...
            </div>
            <button 
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteNote(note.id)
              }}
              title="Delete note"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {notes.length === 0 && (
        <div className="empty-state">
          <p>No notes yet</p>
          <p>Create your first note!</p>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
