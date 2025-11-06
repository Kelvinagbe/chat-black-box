import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

interface Friend {
  chatRoomId: string;
  addedAt: number;
}

export const useFriends = (currentUserId: string | null) => {
  const [friends, setFriends] = useState<Record<string, Friend>>({});

  useEffect(() => {
    if (!currentUserId) return;

    const friendsRef = ref(db, `friends/${currentUserId}`);
    
    const unsubscribe = onValue(friendsRef, (snapshot) => {
      if (snapshot.exists()) {
        setFriends(snapshot.val());
      } else {
        setFriends({});
      }
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return { friends };
};