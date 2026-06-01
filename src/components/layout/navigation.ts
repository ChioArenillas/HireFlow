
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: Briefcase,
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