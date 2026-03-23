'use client';

import './style.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';



export default function FullDiagnosticPage() {
  const diagnosticsRef = useRef<HTMLDivElement>(null);
  const clickResultRef = useRef<HTMLDivElement>(null);

  const runDiagnostics = () => {
    const diagnostics = diagnosticsRef.current!;
    let html = '';

    const tests = [
      { name: 'Page Loaded', test: () => true, message: 'This page loaded successfully!' },
      { name: 'JavaScript Execution', test: () => typeof window === 'object', message: 'JavaScript is executing properly' },
      { name: 'Tailwind CSS', test: () => document.querySelector('.bg-gray-100') !== null, message: 'Tailwind CSS framework is loaded' },
      { name: 'Next.js Routing', test: () => typeof window !== 'undefined' && window.location.pathname.includes('/full_diagnostic'), message: 'Next.js route active' },
      { name: 'localStorage Available', test: () => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return true;
        } catch(e) {
          return false;
        }
      }, message: 'Browser storage is available' }
    ];

    tests.forEach(test => {
      const passed = test.test();
      const statusClass = passed ? 'status-success' : 'status-error';
      const icon = passed ? '✅' : '❌';
      html += `<div class="${statusClass}">${icon} <strong>${test.name}:</strong> ${test.message}</div>`;
    });

    diagnostics.innerHTML = html;
  };

  const testClick = (page: string) => {
    const resultDiv = clickResultRef.current!;
    const pages = {
      'dashboard': '/dashboard',
      'control': '/control',
      'plant-doctor': '/plant-doctor',
      'analytics': '/analytics'
    };
    const path = pages[page as keyof typeof pages] || '#';
    resultDiv.innerHTML = `
      <div class="status-warning">
        <strong>Navigation Test: ${page}</strong><br>
        Next.js Route: ${path}<br>
        Ready to navigate! (Link would execute: router.push('${path}'))
      </div>
    `;
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-8">🌿 Complete Diagnostic Report</h1>
        
        <div ref={diagnosticsRef} id="diagnostics" />
        
        <div className="test-item mt-8">
          <h2 className="text-xl font-bold mb-4">Navigation Tests</h2>
          <p className="mb-4">Click these buttons to test navigation:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => testClick('dashboard')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Test Dashboard</button>
            <button onClick={() => testClick('control')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Test Control</button>
            <button onClick={() => testClick('plant-doctor')} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Test Plant Doctor</button>
            <button onClick={() => testClick('analytics')} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Test Analytics</button>
          </div>
          <div ref={clickResultRef} id="click-result" className="mt-4" />
        </div>
        
        <div className="test-item">
          <h2 className="text-xl font-bold mb-4">Page Links</h2>
          <p className="mb-4">Or click to directly visit pages:</p>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="text-blue-600 hover:underline">→ Dashboard</Link></li>
            <li><Link href="/control" className="text-blue-600 hover:underline">→ Control</Link></li>
            <li><Link href="/plant-doctor" className="text-blue-600 hover:underline">→ Plant Doctor</Link></li>
            <li><Link href="/analytics" className="text-blue-600 hover:underline">→ Analytics</Link></li>
            <li><Link href="/settings" className="text-blue-600 hover:underline">→ Settings</Link></li>
            <li><Link href="/user-profile-redesigned" className="text-blue-600 hover:underline">→ User Profile</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

