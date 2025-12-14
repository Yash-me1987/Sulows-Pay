"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, QrCode, Building2, ArrowLeft, Check, AlertCircle, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { getFormById } from "@/lib/storage";
import { PaymentForm } from "@/lib/types";

const getCurrencySymbol = (currency: string) => {
  const symbols: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
  return symbols[currency] || currency;
};

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [form, setForm] = useState<PaymentForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [netBankingBank, setNetBankingBank] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = getFormById(resolvedParams.id);
    setForm(data || null);
    setLoading(false);
    if (data?.upiId) setSelectedMethod("upi");
    else if (data?.qrCodeUrl) setSelectedMethod("qr");
    else if (data?.acceptInternational) setSelectedMethod("card");
  }, [resolvedParams.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyUpiId = () => {
    if (form?.upiId) {
      navigator.clipboard.writeText(form.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 mb-6">
            <AlertCircle className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Form Not Found</h1>
          <p className="text-slate-400 mb-6 text-center">The payment form you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 mb-6"
          >
            <Check className="h-12 w-12 text-green-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Initiated!</h1>
          <p className="text-slate-400 mb-2 text-center max-w-md">
            {selectedMethod === "upi" || selectedMethod === "qr"
              ? "Please complete the payment using your UPI app."
              : "Your payment is being processed."}
          </p>
          <p className="text-lg font-semibold text-violet-400 mb-6">
            {getCurrencySymbol(form.currency)}{paymentData.amount} to {form.businessName}
          </p>
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

      <main className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">{form.businessName}</h1>
            <p className="mt-1 text-slate-400">Pay to {form.name}</p>
            {form.description && (
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">{form.description}</p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <CardHeader>
                <CardTitle className="text-white">Payment Details</CardTitle>
                <CardDescription className="text-slate-400">Enter your details and amount</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Your Name</Label>
                    <Input
                      id="name"
                      value={paymentData.name}
                      onChange={(e) => setPaymentData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your full name"
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => setPaymentData((p) => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-300">Amount ({form.currency})</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      {getCurrencySymbol(form.currency)}
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData((p) => ({ ...p, amount: e.target.value }))}
                      placeholder="0.00"
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 pl-8"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <CardHeader>
                <CardTitle className="text-white">Payment Method</CardTitle>
                <CardDescription className="text-slate-400">Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
                  <TabsList className="grid w-full grid-cols-4 bg-white/5">
                    {form.upiId && (
                      <TabsTrigger value="upi" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
                        <Smartphone className="mr-2 h-4 w-4" />
                        UPI
                      </TabsTrigger>
                    )}
                    {form.qrCodeUrl && (
                      <TabsTrigger value="qr" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
                        <QrCode className="mr-2 h-4 w-4" />
                        QR
                      </TabsTrigger>
                    )}
                    {form.acceptInternational && (
                      <>
                        <TabsTrigger value="card" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Card
                        </TabsTrigger>
                        <TabsTrigger value="netbanking" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
                          <Building2 className="mr-2 h-4 w-4" />
                          Bank
                        </TabsTrigger>
                      </>
                    )}
                  </TabsList>

                  {form.upiId && (
                    <TabsContent value="upi" className="mt-6">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                        <p className="text-slate-400 mb-4">Pay using UPI ID</p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <code className="rounded-lg bg-violet-500/20 px-4 py-2 text-lg font-mono text-violet-300">
                            {form.upiId}
                          </code>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={copyUpiId}
                            className="text-slate-400 hover:text-white"
                          >
                            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-sm text-slate-500">
                          Copy the UPI ID and pay using any UPI app like Google Pay, PhonePe, Paytm, etc.
                        </p>
                      </div>
                    </TabsContent>
                  )}

                  {form.qrCodeUrl && (
                    <TabsContent value="qr" className="mt-6">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                        <p className="text-slate-400 mb-4">Scan QR Code to Pay</p>
                        <div className="mx-auto mb-4 inline-block rounded-xl bg-white p-4">
                          <img src={form.qrCodeUrl} alt="Payment QR" className="h-48 w-48 object-contain" />
                        </div>
                        <p className="text-sm text-slate-500">
                          Open your UPI app and scan this QR code to make the payment
                        </p>
                      </div>
                    </TabsContent>
                  )}

                  {form.acceptInternational && (
                    <>
                      <TabsContent value="card" className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Card Number</Label>
                          <Input
                            value={cardData.number}
                            onChange={(e) => setCardData((c) => ({ ...c, number: e.target.value }))}
                            placeholder="1234 5678 9012 3456"
                            className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label className="text-slate-300">Expiry</Label>
                            <Input
                              value={cardData.expiry}
                              onChange={(e) => setCardData((c) => ({ ...c, expiry: e.target.value }))}
                              placeholder="MM/YY"
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300">CVV</Label>
                            <Input
                              value={cardData.cvv}
                              onChange={(e) => setCardData((c) => ({ ...c, cvv: e.target.value }))}
                              placeholder="123"
                              type="password"
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-300">Cardholder Name</Label>
                            <Input
                              value={cardData.name}
                              onChange={(e) => setCardData((c) => ({ ...c, name: e.target.value }))}
                              placeholder="Name on card"
                              className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="netbanking" className="mt-6">
                        <div className="space-y-4">
                          <p className="text-slate-400">Select your bank</p>
                          <div className="grid grid-cols-2 gap-3">
                            {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "Yes Bank"].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => setNetBankingBank(bank)}
                                className={`rounded-lg border p-4 text-left transition-all ${
                                  netBankingBank === bank
                                    ? "border-violet-500 bg-violet-500/20 text-white"
                                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                                }`}
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </>
                  )}
                </Tabs>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={!paymentData.name || !paymentData.email || !paymentData.amount}
              className="w-full h-14 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50"
            >
              Pay {getCurrencySymbol(form.currency)}{paymentData.amount || "0"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Secured payment. Your payment details are encrypted and secure.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
