import { useEffect, useRef } from 'react'
import './GraphView.css'

function GraphView({ notes, onSelectNote }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || notes.length === 0) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Set background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, width, height)

    // Calculate positions for nodes (simple circular layout)
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.35
    const angleStep = (2 * Math.PI) / notes.length

    const nodePositions = notes.map((note, index) => {
      const angle = index * angleStep
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        note,
      }
    })

    // Draw connections (wikilinks)
    ctx.strokeStyle = '#4a4a6a'
    ctx.lineWidth = 1
    nodePositions.forEach((pos1, i) => {
      nodePositions.forEach((pos2, j) => {
        if (i < j) {
          // Check if there's a wikilink between notes
          const hasLink = pos1.note.content.includes(`[[${pos2.note.title}]]`) ||
                         pos2.note.content.includes(`[[${pos1.note.title}]]`)
          if (hasLink) {
            ctx.beginPath()
            ctx.moveTo(pos1.x, pos1.y)
            ctx.lineTo(pos2.x, pos2.y)
            ctx.stroke()
          }
        }
      })
    })

    // Draw nodes
    nodePositions.forEach((pos) => {
      // Node circle
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = '#6c5ce7'
      ctx.fill()
      
      // Node label
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(pos.note.title.slice(0, 15), pos.x, pos.y + 25)
    })

    // Add click handler
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      nodePositions.forEach((pos) => {
        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2)
        if (distance < 15) {
          onSelectNote(pos.note)
        }
      })
    }

    canvas.addEventListener('click', handleClick)
    return () => canvas.removeEventListener('click', handleClick)
  }, [notes, onSelectNote])

  return (
    <div className="graph-view">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600}
        className="graph-canvas"
      />
      {notes.length === 0 && (
        <div className="graph-empty">
          <p>No notes to display in graph view</p>
          <p>Create some notes first!</p>
        </div>
      )}
    </div>
  )
}

export default GraphView
