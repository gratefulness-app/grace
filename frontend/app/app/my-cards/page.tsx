'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import {
  Search, Filter, Edit, Share, Copy,
  Calendar, Eye, Plus, MoreHorizontal, Inbox, Pencil, SortAsc, Trash
} from 'lucide-react';
import {
  useCardStore,
  CardData
} from '@/lib/stores/card-store';

// Format date for display
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString;
  }
};

// Example card item component with original interface
function ExampleCardItem({
  title,
  createdAt,
  views,
  color,
  id,
  sender = undefined
}: {
  title: string,
  createdAt: string,
  views: number,
  color: string,
  id: number | string,
  sender?: string
}) {
  return (
    <Card className="p-0 overflow-hidden" data-id={id}>
      <div
        className="h-[180px] flex items-center justify-center text-white text-center rounded-t-xl"
        style={{ background: color }}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          {sender && (
            <p className="text-sm text-white/80">From: {sender}</p>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="size-3.5 mr-1" />
            <span>{createdAt}</span>
          </div>
          <div className="flex items-center">
            <Eye className="size-3.5 mr-1" />
            <span>{views}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Share className="size-4 mr-1" />
            Share
          </Button>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="size-8 p-0 h-auto">
              <Edit className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 p-0 h-auto">
              <Copy className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 p-0 h-auto">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Saved card item component with cookie data
function SavedCardItem({
  card,
  onEdit,
  onDelete,
  onDuplicate,
  sender = undefined
}: {
  card: CardData,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
  onDuplicate: (id: string) => void,
  sender?: string
}) {
  return (
    <Card className="p-0 overflow-hidden" data-id={card.id}>
      <div
        className="h-[180px] flex items-center justify-center text-white text-center rounded-t-xl"
        style={{ background: card.backgroundColor }}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2">{card.title}</h3>
          {sender && (
            <p className="text-sm text-white/80">From: {sender}</p>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="size-3.5 mr-1" />
            <span>{formatDate(card.updatedAt)}</span>
          </div>
          <div className="flex items-center">
            <Eye className="size-3.5 mr-1" />
            <span>{card.views}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <Share className="size-4 mr-1" />
            Share
          </Button>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 p-0 h-auto"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(card.id);
              }}
            >
              <Edit className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 p-0 h-auto"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(card.id);
              }}
            >
              <Copy className="size-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 p-0 h-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash className="size-4 text-destructive/80" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Card</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &rdquo;{card.title}&rdquo;? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(card.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Empty state component
function EmptyState({ type, action }: { type: string, action: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        {type === 'created' ? (
          <Pencil className="size-8 text-muted-foreground/60" />
        ) : (
          <Inbox className="size-8 text-muted-foreground/60" />
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {type === 'created' ? 'No cards created yet' : 'No cards received yet'}
      </h2>
      <p className="text-muted-foreground max-w-sm mb-6">
        {type === 'created'
          ? 'Start creating beautiful cards to share with your friends, family, and followers.'
          : 'Cards that others send to you will appear here.'}
      </p>
      {action}
    </div>
  );
}

export default function MyCardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('created');
  const [searchTerm, setSearchTerm] = useState('');

  // Use the card store to manage cookie-saved cards
  const {
    savedCards,
    loadAllCards,
    deleteCard,
    loadCard,
    saveCard,
  } = useCardStore();

  // Load cards from cookies on page load
  useEffect(() => {
    loadAllCards();
  }, [loadAllCards]);

  // Filter cards based on search term
  const filteredCookieCards = savedCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle editing a card
  const handleEditCard = (cardId: string) => {
    router.push(`/app/create?id=${cardId}`);
  };

  // Handle duplicating a card
  const handleDuplicateCard = (cardId: string) => {
    // First load the card to duplicate
    loadCard(cardId);

    // Get current card data
    const currentCard = useCardStore.getState();

    // Change title and ID to make it a new card
    useCardStore.getState().setTitle(`${currentCard.title} (Copy)`);
    useCardStore.getState().id = ''; // Clear ID to generate a new one

    // Save as a new card
    const newCardId = saveCard();

    toast.success("Card duplicated successfully!");

    // Navigate to the new card
    router.push(`/app/create?id=${newCardId}`);
  };

  // Handle deleting a card
  const handleDeleteCard = (cardId: string) => {
    try {
      deleteCard(cardId);
      toast.success("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card. Please try again.");
    }
  };

  // Sample data for example cards (from original design)
  const exampleCards = [
    {
      id: 1,
      title: "Thank You Card",
      createdAt: "March 10, 2025",
      views: 24,
      color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
    },
    {
      id: 2,
      title: "Birthday Wishes for Mom",
      createdAt: "March 5, 2025",
      views: 12,
      color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    {
      id: 3,
      title: "Congratulations on Promotion",
      createdAt: "February 28, 2025",
      views: 36,
      color: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
    },
    {
      id: 4,
      title: "Anniversary Card",
      createdAt: "February 20, 2025",
      views: 8,
      color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
    },
    {
      id: 5,
      title: "Get Well Soon",
      createdAt: "February 15, 2025",
      views: 16,
      color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
    },
    {
      id: 6,
      title: "Thinking of You",
      createdAt: "February 10, 2025",
      views: 20,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
  ];

  // Filter example cards based on search term
  const filteredExampleCards = exampleCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample data for received cards
  const receivedCards = [
    {
      id: 101,
      title: "Happy Birthday!",
      createdAt: "March 15, 2025",
      views: 1,
      color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      sender: "Sarah Johnson"
    },
    {
      id: 102,
      title: "Thank You for Your Help",
      createdAt: "March 8, 2025",
      views: 1,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      sender: "Mark Wilson"
    },
    {
      id: 103,
      title: "Congrats on Your New Role",
      createdAt: "March 1, 2025",
      views: 1,
      color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      sender: "Team at Acme Inc."
    }
  ];

  // Filter received cards based on search term
  const filteredReceivedCards = receivedCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Combine cookie-saved cards with example cards
  const allCreatedCards = [...filteredCookieCards, ...filteredExampleCards];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Cards</h1>
          <p className="text-muted-foreground">Manage and share your created cards</p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/app/create">
            <Plus className="size-4" />
            Create Card
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="created" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="created">My Created Cards</TabsTrigger>
          <TabsTrigger value="received">Received Cards</TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[350px]">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search cards"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="size-4" />
              Date
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Eye className="size-4" />
              Views
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <SortAsc className="size-4" />
              Sort
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="size-4" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="created" className="mt-0">
          {allCreatedCards.length > 0 ? (
            <>
              {/* Section for cookie-saved cards if any exist */}
              {filteredCookieCards.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Your Saved Cards</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {filteredCookieCards.map((card) => (
                      <SavedCardItem
                        key={card.id}
                        card={card}
                        onEdit={handleEditCard}
                        onDelete={handleDeleteCard}
                        onDuplicate={handleDuplicateCard}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Section for example cards */}
              {filteredExampleCards.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Example Cards</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {filteredExampleCards.map((card) => (
                      <ExampleCardItem
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        createdAt={card.createdAt}
                        views={card.views}
                        color={card.color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              type="created"
              action={
                <Button asChild>
                  <Link href="/app/create">
                    <Plus className="mr-1 size-4" />
                    Create Your First Card
                  </Link>
                </Button>
              }
            />
          )}

          {allCreatedCards.length > 0 && (
            <div className="flex justify-between mt-8 text-sm">
              <div className="text-muted-foreground">
                {searchTerm
                  ? `Found ${allCreatedCards.length} cards matching "${searchTerm}"`
                  : `Showing ${allCreatedCards.length} cards`}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled={true}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="received" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredReceivedCards.map((card) => (
              <ExampleCardItem
                key={card.id}
                id={card.id}
                title={card.title}
                createdAt={card.createdAt}
                views={card.views}
                color={card.color}
                sender={card.sender}
              />
            ))}
          </div>

          {filteredReceivedCards.length > 0 ? (
            <div className="flex justify-between mt-8 text-sm">
              <div className="text-muted-foreground">
                Showing {filteredReceivedCards.length} of {receivedCards.length} cards
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <EmptyState
              type="received"
              action={
                <Button variant="outline">
                  <Share className="mr-1 size-4" />
                  Share Your Profile
                </Button>
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}