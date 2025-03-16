import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Clock, Star, Users, Eye, ArrowRight, Heart, Plus } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/app/create">
            <Plus className="mr-2 size-4" />
            Create Card
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Cards</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 cards created this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Card Views</CardTitle>
            <Eye className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">642</div>
            <p className="text-xs text-muted-foreground">
              +28% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Followers and friends
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Recent Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="relative h-40 p-0 overflow-hidden rounded-t-xl border-b">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center">
                <Heart className="size-16 text-white/70" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-medium mb-1">Thank You Card</h3>
              <p className="text-sm text-muted-foreground mb-3">Created 3 days ago</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">42 views</div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/app/cards/${i}`}>
                    <span>Edit</span>
                    <Edit className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Popular Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="relative h-40 p-0 overflow-hidden rounded-t-xl border-b">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center">
                <Star className="size-16 text-white/70" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-medium mb-1">Birthday Template {i + 1}</h3>
              <p className="text-sm text-muted-foreground mb-3">By Community</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="size-4 text-amber-400 fill-amber-400 mr-1" />
                  <span className="text-sm text-muted-foreground">{4.5 - i * 0.2}/5</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/app/templates/${i}`}>
                    <span>Use</span>
                    <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 mt-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Share the love</h2>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          Invite your friends and followers to join Grace and share beautiful cards with each other.
        </p>
        <Button variant="outline">
          <Users className="mr-2 size-4" />
          Invite Friends
        </Button>
      </div>
    </div>
  );
}