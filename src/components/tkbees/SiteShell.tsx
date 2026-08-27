"use client";

import { usePathname } from "next/navigation";
import { PromoTicker } from "./PromoTicker";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SearchOverlay, NotificationPanel, ProfilePanel, AuthModal, Toast } from "./Overlays";
import { Chatbot } from "./Chatbot";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <Toast />
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <PromoTicker />
      <SiteHeader />
      <SearchOverlay />
      <NotificationPanel />
      <ProfilePanel />
      <AuthModal />
      <Toast />
      <main>{children}</main>
      <SiteFooter />
      <Chatbot />
    </>
  );
}
