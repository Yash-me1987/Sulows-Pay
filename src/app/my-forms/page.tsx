"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ExternalLink, Copy, Trash2, QrCode, Smartphone, Bird } from "lucide-react";
import { getForms, deleteForm } from "@/lib/storage";
import { PaymentForm } from "@/lib/types";
import { getUserRole } from "@/lib/auth";

export default function MyFormsPage() {
  const router = useRouter();
  const [forms, setForms] = useState<PaymentForm[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    router.prefetch("/create");
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
    return (
      <div className="min-h-screen bg-zinc-50">
        <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900">
                  <Bird className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-semibold tracking-tight text-zinc-900">Tailows Pay</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-zinc-200 rounded"></div>
            <div className="h-4 w-96 bg-zinc-200 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                <Bird className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-zinc-900">Tailows Pay</span>
            </Link>
            <Link href="/create">
              <Button className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Form
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">My Payment Forms</h1>
            <p className="mt-2 text-zinc-600">Manage and share your payment acceptance forms</p>
          </div>

          {forms.length === 0 ? (
            <Card className="border-zinc-200 bg-white shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 mb-4">
                  <Bird className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">No forms yet</h3>
                <p className="text-zinc-600 mb-6 text-center max-w-md">
                  Create your first payment form to start accepting payments from your customers.
                </p>
                <Link href="/create">
                  <Button className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Form
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {forms.map((form) => (
                <div key={form.id}>
                  <Card className="border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-zinc-900 text-lg">{form.businessName}</CardTitle>
                          <CardDescription className="text-zinc-600">{form.name}</CardDescription>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                          <span className="text-lg font-semibold text-zinc-900">
                            {getCurrencySymbol(form.currency)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {form.upiId && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                            <Smartphone className="h-3 w-3" />
                            UPI
                          </span>
                        )}
                        {form.qrCodeUrl && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                            <QrCode className="h-3 w-3" />
                            QR Code
                          </span>
                        )}
                        {form.acceptInternational && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs text-violet-700">
                            International
                          </span>
                        )}
                      </div>

                      {form.description && (
                        <p className="text-sm text-zinc-600 line-clamp-2">{form.description}</p>
                      )}

                      <p className="text-xs text-zinc-500">
                        Created {new Date(form.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2 pt-2">
                        <Link href={`/pay/${form.id}`} className="flex-1">
                          <Button variant="outline" className="w-full border-zinc-300 text-zinc-700 hover:bg-zinc-100" size="sm">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                          size="sm"
                          onClick={() => copyLink(form.id)}
                        >
                          {copiedId === form.id ? (
                            <span className="text-emerald-600">Copied!</span>
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                          size="sm"
                          onClick={() => handleDelete(form.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}