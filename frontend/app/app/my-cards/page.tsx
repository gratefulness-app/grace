import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Filter, Edit, Share, Copy,
  Calendar, Eye, ArrowUpDown, Plus, MoreHorizontal
} from 'lucide-react';

// Sample card component
function CardItem({
  title,
  createdAt,
  views,
  color,
  id
}: {
  title: string,
  createdAt: string,
  views: number,
  color: string,
  id: number
}) {
  return (
    <Card id={id.toString()} className="hover:shadow-md transition-shadow p-0 w-[250px]">
      <CardHeader className="relative p-0 h-48 overflow-hidden rounded-t-xl">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: color }}
        >
          <div className="text-white text-center p-6">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
          </div>
        </div>
      </CardHeader>
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
          <Button variant="ghost" size="sm">
            <Share className="size-3.5 mr-1" />
            Share
          </Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="size-8">
              <Edit className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Copy className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyCardsPage() {
  // Sample data for my cards
  const myCards = [
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
    },
    {
      id: 7,
      title: "Thank You Card",
      createdAt: "March 10, 2025",
      views: 24,
      color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
    },
    {
      id: 8,
      title: "Birthday Wishes for Mom",
      createdAt: "March 5, 2025",
      views: 12,
      color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Cards</h1>
          <p className="text-muted-foreground">Manage and share your created cards</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/app/create">
              <Plus className="mr-1 size-4" />
              Create Card
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/40 rounded-lg">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search cards"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-1 size-4" />
            Date
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="mr-1 size-4" />
            Views
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-1 size-4" />
            Sort
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-1 size-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-fit">
        {myCards.map((card) => (
          <CardItem
            key={card.id}
            id={card.id}
            title={card.title}
            createdAt={card.createdAt}
            views={card.views}
            color={card.color}
          />
        ))}
      </div>

      {/* Empty state - uncomment to show when no cards exist */}
      {/* 
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Heart className="size-8 text-muted-foreground/60" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No cards yet</h2>
        <p className="text-muted-foreground max-w-sm mb-6">
          Start creating beautiful cards to share with your friends, family, and followers.
        </p>
        <Button asChild>
          <Link href="/app/create">
            <Plus className="mr-1 size-4" />
            Create Your First Card
          </Link>
        </Button>
      </div>
      */}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-muted-foreground">
          Showing <strong>6</strong> of <strong>6</strong> cards
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
    </div>
  );
}