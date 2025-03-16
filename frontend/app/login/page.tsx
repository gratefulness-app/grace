import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Github, Heart } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Heart className="size-8 text-pink-500 fill-pink-500" />
            </div>
            <CardTitle className="text-2xl font-semibold text-center">Login to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input id="email" placeholder="m@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="w-full" type="button">
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                Github
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <svg
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Right side - Sliding Cards from Figma Design */}
      <div className="md:w-1/2 bg-gradient-to-b from-pink-300 to-pink-400 hidden md:flex flex-col">
        {/* Top row of cards */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-xl">
            {/* Card design based on your Figma */}
            <div className="bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg p-6 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Give thanks to someone</h2>
              <p className="mb-4">Show the people in your life how much they mean to you with a beautiful, personalized card.</p>
              <div className="mt-4 flex justify-end">
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-md h-32 w-24 transform rotate-6 absolute -right-2 top-2"></div>
                  <div className="bg-white rounded-lg shadow-md h-32 w-24 relative z-10"></div>
                </div>
              </div>
            </div>
            {/* Card indicators */}
            <div className="flex justify-center mt-8 gap-1">
              <div className="h-2 w-8 rounded-full bg-white opacity-100"></div>
              <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
              <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Bottom attribution */}
        <div className="p-6 text-white text-center">
          <p className="text-sm opacity-80">Made with ❤️ by Grace. Create beautiful digital cards for free.</p>
        </div>
      </div>
    </div>
  );
}