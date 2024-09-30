"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";


export function AuthProvider({ children, session }) {

    return (
        <SessionProvider session={session}>
            <SkeletonTheme baseColor="#18181b" highlightColor="#1e1e24" borderRadius={"0.5rem"}>
                {children}
            </SkeletonTheme>
        </SessionProvider>
    );
}
