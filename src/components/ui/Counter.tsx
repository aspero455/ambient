"use client";

import React, { useRef, useEffect } from 'react';
import { animate } from 'framer-motion';

export const Counter = ({ from, to }: { from: number; to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(from, to, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(value) {
                node.textContent = Math.round(value).toString();
            },
        });

        return () => controls.stop();
    }, [from, to]);

    return <span ref={nodeRef} />;
};
