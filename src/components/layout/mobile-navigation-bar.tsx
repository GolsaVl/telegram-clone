import { Link, useLocation } from "react-router-dom";
import { MessageCircle, User, Settings } from "lucide-react";
import { cn } from "../../lib/utils";
import { useChatStore } from "../../store/chat-store";
import { useMemo } from "react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  activeMatcher?: (pathname: string) => boolean;
  badgeCount?: () => number;
}

const MobileNavigationBar = () => {
  const location = useLocation();
  const { chats } = useChatStore();

  const unreadCount = useMemo(() => {
    return chats
      .filter((chat) => !chat.isArchived)
      .reduce((sum, chat) => sum + chat.unreadCount, 0);
  }, [chats]);

  const navItems: NavItem[] = [
    {
      path: "/chats",
      label: "Chats",
      icon: MessageCircle,
      activeMatcher: (pathname) => pathname.startsWith("/chats"),
      badgeCount: () => unreadCount,
    },
    {
      path: "/profile",
      label: "Profile",
      icon: User,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="glass-effect md:hidden fixed bottom-0 left-0 right-0 z-50 h-16">
      <div className="mx-auto flex h-full max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = item.activeMatcher
            ? item.activeMatcher(location.pathname)
            : location.pathname === item.path;
          const badge = item.badgeCount ? item.badgeCount() : 0;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center space-y-1 rounded-[var(--radius-sm)] p-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--primary)]",
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
              {badge > 0 && (
                <span className="absolute top-0 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--destructive)] text-[10px] font-bold text-[var(--destructive-foreground)]">
                  {badge > 9 ? "9+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigationBar;
