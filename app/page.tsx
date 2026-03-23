import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veridian Lab | Advanced Hydroponics System',
};

export default function HomePage() {
  redirect('/dashboard');
}
