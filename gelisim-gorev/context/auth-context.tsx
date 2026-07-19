"use client";

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { auth, db } from "@/lib/firebase";
import type { UserProfile } from "@/types/app";

interface AuthContextValue {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapUserProfile(uid: string, data: Record<string, unknown>): UserProfile {
  return {
    uid,
    email: String(data.email ?? ""),
    displayName: data.displayName ? String(data.displayName) : undefined,
    selectedCategories: Array.isArray(data.selectedCategories)
      ? (data.selectedCategories as UserProfile["selectedCategories"])
      : [],
    totalPoints: Number(data.totalPoints ?? 0),
    streak: Number(data.streak ?? 0),
    badges: Array.isArray(data.badges) ? (data.badges as string[]) : [],
    createdAt: String(data.createdAt ?? ""),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUserProfile(uid: string) {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      setUserProfile(null);
      return;
    }

    setUserProfile(mapUserProfile(snapshot.id, snapshot.data()));
  }

  async function refreshUserProfile() {
    if (!currentUser) return;
    await loadUserProfile(currentUser.uid);
  }

  async function register(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const userRef = doc(db, "users", result.user.uid);

    await setDoc(userRef, {
      email,
      selectedCategories: [],
      totalPoints: 0,
      streak: 0,
      badges: [],
      createdAt: serverTimestamp(),
    });

    await loadUserProfile(result.user.uid);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
    setUserProfile(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      userProfile,
      loading,
      register,
      login,
      logout,
      refreshUserProfile,
    }),
    [currentUser, userProfile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}