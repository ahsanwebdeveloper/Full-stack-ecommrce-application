import React from "react";
import { Navigate, } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";
export default function ProtectedRoute({children, adminOnly = false}) {
    const token = getToken();
    const user = getUser();
    if(!token) return <Navigate to="login" replace />
    // Support both shapes: backend may return { role: 'admin' } or { isAdmin: true }
    if (adminOnly && (!user || !(user.isAdmin || user.role === "admin"))) {
        alert("Assess denied : only admin")
        return <Navigate to="/" replace />
    }
return children;
}