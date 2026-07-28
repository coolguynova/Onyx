import { useState, useEffect, useRef } from 'react'
import { EditorView as CMEditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import './EditorView.css'

function EditorView({ content, onChange }) {
  const editorRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current) return

    const handleUpdate = (update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString())
      }
    }

    const view = new CMEditorView({
      doc: content,
      extensions: [
        basicSetup,
        markdown(),
        keymap.of(defaultKeymap),
        EditorView.updateListener.of(handleUpdate),
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '14px',
            fontFamily: 'monospace',
          },
          '.cm-content': {
            padding: '20px',
          },
        }),
      ],
      parent: editorRef.current,
    })

    viewRef.current = view

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [])

  // Update editor content when currentNote changes (but not on every keystroke)
  useEffect(() => {
    if (viewRef.current && content !== viewRef.current.state.doc.toString()) {
      const currentCursor = viewRef.current.state.selection.main.head
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: content,
        },
        selection: { anchor: Math.min(currentCursor, content.length) },
      })
    }
  }, [content])

  return (
    <div className="editor-container">
      <div ref={editorRef} className="editor" />
    </div>
  )
}

export default EditorView
