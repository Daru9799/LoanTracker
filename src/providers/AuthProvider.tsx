import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: any | null;
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null
})

export default function AuthProvider({children}: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
        const getSession = async() => {
            const { data: {session}, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Błąd pobierania sesji:", error);
            }
            setSession(session);
            setLoading(false);
        }

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })

        return () => {
            authListener.subscription.unsubscribe();
        }

    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            if(!session?.user.id) {
                setProfile(null);
                return;
            }
            setLoading(true)
            const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            if(error) {
                console.error("Błąd pobierania profilu:", error);
                setProfile(null);                
            } else {
                setProfile(profileData)
            }
            setLoading(false)
        }

        fetchProfile();
    }, [session]);

    return (
        <AuthContext.Provider value={{session, loading, profile}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 