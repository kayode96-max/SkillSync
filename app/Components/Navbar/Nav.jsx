"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import dynamic from "next/dynamic";
const Darkmode = dynamic(() => import("../Darkmode/page.jsx"), { ssr: false });
import { AcmeLogo } from "./Logo.jsx";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

      <NavbarContent className="hidden sm:flex gap-4 ml-80">
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
      <NavbarContent className="ml-40" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/Login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6 mr-6" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Darkmode />
        </NavbarItem>
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
