import {
  Users,
  Settings,
  Shield,
  Activity,
  Menu,
  House,
  Plus,
  Handshake,
  User2,
  ChevronUp,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";

import { useUser } from "@/lib/auth";
import { signOut } from "@/app/(login)/actions";

import { useRouter } from "next/navigation";

// Menu items.
const items = [
  { url: "/dashboard", icon: House, title: "Home" },
  { url: "/dashboard/bewerber", icon: Plus, title: "Bewerber" },
  { url: "/dashboard/mitglieder", icon: Users, title: "Mitglieder" },
  { url: "/dashboard/teams", icon: Handshake, title: "Teams" },
  { url: "/dashboard/general", icon: Settings, title: "General" },
  { url: "/dashboard/activity", icon: Activity, title: "Activity" },
  { url: "/dashboard/security", icon: Shield, title: "Security" },
];

export function AppSidebar() {
  const { user, setUser } = useUser();

  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push("/");
  }
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 700 700"
                width="50"
                height="50"
                className="dark:fill-white fill-black"
              >
                <title>e logo</title>
                <g id="Layer 1">
                  <path
                    id="Form 1"
                    fillRule="evenodd"
                    d="m138.6 208.3c0.2 3.4 0.4 98.7 0.4 98.7l305-196-76-50c0 0-229.2 147.5-229.4 147.3z"
                  />
                  <path
                    id="Form 2"
                    fillRule="evenodd"
                    d="m102 461l76 49 183-116-1-99z"
                  />
                  <path
                    id="Form 3"
                    fillRule="evenodd"
                    d="m280 575l75 51 222-145-1-98z"
                  />
                </g>
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                E-Sports Manager
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {user ? (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2 />
                      {user.name || user.email}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem>
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <form action={handleSignOut} className="w-full">
                      <button type="submit" className="flex w-full">
                        <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign out</span>
                        </DropdownMenuItem>
                      </button>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        ) : null}
      </Sidebar>
    </>
  );
}
