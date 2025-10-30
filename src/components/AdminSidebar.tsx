import { Home, Calendar, Users, CreditCard, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Attendees", href: "/admin/attendees", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-muted border-r">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold">Global Haltech</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
