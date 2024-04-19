"use client"
// LocalTime.tsx
import React, { useState, useEffect } from 'react';

const LocalTime: React.FC = () => {
    const [dateTime, setDateTime] = useState<string>('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).format(now);

            const dateString = new Intl.DateTimeFormat('ru-RU', {
                day: '2-digit',
                month: 'long',
            }).format(now);

            setDateTime(`${dateString} ${timeString}`);
        };

        updateDateTime(); // Initialize immediately
        const timerId = setInterval(updateDateTime, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return <span>{dateTime}</span>;
};

export default LocalTime;

