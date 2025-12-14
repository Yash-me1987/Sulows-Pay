"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, User, Bird } from "lucide-react";
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
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                <Bird className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-zinc-900">
                Tailows Pay
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center px-6 py-12 min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 md:text-5xl mb-4">
              Welcome to <span className="text-zinc-400">Tailows Pay</span>
            </h1>
            <p className="text-lg text-zinc-600">
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
                    ? "border-zinc-900 bg-zinc-50 shadow-lg" 
                    : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md"
                }`}
                onClick={() => setSelectedRole("acceptor")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 shadow-lg">
                    <Store className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-zinc-900 text-2xl mb-2">Payment Acceptor</CardTitle>
                  <CardDescription className="text-zinc-600 text-base">
                    Create and manage payment forms to accept payments from customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-zinc-700">
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Create custom payment forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Add UPI ID and QR codes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Accept domestic & international payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Share payment links with customers</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => handleSignIn("acceptor")}
                    className="w-full mt-6 bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg"
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
                    ? "border-zinc-900 bg-zinc-50 shadow-lg" 
                    : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md"
                }`}
                onClick={() => setSelectedRole("user")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 shadow-lg">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-zinc-900 text-2xl mb-2">User</CardTitle>
                  <CardDescription className="text-zinc-600 text-base">
                    Browse and make payments through payment forms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-zinc-700">
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Access payment forms via shared links</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Pay via UPI, QR code, or cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Secure and encrypted transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-zinc-900 mt-0.5">✓</span>
                      <span>Support for international payments</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => handleSignIn("user")}
                    className="w-full mt-6 bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg"
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