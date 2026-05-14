import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUserData } from '@/services/auth';
import { AppUser } from '@/types';

interface AuthContextType {
  firebaseUser: User | null;
  userData: AppUser | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  userData: null,
  loading: true,
  isAdmin: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

// Demo mode - used when Firebase is not configured
const DEMO_MODE = true;

const demoAdmin: AppUser = {
  uid: 'demo-admin',
  email: 'admin@educms.com',
  displayName: 'Admin User',
  role: 'admin',
  createdAt: new Date(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  useEffect(() => {
    // Check for demo login state
    const demoState = localStorage.getItem('eduCmsDemoAuth');
    if (demoState) {
      setUserData(JSON.parse(demoState));
      setDemoLoggedIn(true);
      setLoading(false);
      return;
    }

    try {
      const unsub = onAuthStateChanged(auth, async (user) => {
        setFirebaseUser(user);
        if (user) {
          const data = await getUserData(user.uid);
          setUserData(data);
        } else {
          setUserData(null);
        }
        setLoading(false);
      });
      return unsub;
    } catch (e) {
      setLoading(false);
    }
  }, []);

  // Expose demo login functions globally
  useEffect(() => {
    (window as any).__eduCmsLogin = (role: string = 'admin') => {
      const user = { ...demoAdmin, role: role as any };
      localStorage.setItem('eduCmsDemoAuth', JSON.stringify(user));
      setUserData(user);
      setDemoLoggedIn(true);
    };
    (window as any).__eduCmsLogout = () => {
      localStorage.removeItem('eduCmsDemoAuth');
      setUserData(null);
      setDemoLoggedIn(false);
    };
  }, []);

  const value: AuthContextType = {
    firebaseUser,
    userData,
    loading,
    isAdmin: userData?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
