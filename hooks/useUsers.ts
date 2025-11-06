import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

interface User {
  uid: string;
  nickname: string;
  avatar?: string;
  status?: 'online' | 'offline';
  role?: string;
}

export const useUsers = () => {
  const [allUsers, setAllUsers] = useState<Record<string, User>>({});

  useEffect(() => {
    const usersRef = ref(db, 'users');
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setAllUsers(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, []);

  return { allUsers };
};