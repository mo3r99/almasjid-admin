"use client";

import {
  CirclePoundSterling,
  HomeIcon,
  LucideIcon,
  SchoolIcon,
  SettingsIcon,
  UserCheck,
  UsersRound,
  UserStar,
} from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type Icons = "home" | "attendance" | "students" | "fees" | "teachers" | "classes" | "admin";

export default function NavMenuItem({ icon }: { icon: Icons }) {
  const pathname = usePathname();

  let iconElement: ReactElement<LucideIcon>, iconText: string;
  let active = pathname.substring(1).includes(icon);

  switch (icon) {
    case "home":
      active = pathname == "/";
      iconElement = <HomeIcon strokeWidth={active ? 2 : 1.5}/>;
      iconText = "Home";
      break;
    case "attendance":
      iconElement = <UserCheck strokeWidth={active ? 2 : 1.5} />;
      iconText = "Attendance";
      break;
    case "students":
      iconElement = <UsersRound strokeWidth={active ? 2 : 1.5} />;
      iconText = "Students";
      break;
    case "fees":
      iconElement = <CirclePoundSterling strokeWidth={active ? 2 : 1.5} />;
      iconText = "Fees";
      break;
    case "teachers":
      iconElement = <UserStar strokeWidth={active ? 2 : 1.5} />;
      iconText = "Teachers";
      break;
    case "classes":
      iconElement = <SchoolIcon strokeWidth={active ? 2 : 1.5} />;
      iconText = "Classes";
      break;
    case "admin":
      iconElement = <SettingsIcon strokeWidth={active ? 2 : 1.5} />;
      iconText = "Admin";
      break;
  }

  return (
    <li
      className={`flex flex-col items-center justify-center gap-1 ${
        active ? "text-black" : "text-gray-500"
      }`}
    >
      <Link href={icon == 'home' ? '/' : `/${icon}`} className="flex flex-col items-center justify-center">
        {iconElement}
        <span className={`text-xs ${active ? "text-black font-medium" : "text-gray-500"}`}>
          {iconText}
        </span>
      </Link>
    </li>
  );
}
