import React, { useEffect } from 'react'
import { supabase } from '../../../app/routes/Supabase/SupabaseClient';
import { useStore } from '@nanostores/react';
import { $auth } from '../../../store/AuthContext';

// Senior Tip: Define types in a shared file, but keep it here for now
interface Property {
    id: string;
    user_id: string;
    address?: string;
    name?: string;
    rent?: number;
    mortgage?: number;
    insurance_url?: string;
    contract_url?: string;
}

export const useFetchProperties = () => {
    const [properties, setProperties] = React.useState<Property[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const { user } = useStore($auth);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const { data, error } = await supabase
                .from('Property')
                .select('*')
                .eq('user_id', user.id)
                .order('name', { ascending: true });

            if (error) {
                console.error("Fetch error:", error.message);
            } else if (data) {
                setProperties(data as Property[]);
            }
            setLoading(false);
        };

        fetchProperties();
    }, [user]);

    return { loading, properties };
}