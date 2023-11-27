import React, { useState } from "react";
import { useRouter } from "next/router";

export default function PasswordResetForm() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const { token } = router.query; // Get the token from the query parameters

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!token) {
            setMessage("Token is missing.");
            return;
        }

        setMessage("Resetting password...");

        try {
            const response = await fetch("/api/resetpassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (response.ok) {
                setMessage(
                    "Your password has been reset. Redirecting to login..."
                );
                setTimeout(() => router.push("/login"), 3000);
            } else {
                setMessage("Failed to reset password. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
