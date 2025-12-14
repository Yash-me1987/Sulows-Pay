"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Plus, ExternalLink, Copy, Trash2, QrCode, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { getForms, deleteForm } from "@/lib/storage";
import { PaymentForm } from "@/lib/types";
import { getUserRole } from "@/lib/auth";

export default function MyFormsPage() {
  const router = useRouter();
  const [forms, setForms] = useState<PaymentForm[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "acceptor") {
      router.push("/signin");
    } else {
      setForms(getForms());
      setIsLoading(false);
    }
  }, [router]);

  const handleDelete = (id: string) => {
    deleteForm(id);
    setForms(getForms());
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}/pay/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
    return symbols[currency] || currency;
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
              <span className="text-xl font-bold tracking-tight text-white">PayForm</span>
            </Link>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25">
                <Plus className="mr-2 h-4 w-4" />
                Create Form
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl">My Payment Forms</h1>
            <p className="mt-2 text-slate-400">Manage and share your payment acceptance forms</p>
          </div>

          {forms.length === 0 ? (
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20 mb-4">
                  <CreditCard className="h-8 w-8 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No forms yet</h3>
                <p className="text-slate-400 mb-6 text-center max-w-md">
                  Create your first payment form to start accepting payments from your customers.
                </p>
                <Link href="/create">
                  <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Form
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {forms.map((form, index) => (
                <motion.div
                  key={form.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{form.businessName}</CardTitle>
                          <CardDescription className="text-slate-400">{form.name}</CardDescription>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20">
                          <span className="text-lg font-semibold text-violet-400">
                            {getCurrencySymbol(form.currency)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {form.upiId && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                            <Smartphone className="h-3 w-3" />
                            UPI
                          </span>
                        )}
                        {form.qrCodeUrl && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                            <QrCode className="h-3 w-3" />
                            QR Code
                          </span>
                        )}
                        {form.acceptInternational && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-400">
                            International
                          </span>
                        )}
                      </div>

                      {form.description && (
                        <p className="text-sm text-slate-400 line-clamp-2">{form.description}</p>
                      )}

                      <p className="text-xs text-slate-500">
                        Created {new Date(form.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/pay/${form.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" size="sm">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          size="sm"
                          onClick={() => copyLink(form.id)}
                        >
                          {copiedId === form.id ? (
                            <span className="text-green-400">Copied!</span>
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                          size="sm"
                          onClick={() => handleDelete(form.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}