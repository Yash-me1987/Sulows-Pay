"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Store, User } from "lucide-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"acceptor" | "user" | null>(null);

  const handleSignIn = (role: "acceptor" | "user") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_role", role);
      if (role === "acceptor") {
        router.push("/my-forms");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
      
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "system-ui" }}>
                PayForm
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex items-center justify-center px-6 py-12 min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white md:text-5xl mb-4" style={{ fontFamily: "system-ui" }}>
              Welcome to <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">PayForm</span>
            </h1>
            <p className="text-lg text-slate-400">
              Choose how you want to continue
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                className={`border-2 cursor-pointer transition-all duration-300 h-full ${
                  selectedRole === "acceptor" 
                    ? "border-violet-500 bg-violet-500/10 backdrop-blur-xl shadow-xl shadow-violet-500/30" 
                    : "border-white/10 bg-white/5 backdrop-blur-xl hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/20"
                }`}
                onClick={() => setSelectedRole("acceptor")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/30">
                    <Store className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-2">Payment Acceptor</CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    Create and manage payment forms to accept payments from customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">✓</span>
                      <span>Create custom payment forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">✓</span>
                      <span>Add UPI ID and QR codes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">✓</span>
                      <span>Accept domestic & international payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">✓</span>
                      <span>Share payment links with customers</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => handleSignIn("acceptor")}
                    className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25"
                    size="lg"
                  >
                    Continue as Acceptor
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                className={`border-2 cursor-pointer transition-all duration-300 h-full ${
                  selectedRole === "user" 
                    ? "border-cyan-500 bg-cyan-500/10 backdrop-blur-xl shadow-xl shadow-cyan-500/30" 
                    : "border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
                }`}
                onClick={() => setSelectedRole("user")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-2">User</CardTitle>
                  <CardDescription className="text-slate-400 text-base">
                    Browse and make payments through payment forms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">✓</span>
                      <span>Access payment forms via shared links</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">✓</span>
                      <span>Pay via UPI, QR code, or cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">✓</span>
                      <span>Secure and encrypted transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">✓</span>
                      <span>Support for international payments</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => handleSignIn("user")}
                    className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/25"
                    size="lg"
                  >
                    Continue as User
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
