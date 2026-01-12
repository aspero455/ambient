"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
        )
    },
    {
        label: 'Home Page',
        href: '/admin/home',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )
    },
    {
        label: 'About Page',
        href: '/admin/about',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        label: 'Projects Page',
        href: '/admin/projects',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )
    },
    {
        label: 'Gallery Page',
        href: '/admin/gallery',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        label: 'Services Page',
        href: '/admin/services',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        label: 'Blog Page',
        href: '/admin/blog',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        )
    },
    {
        label: 'Bookings',
        href: '/admin/bookings',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expiresAt, setExpiresAt] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [unreadBookings, setUnreadBookings] = useState(0);

    // Skip auth check for login page
    const isLoginPage = pathname === '/admin/login';

    // Fetch Unread Bookings Count
    useEffect(() => {
        if (isLoginPage) return;

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
        const interval = setInterval(fetchUnread, 15000); // Poll every 15s
        return () => clearInterval(interval);
    }, [isLoginPage]);

    useEffect(() => {
        if (isLoginPage) {
            setIsLoading(false);
            return;
        }

        const checkAuth = async () => {
            try {
                const res = await fetch('/api/admin/auth');
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated) {
                        setIsAuthenticated(true);
                        setUsername(data.user?.username || 'Admin');
                        if (data.expiresAt) setExpiresAt(data.expiresAt);
                    } else {
                        router.push('/admin/login');
                    }
                } else {
                    router.push('/admin/login');
                }
            } catch {
                router.push('/admin/login');
            }
            setIsLoading(false);
        };

        checkAuth();
        checkAuth();
    }, [router, pathname, isLoginPage]);

    // Session Timer
    useEffect(() => {
        if (!expiresAt) return;
        const updateTimer = () => {
            const now = Date.now();
            const diff = expiresAt - now;
            if (diff <= 0) {
                handleLogout();
            } else {
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', { method: 'DELETE' });
            router.push('/admin/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    // Show login page without layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="font-sans text-[12px] text-white/40 uppercase tracking-wider">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ x: -280 }}
                animate={{ x: sidebarOpen ? 0 : -220 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-[#1A1F2E] to-[#0D1117] flex-col z-50"
            >
                {/* Logo Section */}
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white flex items-center justify-center">
                            <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="font-display text-[18px] font-light text-white">Ambient</h2>
                            <p className="font-sans text-[10px] uppercase tracking-widest text-white/40">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* User Info */}
                <div className="px-6 py-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                            <span className="font-sans text-[14px] font-bold text-white uppercase">
                                {username.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <p className="font-sans text-[13px] font-medium text-white">{username}</p>
                            <div className="flex items-center gap-2">
                                <p className="font-sans text-[10px] text-white/40">Administrator</p>
                                {timeLeft && (
                                    <span className="font-mono text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded">
                                        {timeLeft}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-4 overflow-y-auto">
                    <div className="mb-4 px-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/30">
                            Page Management
                        </span>
                    </div>
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-[13px] transition-all duration-200 ${isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <span className={isActive ? 'text-white' : 'text-white/40'}>
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                        {item.label === 'Bookings' && unreadBookings > 0 && (
                                            <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {unreadBookings}
                                            </span>
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="ml-auto w-1.5 h-1.5 bg-amber-400 rounded-full"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-[13px] text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1A1F2E] border-b border-white/5 z-50 flex items-center justify-between px-4">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 text-white/60 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="font-display text-[16px] text-white">Admin Panel</span>
                <button onClick={handleLogout} className="p-2 text-white/40 hover:text-red-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/60 z-50"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-gradient-to-b from-[#1A1F2E] to-[#0D1117] z-50 flex flex-col"
                        >
                            {/* Mobile Nav Content - Same as desktop */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white flex items-center justify-center">
                                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="font-display text-[16px] text-white">Ambient</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-white/40 hover:text-white"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex-1 py-6 px-4 overflow-y-auto">
                                <ul className="space-y-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-[14px] ${isActive
                                                        ? 'bg-white/10 text-white'
                                                        : 'text-white/50 hover:text-white hover:bg-white/5'
                                                        }`}
                                                >
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={`flex-1 ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[60px]'} transition-all duration-300`}>
                <div className="pt-16 lg:pt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
