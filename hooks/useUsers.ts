'use client'

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { User } from '@/types/chat';

export const useUsers = () => {
  const [allUsers, setAllUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(realtimeDb, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      setAllUsers(snapshot.exists() ? snapshot.val() : {});
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { allUsers, loading };
};