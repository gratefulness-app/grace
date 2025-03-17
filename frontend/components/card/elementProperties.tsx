"use client";

import React from 'react';
import { useCardStore, TextElement } from '@/lib/stores/card-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Trash2,
  MoveVertical,
} from 'lucide-react';

const ElementProperties: React.FC = () => {
  const {
    elements,
    selectedElementId,
    updateElement,
    removeElement,
    bringElementToFront,
    sendElementToBack
  } = useCardStore();

  // Find the selected element
  const selectedElement = elements.find(el => el.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No element selected</p>
        <p className="text-xs mt-2">Click on an element to edit its properties</p>
      </div>
    );
  }

  // Text element properties editor
  const renderTextProperties = (element: TextElement) => {
    return (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium">Text Content</label>
          <Input
            value={element.text}
            onChange={(e) => updateElement(element.id, { text: e.target.value } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            placeholder="Enter text"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Font Size: {element.fontSize}px</label>
          <div className="flex items-center gap-2">
            <Input
              type="range"
              min="8"
              max="72"
              value={element.fontSize}
              onChange={(e) => updateElement(element.id, { fontSize: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              className="flex-1"
            />
            <Input
              type="number"
              min="8"
              max="72"
              value={element.fontSize}
              onChange={(e) => updateElement(element.id, { fontSize: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              className="w-16"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Text Color</label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={element.color}
              onChange={(e) => updateElement(element.id, { color: e.target.value } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              className="w-10 h-10 p-1"
            />
            <Input
              value={element.color}
              onChange={(e) => updateElement(element.id, { color: e.target.value } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Text Formatting</label>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={element.bold ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => updateElement(element.id, { bold: !element.bold } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            >
              <Bold className="size-4" />
            </Button>
            <Button
              variant={element.italic ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => updateElement(element.id, { italic: !element.italic } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            >
              <Italic className="size-4" />
            </Button>
            <Button
              variant={element.underline ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => updateElement(element.id, { underline: !element.underline } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            >
              <Underline className="size-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Text Alignment</label>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={element.alignment === "left" ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => updateElement(element.id, { alignment: "left" } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            >
              <AlignLeft className="size-4" />
            </Button>
            <Button
              variant={element.alignment === "center" ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => updateElement(element.id, { alignment: "center" } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            >
              <AlignCenter className="size-4" />
            </Button>
            <Button
              variant={element.alignment === "right" ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => updateElement(element.id, { alignment: "right" } as Partial<Omit<TextElement, 'id' | 'type'>>)}
            >
              <AlignRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Position & Size</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">X Position</label>
              <Input
                type="number"
                value={Math.round(element.x)}
                onChange={(e) => updateElement(element.id, { x: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Y Position</label>
              <Input
                type="number"
                value={Math.round(element.y)}
                onChange={(e) => updateElement(element.id, { y: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Width</label>
              <Input
                type="number"
                min="10"
                value={Math.round(element.width)}
                onChange={(e) => updateElement(element.id, { width: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Height</label>
              <Input
                type="number"
                min="10"
                value={Math.round(element.height)}
                onChange={(e) => updateElement(element.id, { height: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rotation: {element.rotation}°</label>
          <Input
            type="range"
            min="0"
            max="360"
            value={element.rotation}
            onChange={(e) => updateElement(element.id, { rotation: parseInt(e.target.value) } as Partial<Omit<TextElement, 'id' | 'type'>>)}
          />
        </div>
      </>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Element Properties</h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => bringElementToFront(selectedElement.id)}
            title="Bring to Front"
          >
            <MoveVertical className="size-4 rotate-180" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => sendElementToBack(selectedElement.id)}
            title="Send to Back"
          >
            <MoveVertical className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-7 text-destructive"
            onClick={() => removeElement(selectedElement.id)}
            title="Delete Element"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {selectedElement.type === 'text' && renderTextProperties(selectedElement as TextElement)}

      {/* In the future, we'll add handlers for other element types */}
      {selectedElement.type === 'image' && <p>Image properties coming soon</p>}
      {selectedElement.type === 'shape' && <p>Shape properties coming soon</p>}
    </div>
  );
};

export default ElementProperties;