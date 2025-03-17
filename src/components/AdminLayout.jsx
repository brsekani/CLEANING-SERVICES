import React from "react";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

import RejectModal from "../modals/RejectModal";
import AcceptModal from "../modals/AcceptModal";
import { AdminProvider } from "../context/AdminContext";

export function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AdminProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Link
              to="/admin/dashboard"
              className="text-2xl font-bold text-[#11365C]"
            >
              DUCKLAND ADMIN
            </Link>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <AdminSidebar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
          {/* Modals */}
          <RejectModal />
          <AcceptModal />
        </AppShell.Main>
      </AppShell>
    </AdminProvider>
  );
}
