"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Type, Image as ImageIcon, PaintBucket, LayoutGrid, Undo, Redo, Save,
  Share, Trash, MoveHorizontal, Check, Download, Layers
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useCardStore, createTextElement, CardElement } from '@/lib/stores/card-store';
import CardCanvas from '@/components/card/canvas';
import ElementProperties from '@/components/card/elementProperties';

function CreateCardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardIdParam = searchParams.get('id');
  const titleParam = searchParams.get('template')?.replace(/_/g, ' ') || undefined;
  const [isSaving, setIsSaving] = useState(false);

  const {
    title,
    setTitle,
    backgroundColor,
    setBackgroundColor,
    addElement,
    selectedElementId,
    elements,
    createNewCard,
    saveCard,
    loadCard,
    loadAllCards,
  } = useCardStore();

  // Load card if ID is provided, or initialize with template title
  useEffect(() => {
    // First load all cards from cookies
    loadAllCards();

    if (cardIdParam) {
      // If we have a card ID, load that specific card
      loadCard(cardIdParam);
    } else if (titleParam) {
      // For a new card from template, create a new card and set the title
      createNewCard();
      setTitle(titleParam);
    } else {
      // For a completely new card
      createNewCard();
    }
  }, [cardIdParam, titleParam, loadCard, createNewCard, setTitle, loadAllCards]);

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

  // Handler for adding a new text element
  const handleAddText = () => {
    addElement(createTextElement({
      text: "New Text",
      x: Math.random() * 100 + 50, // Random position for variety
      y: Math.random() * 100 + 50
    }));
  };

  // Handle saving the card
  const handleSaveCard = () => {
    setIsSaving(true);
    try {
      // Save the card and get the ID
      const savedCardId = saveCard();
      toast.success(`Card saved successfully! ID: ${savedCardId}`);

      // If this is a new card (i.e., not editing an existing one),
      // redirect to the my-cards page with a success message
      if (!cardIdParam) {
        router.push('/app/my-cards');
      }
    } catch (error) {
      console.error("Error saving card:", error);
      toast.error("Failed to save card. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle deleting the card (discard)
  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard this card? All changes will be lost.")) {
      createNewCard();
      router.push('/app/my-cards');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {cardIdParam ? 'Edit Card' : 'Create a New Card'}
          </h1>
          <p className="text-muted-foreground">
            {cardIdParam
              ? 'Make changes to your existing card'
              : 'Design your custom card and share it with your network'}
          </p>
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
          <Button size="sm" onClick={handleSaveCard} disabled={isSaving}>
            <Save className="mr-1 size-4" />
            {isSaving ? 'Saving...' : 'Save'}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter card title"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium">Add Element</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-2"
                  onClick={handleAddText}
                >
                  <Type className="size-5 mb-1" />
                  <span className="text-xs">Text</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-2"
                  disabled
                  title="Coming soon"
                >
                  <ImageIcon className="size-5 mb-1" />
                  <span className="text-xs">Image</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-2"
                  disabled
                  title="Coming soon"
                >
                  <LayoutGrid className="size-5 mb-1" />
                  <span className="text-xs">Shape</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-auto py-2"
                >
                  <PaintBucket className="size-5 mb-1" />
                  <span className="text-xs">Background</span>
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
                    onClick={() => setBackgroundColor(color)}
                  >
                    {backgroundColor === color && (
                      <Check className="size-4 text-black/70" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Elements List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Elements</label>
                <span className="text-xs text-muted-foreground">{elements.length} items</span>
              </div>

              {elements.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  {elements.map((element, index) => (
                    <div
                      key={element.id}
                      className={`flex items-center justify-between px-3 py-2 text-sm hover:bg-muted cursor-pointer ${selectedElementId === element.id ? 'bg-muted' : ''
                        } ${index !== 0 ? 'border-t' : ''}`}
                      onClick={() => useCardStore.getState().selectElement(element.id)}
                    >
                      <div className="flex items-center gap-2">
                        {element.type === 'text' && <Type className="size-3.5" />}
                        {element.type === 'image' && <ImageIcon className="size-3.5" />}
                        {element.type === 'shape' && <LayoutGrid className="size-3.5" />}
                        <span className="truncate max-w-[130px]">
                          {element.type === 'text'
                            ? (element as CardElement & { text: string }).text.substring(0, 20) || 'Text'
                            : element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                        </span>
                      </div>
                      <Layers className="size-3.5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-sm border rounded-md">
                  <p>No elements added yet</p>
                  <p className="text-xs mt-1">Use the tools above to add elements</p>
                </div>
              )}
            </div>

            {/* Show element properties if an element is selected */}
            {selectedElementId && (
              <>
                <Separator />
                <ElementProperties />
              </>
            )}
          </CardContent>
        </Card>

        {/* Middle - Card Preview */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your card will look</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-4">
              {/* Card Preview Canvas */}
              <div className="w-full max-w-md aspect-[2/3] flex flex-col overflow-hidden">
                <CardCanvas />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t">
              <Button variant="outline" size="sm" onClick={handleDiscard}>
                <Trash className="mr-1 size-4" />
                {cardIdParam ? 'Discard Changes' : 'Delete'}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MoveHorizontal className="mr-1 size-4" />
                  Templates
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-1 size-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-1 size-4" />
                  Share
                </Button>
                <Button size="sm" onClick={handleSaveCard} disabled={isSaving}>
                  <Save className="mr-1 size-4" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CreateCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateCardPageContent />
    </Suspense>
  );
}