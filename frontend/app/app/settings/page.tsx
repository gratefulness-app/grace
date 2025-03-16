'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Moon,
  Sun,
  Github,
  Info,
  LogOut,
  Mail,
  Shield,
  Trash
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and app settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar - Categories */}
        <div>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Settings</CardTitle>
              <CardDescription>Configure your Grace experience</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 p-0">
              <Button variant="ghost" className="justify-start rounded-none border-l-2 border-primary h-auto py-2 px-6">
                <User className="mr-2 size-4" />
                <span>Account</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6">
                <Bell className="mr-2 size-4" />
                <span>Notifications</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6">
                <Lock className="mr-2 size-4" />
                <span>Privacy</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6">
                <Palette className="mr-2 size-4" />
                <span>Appearance</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6">
                <Globe className="mr-2 size-4" />
                <span>Integrations</span>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6">
                <Shield className="mr-2 size-4" />
                <span>Security</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Support</CardTitle>
              <CardDescription>Get help and contribute</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 p-0">
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6" asChild>
                <Link href="https://github.com/gratefulness-app/grace" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 size-4" />
                  <span>GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6">
                <Info className="mr-2 size-4" />
                <span>About</span>
              </Button>
              <Separator className="my-1" />
              <Button variant="ghost" className="justify-start rounded-none h-auto py-2 px-6 text-destructive hover:text-destructive" asChild>
                <Link href="/auth/logout">
                  <LogOut className="mr-2 size-4" />
                  <span>Log Out</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main content - Settings */}
        <div className="md:col-span-2">
          {/* Account Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="size-8 text-muted-foreground/60" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground mb-2">This will be displayed on your profile and cards</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Upload Image</Button>
                    <Button size="sm" variant="outline">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">Full Name</label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="username">Username</label>
                  <Input id="username" placeholder="Your username" defaultValue="johndoe" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="email">Email Address</label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    className="flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about yourself"
                    defaultValue="Creating and sharing beautiful cards with friends and family."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          {/* Appearance Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Grace looks on your device</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-4">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`flex flex-col items-center gap-1 cursor-pointer ${theme === 'light' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setTheme('light')}
                    >
                      <div className="size-16 bg-white border rounded-full flex items-center justify-center mb-1">
                        <Sun className="size-6 text-amber-500" />
                      </div>
                      <span className="text-sm">Light</span>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-1 cursor-pointer ${theme === 'dark' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="size-16 bg-slate-800 border rounded-full flex items-center justify-center mb-1">
                        <Moon className="size-6 text-blue-400" />
                      </div>
                      <span className="text-sm">Dark</span>
                    </div>
                    <div
                      className={`flex flex-col items-center gap-1 cursor-pointer ${theme === 'system' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                      onClick={() => setTheme('system')}
                    >
                      <div className="size-16 bg-gradient-to-r from-white to-slate-800 border rounded-full flex items-center justify-center mb-1">
                        <div className="flex">
                          <Sun className="size-5 text-amber-500" />
                          <Moon className="size-5 text-blue-400 -ml-1" />
                        </div>
                      </div>
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-3">Card Default Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer bg-muted/20">
                      <div className="h-20 w-full rounded-md bg-gradient-to-r from-pink-200 to-pink-300 mb-2" />
                      <span className="text-sm">Colorful</span>
                    </div>
                    <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer">
                      <div className="h-20 w-full rounded-md bg-white border border-gray-200 mb-2" />
                      <span className="text-sm">Minimal</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage when and how you get notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get emails about card interactions</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="size-4 mr-2" id="email-notifications" defaultChecked />
                  <label htmlFor="email-notifications" className="text-sm">Enabled</label>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get alerts on your device</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="size-4 mr-2" id="push-notifications" defaultChecked />
                  <label htmlFor="push-notifications" className="text-sm">Enabled</label>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Card View Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get notified when someone views your card</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="size-4 mr-2" id="view-notifications" />
                  <label htmlFor="view-notifications" className="text-sm">Enabled</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Control your data and sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Card Visibility</h3>
                  <p className="text-sm text-muted-foreground">Control who can see your created cards</p>
                </div>
                <select className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Public</option>
                  <option>Followers Only</option>
                  <option>Private</option>
                </select>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Card Analytics</h3>
                  <p className="text-sm text-muted-foreground">Collect data on card views and interactions</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="size-4 mr-2" id="analytics" defaultChecked />
                  <label htmlFor="analytics" className="text-sm">Enabled</label>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Profile Discoverability</h3>
                  <p className="text-sm text-muted-foreground">Allow others to find you in Grace</p>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="size-4 mr-2" id="discoverability" defaultChecked />
                  <label htmlFor="discoverability" className="text-sm">Enabled</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button size="sm">Enable</Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                </div>
                <Button variant="outline" size="sm">View Sessions</Button>
              </div>
            </CardContent>
          </Card>

          {/* Data & Export */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Control your account data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Export Your Data</h3>
                  <p className="text-sm text-muted-foreground">Download all your cards and account information</p>
                </div>
                <Button variant="outline" size="sm">
                  <Mail className="size-4 mr-2" />
                  Export Data
                </Button>
              </div>

              <Separator />

              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">Once deleted, all your data will be permanently removed</p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash className="size-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}