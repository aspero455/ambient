"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
    id: string;
    name: string;
    date: string;
    slug: string;
    photoCount?: number;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '' });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/admin/events');
            if (res.ok) {
                const data = await res.json();
                setEvents(data.events || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/events', {
                method: 'POST',
                body: JSON.stringify(newEvent),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                fetchEvents();
                setShowCreateModal(false);
                setNewEvent({ name: '', date: '', location: '' });
            }
        } catch (error) {
            alert("Failed to create event");
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-3xl text-white mb-2">Events & Galleries</h1>
                    <p className="font-sans text-white/40">Manage client photo galleries</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-white text-black px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-white/90 transition-colors"
                >
                    + New Event
                </button>
            </div>

            {loading ? (
                <div className="text-white/40">Loading events...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-display text-xl text-white mb-1">{event.name}</h3>
                                    <p className="font-mono text-xs text-white/40">{event.date}</p>
                                </div>
                                <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[10px] font-mono">
                                    ACTIVE
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/5 my-4" />

                            <div className="flex items-center gap-4">
                                <Link
                                    href={`/admin/events/${event.id}/upload`}
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded text-center text-xs uppercase tracking-wider transition-colors"
                                >
                                    Upload Photos
                                </Link>
                                <button className="p-2 text-white/40 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    {events.length === 0 && (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl">
                            <p className="text-white/30 mb-4">No events found. Create one to get started.</p>
                            <button onClick={() => setShowCreateModal(true)} className="text-white underline text-sm">Create First Event</button>
                        </div>
                    )}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1A1F2E] p-8 rounded-2xl w-full max-w-md border border-white/10">
                        <h2 className="font-display text-2xl text-white mb-6">Create New Event</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-white/40 mb-2">Event Name</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30"
                                    placeholder="e.g. Smith Wedding"
                                    value={newEvent.name}
                                    onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-white/40 mb-2">Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30"
                                    value={newEvent.date}
                                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-white/40 mb-2">Location</label>
                                <input
                                    className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30"
                                    placeholder="e.g. New York, NY"
                                    value={newEvent.location}
                                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 text-white/60 hover:text-white">Cancel</button>
                                <button type="submit" className="flex-1 bg-white text-black rounded font-bold uppercase text-xs hover:bg-white/90">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
