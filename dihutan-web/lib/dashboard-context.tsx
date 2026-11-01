"use client";

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useCallback,
  useEffect,
} from "react";
import { UserRole, CommunityReport, initialReportsData } from "./dashboard-data";
import { createClient } from "./supabase/client";

export interface ActiveUserProfile {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  region?: string;
}

interface DashboardContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userProfile: ActiveUserProfile;
  updateUserProfile: (profile: Partial<ActiveUserProfile>) => void;
  logout: () => Promise<void>;
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  reports: CommunityReport[];
  isLoadingReports: boolean;
  refreshReports: () => Promise<void>;
  addReport: (
    report: Omit<CommunityReport, "id" | "status" | "createdAt" | "updatedAt">
  ) => Promise<boolean>;
  updateReportStatus: (
    reportId: string,
    status: CommunityReport["status"],
    notes?: string
  ) => Promise<boolean>;
  canManageContent: boolean;
  canVerifyReports: boolean;
  canTriggerAlertResponse: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// External store subscription for zero hydration mismatch
const storageListeners = new Set<() => void>();
const notifyStorageListeners = () => storageListeners.forEach((l) => l());

const subscribeToStorage = (callback: () => void) => {
  storageListeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
  }
  return () => {
    storageListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", callback);
    }
  };
};

const getRoleSnapshot = (): UserRole => {
  if (typeof window === "undefined") return "USER";
  try {
    const val = localStorage.getItem("dihutan_active_role") as UserRole | null;
    if (val && ["USER", "ADMIN", "PIHAK_BERTANGGUNG_JAWAB"].includes(val)) {
      return val;
    }
  } catch {
    // Ignore
  }
  return "USER";
};

const getServerRoleSnapshot = (): UserRole => "USER";

const defaultUserProfile: ActiveUserProfile = {
  name: "Ardi Rahman",
  email: "ardi.rahman@dihutan.id",
  role: "USER",
  phone: "0812-3456-7890",
  region: "Pontianak & DAS Kapuas (Kalimantan Barat)",
};

const getUserProfileSnapshot = (): string => {
  if (typeof window === "undefined") return JSON.stringify(defaultUserProfile);
  try {
    const raw = localStorage.getItem("dihutan_user_profile");
    if (raw) return raw;
  } catch {
    // Ignore
  }
  return JSON.stringify(defaultUserProfile);
};

const getServerUserProfileSnapshot = (): string => JSON.stringify(defaultUserProfile);

const getBookmarksSnapshot = (): string => {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem("dihutan_bookmarks") || "[]";
  } catch {
    return "[]";
  }
};

const getServerBookmarksSnapshot = (): string => "[]";

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useSyncExternalStore(
    subscribeToStorage,
    getRoleSnapshot,
    getServerRoleSnapshot
  );

  const rawUserProfile = useSyncExternalStore(
    subscribeToStorage,
    getUserProfileSnapshot,
    getServerUserProfileSnapshot
  );

  const rawBookmarks = useSyncExternalStore(
    subscribeToStorage,
    getBookmarksSnapshot,
    getServerBookmarksSnapshot
  );

  const userProfile: ActiveUserProfile = React.useMemo(() => {
    try {
      const parsed = JSON.parse(rawUserProfile);
      return {
        ...defaultUserProfile,
        ...parsed,
        role: role, // ensure synchronized
      };
    } catch {
      return { ...defaultUserProfile, role };
    }
  }, [rawUserProfile, role]);

  const bookmarks: string[] = React.useMemo(() => {
    try {
      return JSON.parse(rawBookmarks);
    } catch {
      return [];
    }
  }, [rawBookmarks]);

  const [reports, setReports] = useState<CommunityReport[]>(initialReportsData);
  const [isLoadingReports, setIsLoadingReports] = useState<boolean>(false);

  // Fetch reports from backend API on mount
  const refreshReports = useCallback(async () => {
    try {
      setIsLoadingReports(true);
      const res = await fetch("/api/reports");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setReports(json.data);
        }
      }
    } catch (err) {
      console.warn("Using cached reports:", err);
    } finally {
      setIsLoadingReports(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/reports")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setReports(json.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    try {
      localStorage.setItem("dihutan_active_role", newRole);
      const rawCurrent = localStorage.getItem("dihutan_user_profile");
      const current = rawCurrent ? JSON.parse(rawCurrent) : defaultUserProfile;
      localStorage.setItem(
        "dihutan_user_profile",
        JSON.stringify({ ...current, role: newRole })
      );
      notifyStorageListeners();
    } catch {
      // Ignore
    }
  }, []);

  const updateUserProfile = useCallback((patch: Partial<ActiveUserProfile>) => {
    try {
      const rawCurrent = localStorage.getItem("dihutan_user_profile");
      const current: ActiveUserProfile = rawCurrent
        ? JSON.parse(rawCurrent)
        : defaultUserProfile;
      const updated: ActiveUserProfile = { ...current, ...patch };
      localStorage.setItem("dihutan_user_profile", JSON.stringify(updated));
      if (patch.role) {
        localStorage.setItem("dihutan_active_role", patch.role);
      }
      notifyStorageListeners();
    } catch {
      // Ignore
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase auth signOut warning:", err);
    } finally {
      try {
        localStorage.removeItem("dihutan_user_profile");
        localStorage.setItem("dihutan_active_role", "USER");
        notifyStorageListeners();
      } catch {
        // Ignore
      }
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/masuk?status=logged_out";
      }
    }
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    try {
      const current: string[] = JSON.parse(
        localStorage.getItem("dihutan_bookmarks") || "[]"
      );
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      localStorage.setItem("dihutan_bookmarks", JSON.stringify(next));
      notifyStorageListeners();
    } catch {
      // Ignore
    }
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  const addReport = useCallback(
    async (
      data: Omit<CommunityReport, "id" | "status" | "createdAt" | "updatedAt">
    ) => {
      const tempReport: CommunityReport = {
        ...data,
        id: `rep-${Date.now().toString().slice(-4)}`,
        status: "TERKIRIM",
        createdAt: "Baru saja",
        updatedAt: "Baru saja",
      };

      // Optimistic update
      setReports((prev) => [tempReport, ...prev]);

      try {
        const res = await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setReports((prev) =>
              prev.map((r) => (r.id === tempReport.id ? json.data : r))
            );
            return true;
          }
        }
      } catch (err) {
        console.warn("Failed sending report to API, retained locally:", err);
      }
      return true;
    },
    []
  );

  const updateReportStatus = useCallback(
    async (
      reportId: string,
      status: CommunityReport["status"],
      notes?: string
    ) => {
      const verifier =
        role === "ADMIN" ? "Admin Sistem DiHutan" : "Petugas Lapangan BKSDA";

      // Optimistic update
      setReports((prev) =>
        prev.map((r) => {
          if (r.id === reportId) {
            return {
              ...r,
              status,
              officerNotes: notes ?? r.officerNotes,
              verifiedBy: verifier,
              updatedAt: "Baru saja",
            };
          }
          return r;
        })
      );

      try {
        await fetch("/api/reports", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reportId,
            status,
            officerNotes: notes,
            verifiedBy: verifier,
          }),
        });
      } catch (err) {
        console.warn("Failed syncing report status to API:", err);
      }
      return true;
    },
    [role]
  );

  const canManageContent = role === "ADMIN";
  const canVerifyReports =
    role === "ADMIN" || role === "PIHAK_BERTANGGUNG_JAWAB";
  const canTriggerAlertResponse =
    role === "PIHAK_BERTANGGUNG_JAWAB" || role === "ADMIN";

  return (
    <DashboardContext.Provider
      value={{
        role,
        setRole,
        userProfile,
        updateUserProfile,
        logout,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        reports,
        isLoadingReports,
        refreshReports,
        addReport,
        updateReportStatus,
        canManageContent,
        canVerifyReports,
        canTriggerAlertResponse,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
