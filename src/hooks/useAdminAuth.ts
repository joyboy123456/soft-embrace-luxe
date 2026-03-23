import { useState, useEffect, createContext, useContext, ReactNode, createElement } from "react";

interface AdminAuthContextType {
  session: { email: string } | null;
  user: { email: string; name: string } | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({} as AdminAuthContextType);

// 同步读取 localStorage 的辅助函数
const getStoredAuth = () => {
  if (typeof window === 'undefined') return { session: null, user: null, isAdmin: false };
  const adminEmail = localStorage.getItem("admin_email");
  const adminName = localStorage.getItem("admin_name");
  const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";

  if (adminEmail && isLoggedIn) {
    return {
      session: { email: adminEmail },
      user: { email: adminEmail, name: adminName || "Admin" },
      isAdmin: true
    };
  }
  return { session: null, user: null, isAdmin: false };
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const initialAuth = getStoredAuth();

  const [session, setSession] = useState<{ email: string } | null>(initialAuth.session);
  const [user, setUser] = useState<{ email: string; name: string } | null>(initialAuth.user);
  const [loading, setLoading] = useState(false); // 初始不为 loading，因为我们是同步读取
  const [isAdmin, setIsAdmin] = useState(initialAuth.isAdmin);

  useEffect(() => {
    // 监听 storage 变化（处理多标签页情况）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "admin_logged_in") {
        const auth = getStoredAuth();
        setSession(auth.session);
        setUser(auth.user);
        setIsAdmin(auth.isAdmin);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const signIn = async (email: string, password: string) => {
    return { error: null };
  };

  const signOut = async () => {
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_logged_in");
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  return createElement(
    AdminAuthContext.Provider,
    { value: { session, user, isAdmin, loading, signIn, signOut } },
    children
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
