import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, Heart, Gift, Calendar, Award, Cake, ThumbsUp, ArrowRight, Plus } from 'lucide-react';

// Template category item component
function CategoryItem({ icon: Icon, name, count, active = false }: {
  icon: React.ElementType,
  name: string,
  count: number,
  active?: boolean
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className="w-full justify-start h-auto py-2 px-3"
    >
      <Icon className="mr-2 size-4" />
      <span className="mr-auto">{name}</span>
      <span className="text-xs rounded-full bg-muted px-2 py-0.5">{count}</span>
    </Button>
  );
}

// Template card component
function TemplateCard({ title, category, author, rating, color }: {
  title: string,
  category: string,
  author: string,
  rating: number,
  color: string
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow p-0">
      <CardHeader className="p-0">
        <div
          className="h-40 flex items-center justify-center"
          style={{ background: color }}
        >
          <div className="p-6 max-w-xs text-white text-center">
            <div className="text-lg font-semibold mb-2">{title}</div>
            <div className="text-sm opacity-90">{category}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{author}</span>
          <div className="flex items-center">
            <Star className="size-3.5 text-amber-400 fill-amber-400 mr-1" />
            <span className="text-xs">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm">
            <Heart className="size-3.5 mr-1" />
            Save
          </Button>
          <Button size="sm" asChild>
            <Link href={`/app/create?template=${encodeURIComponent(title.replace(/ /g, '_'))}`}>
              Use
              <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TemplatesPage() {
  // Sample template data
  const templates = [
    {
      title: "Thank You Card",
      category: "Gratitude",
      author: "Grace Team",
      rating: 4.8,
      color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
    },
    {
      title: "Birthday Wishes",
      category: "Celebration",
      author: "Community",
      rating: 4.7,
      color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    {
      title: "Congratulations",
      category: "Achievement",
      author: "Design Team",
      rating: 4.5,
      color: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)"
    },
    {
      title: "Get Well Soon",
      category: "Support",
      author: "Grace Team",
      rating: 4.6,
      color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
    },
    {
      title: "Wedding Anniversary",
      category: "Celebration",
      author: "Community",
      rating: 4.9,
      color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
    },
    {
      title: "Job Promotion",
      category: "Achievement",
      author: "Design Team",
      rating: 4.4,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Season's Greetings",
      category: "Holiday",
      author: "Grace Team",
      rating: 4.7,
      color: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"
    },
    {
      title: "Thinking of You",
      category: "Support",
      author: "Community",
      rating: 4.5,
      color: "linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)"
    }
  ];

  const categories = [
    { icon: Heart, name: "All Templates", count: 108, active: true },
    { icon: Gift, name: "Gratitude", count: 24 },
    { icon: Cake, name: "Celebration", count: 32 },
    { icon: Award, name: "Achievement", count: 18 },
    { icon: ThumbsUp, name: "Support", count: 14 },
    { icon: Calendar, name: "Holiday", count: 20 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Card Templates</h1>
          <p className="text-muted-foreground">Start with a template or create your own</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search templates"
              className="pl-9 w-full sm:w-[250px]"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-1 size-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar - Categories */}
        <div className="space-y-6 md:sticky md:top-6 md:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse by template type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <CategoryItem
                  key={category.name}
                  icon={category.icon}
                  name={category.name}
                  count={category.count}
                  active={category.active}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
              <CardDescription>Find templates by tag</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {["Love", "Thanks", "Birthday", "Congrats", "Holiday", "Work", "Anniversary", "Invite", "Special", "Friendship"].map((tag) => (
                  <Button key={tag} variant="outline" size="sm" className="text-xs">
                    {tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Template</CardTitle>
              <CardDescription>Share your designs with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Plus className="mr-1 size-4" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main content - Template grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <TemplateCard
                key={index}
                title={template.title}
                category={template.category}
                author={template.author}
                rating={template.rating}
                color={template.color}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>

          {/* CTA at bottom */}
          <Card className="mt-8 bg-muted/40">
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Create Your Own Template</h3>
                <p className="text-muted-foreground">
                  Design and share your own templates with the Grace community
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/app/create">
                  Start Creating
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}