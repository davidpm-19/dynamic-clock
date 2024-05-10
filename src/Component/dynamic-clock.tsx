"use client";
import React, { useState, useEffect } from 'react';

interface Props {
    circleStroke?: string
    circleFill?: string
    circleRadius?: number
    hourColor?: string
    minColor?: string
    hourLen?: number
    minLen?: number
}
const DynamicClock = ({ circleStroke="FFFAFA", circleFill="none", circleRadius=10, hourColor="FFFAFA", minColor="FFFAFA", hourLen=5, minLen=7 }: Props) => {

     //Control Section

    const control = () => {
     
        const safeHourLen = hourLen <= 0 ? 1 : hourLen;
        const safeMinLen = minLen <= 2 ? 3 : minLen;
        
        const safeRadius = circleRadius <= minLen + 3 ? minLen + 4 : circleRadius
        
        const tempFill = circleFill == hourColor ? "none" : circleFill
        const safeFill = tempFill == "none" ? tempFill : "+" + tempFill

        return { safeHourLen, safeMinLen, safeRadius, safeFill };
    }

    const { safeHourLen, safeMinLen, safeRadius } = control()

    // Calcs Section

    const calculateTimeAngles = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const hours = now.getHours();
        const minuteAngle = minutes * 6; 
        const hourAngle = (hours % 12) * 30 + minutes * 0.5; 
        return { hourAngle, minuteAngle };
    };

    const [{ hourAngle, minuteAngle }, setTimeAngles] = useState(calculateTimeAngles());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAngles(calculateTimeAngles());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 30 30" width="50em" height="30%" xmlns="http://www.w3.org/2000/svg">
            {/* Clock */}
            <circle cx="14" cy="14" r={safeRadius} stroke={'#' + circleStroke} strokeWidth="1" fill={circleFill} />
            {/* Hours */}
            <line x1="14" y1="14" x2={14 + safeHourLen * Math.cos(Math.PI / 180 * (hourAngle - 90))} y2={14 + safeHourLen * Math.sin(Math.PI / 180 * (hourAngle - 90))} stroke={'#' + hourColor} strokeWidth="1" strokeLinecap="round" />
            {/* Minutes */}
            <line x1="14" y1="14" x2={14 + safeMinLen * Math.cos(Math.PI / 180 * (minuteAngle - 90))} y2={14 + safeMinLen * Math.sin(Math.PI / 180 * (minuteAngle - 90))} stroke={'#' + minColor} strokeWidth="1" strokeLinecap="round" />
        </svg>
    );
};

export default DynamicClock;
