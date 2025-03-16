"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline,
  Image, Type, PaintBucket, LayoutGrid, Undo, Redo, Save,
  Share, Trash, Plus, Minus, MoveHorizontal, Check
} from 'lucide-react';

export default function CreateCardPage() {
  const [cardTitle, setCardTitle] = useState("Untitled Card");
  const [selectedColor, setSelectedColor] = useState("#FFB6C1"); // Light pink
  const [fontSize, setFontSize] = useState(16);

  const colorOptions = [
    "#FFB6C1", // Light pink
    "#FFD700", // Gold
    "#98FB98", // Pale green
    "#87CEFA", // Light sky blue
    "#DDA0DD", // Plum
    "#FFA07A", // Light salmon
    "#F0F8FF", // Alice blue
    "#FFDAB9", // Peach puff
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create a New Card</h1>
          <p className="text-muted-foreground">Design your custom card and share it with your network</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Undo className="mr-1 size-4" />
            Undo
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="mr-1 size-4" />
            Redo
          </Button>
          <Button size="sm">
            <Save className="mr-1 size-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Tools</CardTitle>
            <CardDescription>Add elements to your card</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Title</label>
              <Input
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                placeholder="Enter card title"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium">Add Element</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex flex-col h-auto py-2">
                  <Type className="size-5 mb-1" />
                  <span className="text-xs">Text</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-2">
                  <Image className="size-5 mb-1" />
                  <span className="text-xs">Image</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-2">
                  <LayoutGrid className="size-5 mb-1" />
                  <span className="text-xs">Shape</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-auto py-2">
                  <PaintBucket className="size-5 mb-1" />
                  <span className="text-xs">Background</span>
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium">Text Formatting</label>
              <div className="flex flex-wrap gap-1">
                <Button variant="outline" size="icon" className="size-8">
                  <Bold className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                  <Italic className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                  <Underline className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                  <AlignLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                  <AlignCenter className="size-4" />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                  <AlignRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size: {fontSize}px</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setFontSize(Math.max(8, fontSize - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <div className="flex-1 h-2 bg-muted rounded-full relative">
                  <div
                    className="absolute h-2 bg-primary rounded-full"
                    style={{ width: `${(fontSize - 8) / 24 * 100}%` }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={() => setFontSize(Math.min(32, fontSize + 1))}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium">Background Color</label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className="w-full aspect-square rounded-md border flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Check className="size-4 text-black/70" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle - Card Preview */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your card will look</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
              {/* Card Preview Canvas */}
              <div
                className="w-full max-w-md aspect-[2/3] rounded-lg border shadow-sm flex flex-col overflow-hidden"
                style={{ backgroundColor: selectedColor }}
              >
                <div className="flex-1 flex items-center justify-center p-6">
                  <div
                    contentEditable
                    className="w-full h-full flex items-center justify-center text-center outline-none"
                    style={{ fontSize: `${fontSize}px` }}
                    suppressContentEditableWarning
                  >
                    Click to add your message
                  </div>
                </div>
                <div className="p-4 text-center text-sm bg-white/10 backdrop-blur-sm">
                  Made with ❤️ using Grace
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t">
              <Button variant="outline" size="sm">
                <Trash className="mr-1 size-4" />
                Delete
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MoveHorizontal className="mr-1 size-4" />
                  Templates
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-1 size-4" />
                  Share
                </Button>
                <Button size="sm">
                  <Save className="mr-1 size-4" />
                  Save
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}