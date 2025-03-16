import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Send, Edit, Code, Share, Users, Github, Heart, Palette } from 'lucide-react';
import LoginPage from './login/page';

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
            <Link href="#features">Features</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#templates">Templates</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#support">Support</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="https://github.com/gratefulness-app/grace" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 size-4" />
              GitHub
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/app">
              Get Started
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-100 via-pink-200 to-pink-100 px-4 md:px-10 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Give thanks to someone</h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Create beautiful digital cards, share them with friends and followers, and express your gratitude — all for free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/app/create">
              Create a Card
              <Edit className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href="/app/templates">
              Explore Templates
              <Palette className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg p-8 md:p-10 text-white relative z-10 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Give thanks to someone</h2>
                <p className="mb-6">Show the people in your life how much they mean to you with a beautiful, personalized card.</p>
                <Button className="bg-white text-pink-500 hover:bg-white/90">Send this Card</Button>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-md h-64 w-48 transform rotate-6 absolute -right-4 top-4"></div>
                  <div className="bg-white rounded-lg shadow-md h-64 w-48 relative z-10"></div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Login Section (replacing How It Works) */}
      <LoginPage />

      {/* Templates Section */}
      <div id="templates" className="py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Beautiful Templates</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Start with one of our professionally designed templates or create your own from scratch.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template Examples - Based on Figma Design */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-pink-300 to-pink-400 p-6 text-white h-60 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Give thanks to someone</h3>
                  <p className="opacity-80">Express your gratitude</p>
                </div>
              </div>
              <div className="p-4 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Thank You</span>
                  <Button size="sm" variant="outline">Use Template</Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-blue-300 to-blue-400 p-6 text-white h-60 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Happy Birthday</h3>
                  <p className="opacity-80">Celebrate their special day</p>
                </div>
              </div>
              <div className="p-4 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Birthday</span>
                  <Button size="sm" variant="outline">Use Template</Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-purple-300 to-purple-400 p-6 text-white h-60 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Congratulations</h3>
                  <p className="opacity-80">Celebrate their achievement</p>
                </div>
              </div>
              <div className="p-4 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Celebration</span>
                  <Button size="sm" variant="outline">Use Template</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link href="/app/templates">
                Browse All Templates
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-muted py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 size-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-lg">S</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sarah K.</h3>
                  <p className="text-muted-foreground text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">&quot;Grace has completely transformed how I connect with my followers. The card templates are beautiful and my audience loves receiving personalized messages!&quot;</p>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500" />
                ))}
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 size-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-semibold">Mike T.</h3>
                  <p className="text-muted-foreground text-sm">Designer</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">&quot;As a designer, I appreciate the clean interface and the ability to customize every aspect of my cards. The template sharing feature is a game changer for the community.&quot;</p>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500" />
                ))}
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <div className="rounded-full bg-primary/10 size-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-lg">J</span>
                </div>
                <div>
                  <h3 className="font-semibold">Jamie L.</h3>
                  <p className="text-muted-foreground text-sm">Teacher</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">&quot;I use Grace to create cards for my students&apos; achievements. It&apos;s incredibly easy to use and the kids love receiving personalized recognition for their hard work.&quot;</p>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="support" className="py-16 px-4 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to create something beautiful?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of users creating and sharing meaningful digital cards.</p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/app">
              Get Started Now
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center bg-muted p-6 rounded-lg">
            <div className="flex-1 text-left">
              <h3 className="text-xl font-semibold mb-2">Support the Project</h3>
              <p className="text-muted-foreground mb-4">Grace is an open-source project maintained by volunteers. Your support helps us continue to improve and add new features.</p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/sponsors/gratefulness-app" target="_blank" rel="noopener noreferrer">
                <Heart className="mr-2 size-4 text-pink-500" />
                Become a Sponsor
              </Link>
            </Button>
          </div>
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
            <Link href="#features" className="hover:text-foreground">Features</Link>
            <Link href="#templates" className="hover:text-foreground">Templates</Link>
            <Link href="#" className="hover:text-foreground">API</Link>
            <Link href="https://github.com/gratefulness-app/grace" className="hover:text-foreground">GitHub</Link>
            <Link href="#support" className="hover:text-foreground">Support</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Grace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Star component for testimonials
function Star(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}