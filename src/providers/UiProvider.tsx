"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type ToastState = { icon: string; title: string; sub: string; show: boolean };
type Panel = "notif" | "profile" | null;

type UiContextValue = {
  toast: ToastState;
  showToast: (icon: string, title: string, sub?: string) => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  modalOpen: boolean;
  openModal: (tab?: "login" | "signup") => void;
  closeModal: () => void;
  authTab: "login" | "signup";
  setAuthTab: (t: "login" | "signup") => void;
  panel: Panel;
  openPanel: (p: "notif" | "profile") => void;
  closePanel: () => void;
  goPage: (href: string) => void;
};

const UiContext = createContext<UiContextValue | null>(null);

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}

export function UiProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({
    icon: "🐝",
    title: "",
    sub: "",
    show: false,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [panel, setPanel] = useState<Panel>(null);

  const showToast = useCallback((icon: string, title: string, sub = "") => {
    setToast({ icon, title, sub, show: true });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3200);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const closePanel = useCallback(() => setPanel(null), []);

  const goPage = useCallback(
    (href: string) => {
      setSearchOpen(false);
      setPanel(null);
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setModalOpen(false);
        setPanel(null);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<UiContextValue>(
    () => ({
      toast,
      showToast,
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch,
      modalOpen,
      openModal: (tab) => {
        if (tab) setAuthTab(tab);
        setModalOpen(true);
      },
      closeModal,
      authTab,
      setAuthTab,
      panel,
      openPanel: (p) => setPanel(p),
      closePanel,
      goPage,
    }),
    [
      toast,
      showToast,
      searchOpen,
      closeSearch,
      modalOpen,
      closeModal,
      authTab,
      panel,
      closePanel,
      goPage,
    ]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
