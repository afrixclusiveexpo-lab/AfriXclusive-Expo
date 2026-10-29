import React, { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@i2v/client';
import type { Profile } from '@i2v/domain';
import { themes } from '@i2v/design';
const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:4100';
const fallbackClient = createClient(baseUrl, () => null, 'mobile');
const Context = createContext({ api: fallbackClient, user: null as Profile | null, loading: true, connectionError: '', colors: themes.light as typeof themes.light | typeof themes.dark, dark: false, toggleTheme: () => {}, setUser: (_user: Profile) => {}, signIn: async (_token: string, _user: Profile) => {}, signOut: async () => {}, retry: () => {} });
export function AppProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme(); const [darkOverride, setDarkOverride] = useState<boolean | null>(null); const dark = darkOverride ?? scheme === 'dark';
  const tokenRef = useRef<string | null>(null); const api = useMemo(() => createClient(baseUrl, () => tokenRef.current, 'mobile'), []);
  const [user, setUser] = useState<Profile | null>(null); const [loading, setLoading] = useState(true); const [connectionError, setConnectionError] = useState(''); const [retryCount, setRetry] = useState(0);
  useEffect(() => { let active = true; setLoading(true); setConnectionError(''); (async () => { try { const token = await SecureStore.getItemAsync('i2v-session'); tokenRef.current = token; if (token) { try { const profile = await api.me(); if (active) setUser(profile); } catch (error) { if ((error as { status?: number }).status === 401) { tokenRef.current = null; await SecureStore.deleteItemAsync('i2v-session'); if (active) setUser(null); } else throw error; } } } catch (error) { if (active) setConnectionError((error as Error).message); } finally { if (active) setLoading(false); } })(); return () => { active = false; }; }, [api, retryCount]);
  async function signIn(token: string, profile: Profile) { await SecureStore.setItemAsync('i2v-session', token, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }); tokenRef.current = token; setUser(profile); }
  async function signOut() { await api.logout(); await SecureStore.deleteItemAsync('i2v-session'); tokenRef.current = null; setUser(null); }
  return <Context.Provider value={{ api, user, loading, connectionError, colors: dark ? themes.dark : themes.light, dark, toggleTheme: () => setDarkOverride(!dark), setUser, signIn, signOut, retry: () => setRetry(x => x + 1) }}>{children}</Context.Provider>;
}
export function useApp() { return useContext(Context); }
