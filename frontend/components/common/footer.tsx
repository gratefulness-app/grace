'use client';

import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8 px-4 md:px-10 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="size-5 text-pink-500 fill-pink-500" />
          <span className="font-medium">Grace</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/#templates" className="hover:text-foreground">Templates</Link>
          <Link href="https://github.com/gratefulness-app/grace" target="_blank" className="hover:text-foreground">GitHub</Link>
          <Link href="/#support" className="hover:text-foreground">Support</Link>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Grace. All rights reserved.
        </div>
      </div>
    </footer>
  )
}