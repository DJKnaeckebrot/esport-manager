"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";

import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">

    // </div>
    <SidebarProvider>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}

// Mobile header
//       <div className="lg:hidden flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
//         <div className="flex items-center">
//           <span className="font-medium">Settings</span>
//         </div>
//         <Button
//           className="-mr-3"
//           variant="ghost"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <Menu className="h-6 w-6" />
//           <span className="sr-only">Toggle sidebar</span>
//         </Button>
//       </div>

//       <div className="flex flex-1 overflow-hidden h-full">
//         {/* Sidebar */}
//         <aside
//           className={`w-64 bg-card border-r border-gray-200 dark:border-gray-700 lg:block ${
//             isSidebarOpen ? "block" : "hidden"
//           } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <nav className="h-full overflow-y-auto p-4">
//             {navItems.map((item) => (
//               <Link key={item.href} href={item.href} passHref>
//                 <Button
//                   variant={pathname === item.href ? "secondary" : "ghost"}
//                   className={`my-1 w-full justify-start ${
//                     pathname === item.href ? "bg-gray-100 dark:bg-gray-700" : ""
//                   }`}
//                   onClick={() => setIsSidebarOpen(false)}
//                 >
//                   <item.icon className="mr-2 h-4 w-4" />
//                   {item.label}
//                 </Button>
//               </Link>
//             ))}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>
//       </div>
