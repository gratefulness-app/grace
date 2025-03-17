"use client";

import React, { useState, useRef, useEffect } from 'react';
import { TextElement, useCardStore } from '@/lib/stores/card-store';
import DraggableWrapper from './draggableWrapper';

interface TextElementProps {
  element: TextElement;
}

const TextElementComponent: React.FC<TextElementProps> = ({ element }) => {
  const {
    updateElement,
    selectElement,
    selectedElementId,
    bringElementToFront
  } = useCardStore();

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(element.text);
  const textRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedElementId === element.id;

  // Apply the updated text when editing is done
  useEffect(() => {
    if (!editing && text !== element.text) {
      updateElement(element.id, { text } as Partial<Omit<TextElement, 'id' | 'type'>>);
    }
  }, [editing, text, element.id, element.text, updateElement]);

  // Handle the selection of this element
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
    bringElementToFront(element.id);
  };

  // Handle double-click to start editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
  };

  // Handle text input changes
  const handleTextChange = (e: React.FormEvent<HTMLDivElement>) => {
    setText(e.currentTarget.textContent || '');
  };

  // Handle when element is dragged
  const handleDrag = (_e: MouseEvent | React.MouseEvent | React.TouchEvent | TouchEvent, data: { x: number; y: number }) => {
    // Here we might want to update the UI without committing to the store
    console.log('TextElement drag:', { x: data.x, y: data.y, elementId: element.id });
    updateElement(element.id, {
      x: data.x,
      y: data.y
    });
  };

  // Handle when dragging stops
  const handleDragStop = (_e: MouseEvent | React.MouseEvent | React.TouchEvent | TouchEvent, data: { x: number; y: number }) => {
    console.log('TextElement stop:', { x: data.x, y: data.y, elementId: element.id });

    // Update the element position in the store
    updateElement(element.id, {
      x: data.x,
      y: data.y
    });
  };

  // Handle when editing is completed
  const handleBlur = () => {
    setEditing(false);
  };

  // Prevent text selection during drag
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Set keyboard events for editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setEditing(false);
    }
  };

  return (
    <DraggableWrapper
      position={{ x: element.x, y: element.y }}
      onDrag={handleDrag}
      onStop={handleDragStop}
      disabled={editing}
      bounds="parent"
      axis="both"
    >
      <div
        ref={textRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onDragStart={handleDragStart}
        style={{
          position: 'absolute',
          cursor: editing ? 'text' : 'move',
          zIndex: element.zIndex,
          transform: `rotate(${element.rotation}deg)`,
          width: element.width,
          minHeight: element.height,
          fontSize: `${element.fontSize}px`,
          fontFamily: element.fontFamily,
          color: element.color,
          fontWeight: element.bold ? 'bold' : 'normal',
          fontStyle: element.italic ? 'italic' : 'normal',
          textDecoration: element.underline ? 'underline' : 'none',
          textAlign: element.alignment,
          padding: '4px',
          outline: isSelected ? '2px solid #3b82f6' : 'none',
          borderRadius: '2px',
          backgroundColor: editing ? 'rgba(255,255,255,0.5)' : 'transparent',
        }}
        contentEditable={editing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onInput={handleTextChange}
        onKeyDown={handleKeyDown}
      >
        {element.text}
      </div>
    </DraggableWrapper>
  );
};

export default TextElementComponent;