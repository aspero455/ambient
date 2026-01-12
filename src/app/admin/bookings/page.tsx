"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
    id: string;
    createdAt: string;
    status: 'unread' | 'read' | 'contacted';
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    eventType: string;
    eventDate: string;
    message: string;
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        // Poll every 30 seconds for new bookings
        const interval = setInterval(fetchBookings, 30000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id: string, status: string) => {
        // Optimistic update
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: status as any } : b));
        if (selectedBooking && selectedBooking.id === id) {
            setSelectedBooking({ ...selectedBooking, status: status as any });
        }

        try {
            await fetch('/api/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            // Refresh to sync
            fetchBookings();
        } catch (error) {
            console.error("Failed to update status");
        }
    };

    const handleViewBooking = (booking: Booking) => {
        setSelectedBooking(booking);
        // If unread, mark as read when opened
        if (booking.status === 'unread') {
            updateStatus(booking.id, 'read');
        }
    };

    return (
        <div className="p-8 pb-32 max-w-[1600px] mx-auto text-white">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="font-display text-[48px] font-light mb-2">Bookings</h1>
                    <p className="font-sans text-[14px] text-white/40 uppercase tracking-widest">
                        Manage usage requests & enquiries
                    </p>
                </div>
                <button
                    onClick={fetchBookings}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[12px] font-sans font-bold uppercase tracking-wider transition-colors"
                >
                    Refresh
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List Column */}
                    <div className="lg:col-span-1 space-y-4">
                        {bookings.length === 0 ? (
                            <div className="p-8 text-center border border-white/5 rounded-2xl bg-white/5">
                                <p className="text-white/40 font-sans">No bookings yet.</p>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <motion.div
                                    key={booking.id}
                                    layoutId={booking.id}
                                    onClick={() => handleViewBooking(booking)}
                                    className={`p-6 rounded-xl border cursor-pointer transition-all duration-200 relative overflow-hidden group
                                        ${selectedBooking?.id === booking.id
                                            ? 'bg-white text-black border-white'
                                            : 'bg-[#1A1F2E] text-white border-white/5 hover:border-white/20'}`}
                                >
                                    {booking.status === 'unread' && (
                                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    )}

                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`font-sans text-[10px] uppercase font-bold tracking-widest ${selectedBooking?.id === booking.id ? 'text-black/40' : 'text-white/40'}`}>
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className={`font-sans text-[10px] uppercase font-bold tracking-widest ${booking.status === 'contacted' ? 'text-green-500' : 'text-amber-500'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-[20px] mb-1">{booking.name}</h3>
                                    <p className={`font-sans text-[12px] truncate ${selectedBooking?.id === booking.id ? 'text-black/60' : 'text-white/60'}`}>
                                        {booking.eventType}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Detail Column */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {selectedBooking ? (
                                <motion.div
                                    key={selectedBooking.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="bg-[#1A1F2E] border border-white/5 rounded-2xl p-8 md:p-12 sticky top-8"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-12 pb-8 border-b border-white/5">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-white/60">
                                                    {selectedBooking.eventType}
                                                </div>
                                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-white/60">
                                                    {new Date(selectedBooking.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                            </div>
                                            <h2 className="font-display text-[48px] leading-none mb-2">{selectedBooking.name}</h2>
                                            <p className="font-sans text-white/40 text-lg flex items-center gap-2">
                                                {selectedBooking.email}
                                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                                {selectedBooking.phone}
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            {selectedBooking.status !== 'contacted' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateStatus(selectedBooking.id, 'contacted');
                                                    }}
                                                    className="px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-green-500/20"
                                                >
                                                    Mark Contacted
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="font-sans text-[11px] font-bold uppercase tracking-widest text-white/30 mb-4">
                                                Message
                                            </h3>
                                            <p className="font-sans text-[18px] leading-relaxed text-white/80 whitespace-pre-wrap">
                                                {selectedBooking.message || "No additional message provided."}
                                            </p>
                                        </div>

                                        <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="font-sans text-[11px] font-bold uppercase tracking-widest text-white/30 mb-2">
                                                    Country Code
                                                </h3>
                                                <p className="font-mono text-white/60">{selectedBooking.countryCode}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-sans text-[11px] font-bold uppercase tracking-widest text-white/30 mb-2">
                                                    Received At
                                                </h3>
                                                <p className="font-mono text-white/60">
                                                    {new Date(selectedBooking.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center p-12 border border-white/5 rounded-2xl border-dashed opacity-50">
                                    <p className="font-sans text-white/40 uppercase tracking-widest text-sm">Select a booking to view details</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}
