



import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import CursorOverlay from './CursorOverlay';
import '../styles/Editor.css';
import debounce from 'lodash.debounce';

const Editor: React.FC = () => {
  const { documentState, updateContent, updateCursorPosition } = useSocket();
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<HTMLDivElement>(null);

  // Debounced function to emit content changes
  const debouncedUpdateContent = useCallback(
    debounce((newContent: string) => {
      updateContent(newContent);
    }, 500),
    []
  );

  // Update local content when document state changes
  useEffect(() => {
    if (
      documentState?.content &&
      editorRef.current &&
      documentState.content !== editorRef.current.innerText
    ) {
      editorRef.current.innerText = documentState.content;
    }
  }, [documentState]);

  // Handle content changes
  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerText;
    setContent(newContent);
    debouncedUpdateContent(newContent);
  };

  // Track cursor position
  const handleCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode || !editorRef.current) return;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const textBeforeCaret = preCaretRange.toString();

    const lines = textBeforeCaret.split('\n');
    const line = lines.length - 1;
    const ch = lines[lines.length - 1].length;

    updateCursorPosition({ line, ch });
  };

  return (
    <div className="editor-container">
      <div
        ref={editorRef}
        className="editor-area"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onKeyUp={handleCursorPosition}
        onMouseUp={handleCursorPosition}
      />
      <CursorOverlay editorRef={editorRef} />
    </div>
  );
};

export default Editor;
