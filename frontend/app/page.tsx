import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Send, Edit, Code, Share, Users, Github, Heart, Palette } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b py-3 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="size-6 text-pink-500 fill-pink-500" />
          <span className="font-bold text-xl">Grace</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="#features" className="hover:text-foreground">Features</a>
          </Button>
          <Button variant="ghost" size="sm">
            <a href="/app/templates" className="hover:text-foreground">Templates</a>
          </Button>
          <Button variant="ghost" size="sm">Support</Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/gratefulness-app/grace">
              <span>
                GitHub
              </span>
              <Github className="mr-2 size-4" />
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="/app" className="hover:text-foreground">
              <span>
                Get Started
              </span>
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background to-background/50 px-4 md:px-10 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Create and share beautiful cards</h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Design custom digital cards, share them with friends and followers, and engage with your community — all for free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2" asChild>
            <a href="/app" className="hover:text-foreground">
              <span>
                Create a Card
              </span>
              <Edit className="size-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="/app/templates" className="hover:text-foreground">
              <span>
                Explore Templates
              </span>
              <Palette className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 px-4 md:px-10">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need to connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="size-5 text-primary" />
                Card Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Design beautiful custom cards with our easy-to-use interface. Works just like Canva or CardSnacks, but completely free.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="size-5 text-primary" />
                Share Instantly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Send your created cards to friends, groups, or followers unlimited times and watch them enjoy in real-time.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="size-5 text-primary" />
                Social Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Connect with Facebook, Instagram, Bluesky, GitHub and more to share your creations across platforms.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="size-5 text-primary" />
                Open Source Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Upload your card designs as templates for the community through your GitHub account. Create, share, and inspire.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5 text-primary" />
                Content Creator Friendly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Exposable QR codes make it easy for followers to connect with you and enjoy your card creations.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="size-5 text-primary" />
                Support the Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Support Grace and its developers through in-app sponsorships or GitHub sponsors to help maintain and grow the platform.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted py-16 px-4 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to create something beautiful?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of users creating and sharing meaningful digital cards.</p>
          <Button size="lg" className="gap-2">
            Get Started Now
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 px-4 md:px-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="size-5 text-pink-500 fill-pink-500" />
            <span className="font-medium">Grace</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="/app/templates" className="hover:text-foreground">Templates</a>
            <a href="#" className="hover:text-foreground">API</a>
            <a href="https://github.com/gratefulness-app/grace" className="hover:text-foreground">GitHub</a>
            <a href="https://github.com/gratefulness-app/grace" className="hover:text-foreground">Support</a>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Grace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}