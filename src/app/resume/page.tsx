'use client';

import { useEffect } from 'react';

export default function ResumePage() {
  useEffect(() => {
    window.location.replace('/resume.pdf');
  }, []);

  return (
    <p style={{ textAlign: 'center', marginTop: '2rem' }}>
      Redirecting to resume...
    </p>
  );
}