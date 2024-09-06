"use client";

import React, {useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import Logout from "../../Login/Logout.jsx";
import Image from "next/image";

const Darkmode = dynamic(() => import("../Darkmode/page.jsx"), { ssr: false });
import { AcmeLogo } from "./Logo.jsx";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession(); 
  const loading = status === "loading";


  const username = session?.user?.username;
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="flex justify-between bg-slate-200 dark:bg-cyan-700 h-14"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="ml-6">
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="/">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/Customer">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Integrations">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6 ml-40" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Darkmode />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="mr-6" justify="end">
        {!session ? (
          <NavbarItem className="hidden lg:flex">
            <Link href="/Login">Login</Link>
          </NavbarItem>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={username || "User"}
                size="sm"
                src={session.user.image || "/default-avatar.png"} 
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{username || "User"}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
              
              >
              <Logout/>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>


      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
