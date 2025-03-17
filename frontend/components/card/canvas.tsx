"use client";

import React, { useRef } from 'react';
import { useCardStore, CardElement } from '@/lib/stores/card-store';
import TextElementComponent from './textElement';

const CardCanvas: React.FC = () => {
  const {
    backgroundColor,
    elements,
    selectElement
  } = useCardStore();

  const canvasRef = useRef<HTMLDivElement>(null);

  // Clear selection when clicking on canvas background
  const handleCanvasClick = () => {
    selectElement(null);
  };

  // Render different element types
  const renderElement = (element: CardElement) => {
    switch (element.type) {
      case 'text':
        return <TextElementComponent key={element.id} element={element} />;
      // We'll add these cases later
      case 'image':
        return <div key={element.id}>Image element (coming soon)</div>;
      case 'shape':
        return <div key={element.id}>Shape element (coming soon)</div>;
      default:
        return null;
    }
  };

  // Sort elements by zIndex for proper layering
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="flex-1 relative overflow-hidden rounded-lg border shadow-sm"
      style={{
        backgroundColor,
        width: '100%',
        height: '100%',
        minHeight: '400px',
      }}
    >
      {sortedElements.map(renderElement)}
    </div>
  );
};

export default CardCanvas;