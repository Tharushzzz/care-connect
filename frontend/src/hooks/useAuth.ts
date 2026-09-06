import { useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  _id?: string;
  id?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'family' | 'caregiver' | 'admin';
  status?: string;
  avatar?: string;
  phone?: string;
  title?: string;
  experience?: number;
  hourlyRate?: number;
  bio?: string;
  token?: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'family' | 'caregiver';
  title?: string;
  experience?: string | number;
  hourlyRate?: string | number;
  bio?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const storedUser = localStorage.getItem('careconnect_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('careconnect_token') || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('careconnect_token');
  });

  const [loading, setLoading] = useState<boolean>(false);

  const syncAuthState = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('careconnect_user');
      const storedToken = localStorage.getItem('careconnect_token');
      const isLogged = localStorage.getItem('isLoggedIn') === 'true' || !!storedToken;

      setUser(storedUser ? JSON.parse(storedUser) : null);
      setToken(storedToken || null);
      setIsLoggedIn(isLogged);
    } catch {
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      syncAuthState();
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [syncAuthState]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return { success: false, error: data.message || 'Login failed. Please check your credentials.' };
      }

      // Map response to AuthUser
      const authenticatedUser: AuthUser = {
        id: data._id,
        _id: data._id,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        status: data.status,
        avatar: data.avatar || '',
        title: data.title || '',
        experience: data.experience || 0,
        hourlyRate: data.hourlyRate || 0,
        bio: data.bio || '',
      };

      localStorage.setItem('careconnect_user', JSON.stringify(authenticatedUser));
      localStorage.setItem('careconnect_token', data.token);
      localStorage.setItem('isLoggedIn', 'true');

      setUser(authenticatedUser);
      setToken(data.token);
      setIsLoggedIn(true);
      setLoading(false);

      window.dispatchEvent(new Event('authChange'));
      return { success: true, user: authenticatedUser };
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : 'Network error. Please make sure the backend server is running.';
      return { success: false, error: message };
    }
  };

  const signup = async (formData: SignupData): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return { success: false, error: data.message || 'Registration failed' };
      }

      const newUser: AuthUser = {
        id: data._id,
        _id: data._id,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        status: data.status,
        avatar: data.avatar || '',
        title: data.title || '',
        experience: data.experience || 0,
        hourlyRate: data.hourlyRate || 0,
        bio: data.bio || '',
      };

      localStorage.setItem('careconnect_user', JSON.stringify(newUser));
      localStorage.setItem('careconnect_token', data.token);
      localStorage.setItem('isLoggedIn', 'true');

      setUser(newUser);
      setToken(data.token);
      setIsLoggedIn(true);
      setLoading(false);

      window.dispatchEvent(new Event('authChange'));
      return { success: true, user: newUser };
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : 'Network error. Please make sure the backend server is running.';
      return { success: false, error: message };
    }
  };

  const updateProfile = async (profileData: Partial<AuthUser>): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    setLoading(true);
    try {
      const currentToken = token || localStorage.getItem('careconnect_token');
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return { success: false, error: data.message || 'Profile update failed' };
      }

      const updated: AuthUser = {
        ...(user || {}),
        id: data._id,
        _id: data._id,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || '',
        role: data.role,
        status: data.status || (user ? user.status : undefined),
        avatar: data.avatar || '',
        title: data.title || '',
        experience: data.experience || 0,
        hourlyRate: data.hourlyRate || 0,
        bio: data.bio || '',
      };

      localStorage.setItem('careconnect_user', JSON.stringify(updated));
      setUser(updated);
      setLoading(false);
      window.dispatchEvent(new Event('authChange'));
      return { success: true, user: updated };
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : 'Network error';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('careconnect_user');
    localStorage.removeItem('careconnect_token');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChange'));
  };

  return {
    user,
    token,
    isLoggedIn,
    loading,
    login,
    signup,
    updateProfile,
    logout,
  };
}
