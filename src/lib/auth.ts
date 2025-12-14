export type UserRole = "acceptor" | "user" | null;

export function getUserRole(): UserRole {
  if (typeof window !== "undefined") {
    const role = localStorage.getItem("user_role");
    return role === "acceptor" || role === "user" ? role : null;
  }
  return null;
}

export function setUserRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    if (role) {
      localStorage.setItem("user_role", role);
    } else {
      localStorage.removeItem("user_role");
    }
  }
}

export function signOut(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_role");
  }
}

export function isAuthenticated(): boolean {
  return getUserRole() !== null;
}
