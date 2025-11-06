'use client'

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Friend } from '@/types/chat';

export const useFriends = (currentUserId: string | null) => {
  const [friends, setFriends] = useState<Record<string, Friend>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) {
      setFriends({});
      setLoading(false);
      return;
    }

    const friendsRef = ref(realtimeDb, `friends/${currentUserId}`);
    const unsubscribe = onValue(friendsRef, (snapshot) => {
      setFriends(snapshot.exists() ? snapshot.val() : {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return { friends, loading };
};