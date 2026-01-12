"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PageStats {
    name: string;
    href: string;
    imageCount: number;
    icon: React.ReactNode;
    color: string;
}

const pageStats: PageStats[] = [
    {
        name: 'Home Page',
        href: '/admin/home',
        imageCount: 6,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        color: 'from-blue-500 to-cyan-500'
    },
    {
        name: 'About Page',
        href: '/admin/about',
        imageCount: 7,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'from-purple-500 to-pink-500'
    },
    {
        name: 'Gallery Page',
        href: '/admin/gallery',
        imageCount: 10,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-amber-500 to-orange-500'
    },
    {
        name: 'Services Page',
        href: '/admin/services',
        imageCount: 6,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-green-500 to-emerald-500'
    },
    {
        name: 'Blog Page',
        href: '/admin/blog',
        imageCount: 6,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        ),
        color: 'from-red-500 to-rose-500'
    }
];

export default function AdminDashboard() {
    const [currentTime, setCurrentTime] = useState('');
    const [greeting, setGreeting] = useState('');
    const [unreadBookings, setUnreadBookings] = useState(0);

    useEffect(() => {
        const fetchUnread = async () => {
            try {
                const res = await fetch('/api/bookings');
                if (res.ok) {
                    const data = await res.json();
                    const unread = data.filter((b: any) => b.status === 'unread').length;
                    setUnreadBookings(unread);
                }
            } catch (e) { console.error(e); }
        };
        fetchUnread();
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));

            const hour = now.getHours();
            if (hour < 12) setGreeting('Good Morning');
            else if (hour < 18) setGreeting('Good Afternoon');
            else setGreeting('Good Evening');
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const totalImages = pageStats.reduce((acc, page) => acc + page.imageCount, 0);

    return (
        <div className="min-h-screen bg-[#0F0F0F] p-6 md:p-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="font-display text-[32px] md:text-[42px] font-light text-white tracking-tight">
                            {greeting}, <span className="text-white/40">Admin</span>
                        </h1>
                        <p className="font-sans text-[14px] text-white/40 mt-1">
                            Manage your website images and content
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 border border-white/10 px-5 py-3">
                            <span className="font-sans text-[11px] uppercase tracking-wider text-white/40 block">Current Time</span>
                            <span className="font-display text-[20px] text-white">{currentTime}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            >
                {/* Total Images */}
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-sans text-[11px] uppercase tracking-wider text-white/40 mb-1">Total Images</p>
                            <p className="font-display text-[42px] font-light text-white">{totalImages}</p>
                        </div>
                        <div className="w-14 h-14 bg-amber-500/20 flex items-center justify-center">
                            <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Pages */}
                <div className="bg-white/[0.02] border border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-sans text-[11px] uppercase tracking-wider text-white/40 mb-1">Total Pages</p>
                            <p className="font-display text-[42px] font-light text-white">5</p>
                        </div>
                        <div className="w-14 h-14 bg-white/5 flex items-center justify-center">
                            <svg className="w-7 h-7 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Cloudinary Status */}
                <div className="bg-white/[0.02] border border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-sans text-[11px] uppercase tracking-wider text-white/40 mb-1">Cloudinary</p>
                            <p className="font-sans text-[16px] font-medium text-emerald-400 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                Connected
                            </p>
                        </div>
                        <div className="w-14 h-14 bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* New Enquiries Notification */}
                {unreadBookings > 0 && (
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 p-6 animate-pulse">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-sans text-[11px] uppercase tracking-wider text-blue-300 mb-1">Action Required</p>
                                <p className="font-sans text-[16px] font-medium text-white flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                                    {unreadBookings} New Bookings
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center">
                                <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <Link href="/admin/bookings" className="mt-4 block font-sans text-[12px] font-bold text-blue-400 uppercase tracking-wider hover:text-white transition-colors">
                            View Enquiries →
                        </Link>
                    </div>
                )}

                {/* Quick Action */}
                <Link href="/admin/home" className="block group">
                    <div className="bg-white/[0.02] border border-white/10 p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-sans text-[11px] uppercase tracking-wider text-white/40 mb-1">Quick Action</p>
                                <p className="font-sans text-[16px] font-medium text-white">Manage Images</p>
                            </div>
                            <div className="w-14 h-14 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                <svg className="w-6 h-6 text-white/60 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Page Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-[24px] font-light text-white">Page Image Managers</h2>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-white/30">
                        Click to manage
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pageStats.map((page, index) => (
                        <motion.div
                            key={page.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                            <Link href={page.href} className="block group">
                                <div className="bg-white/[0.02] border border-white/10 p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${page.color} flex items-center justify-center text-white`}>
                                            {page.icon}
                                        </div>
                                        <svg className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>

                                    <h3 className="font-display text-[20px] font-light text-white mb-2 group-hover:text-white/80 transition-colors">
                                        {page.name}
                                    </h3>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-sans text-[13px] text-white/40">
                                                {page.imageCount} images
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(page.imageCount / totalImages) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                            className={`h-full bg-gradient-to-r ${page.color}`}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-10"
            >
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-sans text-[14px] font-bold text-amber-400 mb-1">Quick Tips</h4>
                            <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                                When you upload or replace an image, it automatically syncs with Cloudinary and updates on your website.
                                Old images are automatically deleted when replaced to save storage space.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
