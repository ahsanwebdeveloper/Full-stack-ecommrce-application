import React from "react";
import { Navigate, } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";
export default function ProtectedRoute({children, adminOnly = false}) {
    const token = getToken();
    const user = getUser();
    if(!token) return <Navigate to="login" replace />
    if(adminOnly && (!user || !user.isAdmin)) {
        alert("Assess denied : only admin")
        return <Navigate to="/" replace />
}
return children;
}