'use client'

import React from 'react';
import { Check } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: number;
}

export default function VerifiedBadge({ size = 16 }: VerifiedBadgeProps) {
  return (
    <div style={{
      background: '#1DA1F2',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
    }}>
      <Check size={size * 0.65} color="#fff" strokeWidth={3} />
    </div>
  );
}