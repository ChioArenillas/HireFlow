
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Bookmark,
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    label: "Saved Jobs",
    href: "/saved-jobs",
    icon: Bookmark,
  },
  {
    label: "Resume Analyzer",
    href: "/resume",
    icon: FileText,
  },
  {
    label: "Interview Coach",
    href: "/interview",
    icon: MessageSquare,
  },
];