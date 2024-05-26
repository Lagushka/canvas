'use client';

import React from 'react';
import styles from './page.module.css';
import { Controls } from '@/components/Controls/Controls';
import { Canvas } from '@/components/Canvas/Canvas';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.imageBlock}>
        <Canvas />
        <Controls />
      </div>
    </main>
  );
}
