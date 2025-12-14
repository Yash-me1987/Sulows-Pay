"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, QrCode, Smartphone, Globe, Shield, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 group-hover:from-zinc-800 group-hover:to-zinc-600 transition-all shadow-md">
                <CreditCard className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                Tailows Pay
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              Professional Payment Solutions
            </div>
            <h1 className="mx-auto max-w-5xl text-6xl font-bold leading-tight tracking-tight text-zinc-900 md:text-7xl lg:text-8xl">
              Accept Payments
              <br />
              <span className="text-zinc-400">
                Your Way
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-zinc-600">
              Create beautiful, customized payment forms in minutes. Support UPI, cards, QR codes, and international payments—all from one elegant platform.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signin">
                <Button size="lg" className="h-12 px-8 text-base bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg group">
                  Start Accepting Payments
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="bg-white border-y border-zinc-200 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}>

              <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
                  Everything you need
                </h2>
                <p className="mt-4 text-lg text-zinc-600">
                  Powerful features for seamless payment collection
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                      <Smartphone className="h-6 w-6 text-emerald-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-zinc-900">UPI Payments</CardTitle>
                      <CardDescription className="mt-2 text-zinc-600">
                        Accept instant UPI payments with your verified UPI ID. Perfect for domestic transactions.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                      <QrCode className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-zinc-900">QR Code Scanning</CardTitle>
                      <CardDescription className="mt-2 text-zinc-600">
                        Upload your payment QR code for quick scan-and-pay experience for your customers.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                      <CreditCard className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-zinc-900">Card & Net Banking</CardTitle>
                      <CardDescription className="mt-2 text-zinc-600">
                        Accept debit/credit cards and net banking payments for complete flexibility.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                      <Globe className="h-6 w-6 text-violet-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-zinc-900">International Payments</CardTitle>
                      <CardDescription className="mt-2 text-zinc-600">
                        Support multiple currencies including USD, EUR, GBP for global transactions.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                      <Shield className="h-6 w-6 text-rose-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-zinc-900">Secure & Private</CardTitle>
                      <CardDescription className="mt-2 text-zinc-600">
                        All data stored locally on your device. No server storage for maximum privacy.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100">
                      <Zap className="h-6 w-6 text-cyan-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-zinc-900">Instant Setup</CardTitle>
                      <CardDescription className="mt-2 text-zinc-600">
                        Create and share your payment form in under 2 minutes. No signup required.
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-3xl border border-zinc-200 bg-zinc-900 p-12 text-center shadow-xl lg:p-16">

            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
              Create your custom payment form now and start receiving payments from anywhere in the world.
            </p>
            <Link href="/signin" className="mt-10 inline-block">
              <Button size="lg" className="h-12 px-10 text-base bg-white text-zinc-900 hover:bg-zinc-100 shadow-lg">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-600">
            © 2024 Tailows Pay. Professional payment acceptance made simple.
          </p>
        </div>
      </footer>
    </div>);

}