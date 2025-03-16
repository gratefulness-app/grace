import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Heart,
  Home,
  Plus,
  Settings,
  Layout,
  Users,
  PencilRuler,
  User,
  LogOut,
  Search,
  Bell,
  Github,
  Star
} from 'lucide-react';
import Footer from '../../components/common/footer';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-screen bg-background">
        {/* Top app bar for mobile */}
        <header className="border-b flex items-center gap-3 p-3 md:hidden">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2">
            <Heart className="size-5 text-pink-500 fill-pink-500" />
            <span className="font-bold">Grace</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="size-5" />
            </Button>
          </div>
        </header>

        {/* Main container with sidebar */}
        <div className="flex">
          <Sidebar>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 px-2 h-12">
                <Heart className="size-6 text-pink-500 fill-pink-500" />
                <span className="font-bold text-lg">Grace</span>
              </Link>
              <div className="flex items-center gap-2">
                <Input placeholder="Search..." className="flex-1" />
                <Button variant="ghost" size="icon">
                  <Search className="size-4" />
                </Button>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Home" asChild>
                    <a href="/app">
                      <Home className="size-4" />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="My Cards" asChild>
                    <a href="/app/my-cards">
                      <Layout className="size-4" />
                      <span>My Cards</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Create New" asChild>
                    <a href="/app/create">
                      <Plus className="size-4" />
                      <span>Create New</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Templates" asChild>
                    <a href="/app/templates">
                      <PencilRuler className="size-4" />
                      <span>Templates</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Community" asChild>
                    <a href="/app/community">
                      <Users className="size-4" />
                      <span>Community</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarSeparator />

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="GitHub" asChild>
                    <a href="https://github.com/gratefulness-app/grace" target="_blank" rel="noopener noreferrer">
                      <Github className="size-4" />
                      <span>GitHub</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Support Us" asChild>
                    <a href="/app/sponsor">
                      <Star className="size-4" />
                      <span>Support Us</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings" asChild>
                    <a href="/app/settings">
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">User Name</span>
                    <span className="text-xs text-muted-foreground">@username</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <a href="/auth/logout">
                    <LogOut className="size-4" />
                  </a>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main content area */}
          <SidebarInset className="block">
            {/* Hidden on mobile as we have the top bar instead */}
            <header className="hidden md:flex h-16 border-b items-center justify-between px-6">
              <h1 className="text-xl font-semibold">Grace</h1>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Bell className="size-5" />
                </Button>
                <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="size-5" />
                </div>
              </div>
            </header>

            {/* Main content */}
            <main className="p-6">
              {children}
            </main>

            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}