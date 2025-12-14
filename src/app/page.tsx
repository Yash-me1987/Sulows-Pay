"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, QrCode, Smartphone, Globe, Shield, Zap, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { getUserRole, signOut } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (!role) {
      router.push("/signin");
    } else {
      setUserRole(role);
      setIsLoading(false);
    }
  }, [router]);

  const handleSignOut = () => {
    signOut();
    router.push("/signin");
  };

  if (isLoading) {
    return null;
  }

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
            <div className="flex items-center gap-4">
              {userRole === "acceptor" && (
                <>
                  <Link href="/my-forms">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      My Forms
                    </Button>
                  </Link>
                  <Link href="/create">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25">
                      Create Form
                    </Button>
                  </Link>
                </>
              )}
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Zap className="h-4 w-4" />
              Accept payments in minutes
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl" style={{ fontFamily: "system-ui" }}>
              Create Custom{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Payment Forms
              </span>{" "}
              Instantly
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
              Build personalized payment acceptance forms with UPI, QR codes, cards, and net banking. 
              Perfect for freelancers, businesses, and international transactions.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/create">
                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-xl shadow-violet-500/30">
                  Create Your Form
                </Button>
              </Link>
              <Link href="/my-forms">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10">
                  View My Forms
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/25">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">UPI Payments</CardTitle>
                <CardDescription className="text-slate-400">
                  Accept instant UPI payments with your verified UPI ID. Perfect for domestic transactions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/25">
                  <QrCode className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">QR Code Scanning</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload your payment QR code for quick scan-and-pay experience for your customers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/25">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Card & Net Banking</CardTitle>
                <CardDescription className="text-slate-400">
                  Accept debit/credit cards and net banking payments for flexibility.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/25">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">International Payments</CardTitle>
                <CardDescription className="text-slate-400">
                  Support multiple currencies including USD, EUR, GBP for global transactions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-500/25">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Secure & Private</CardTitle>
                <CardDescription className="text-slate-400">
                  All data stored locally on your device. No server-side storage for maximum privacy.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/25">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Instant Setup</CardTitle>
                <CardDescription className="text-slate-400">
                  Create and share your payment form in under 2 minutes. No signup required.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 p-12 text-center backdrop-blur-xl"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "system-ui" }}>
              Ready to accept payments?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Create your custom payment form now and start receiving payments from anywhere in the world.
            </p>
            <Link href="/create" className="mt-8 inline-block">
              <Button size="lg" className="h-14 px-10 text-lg bg-white text-slate-900 hover:bg-slate-100">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          <p>PayForm - Create custom payment acceptance forms instantly.</p>
        </div>
      </footer>
    </div>
  );
}