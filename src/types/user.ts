export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastSeen?: string;
  bio?: string;
  createdAt: string;
}
