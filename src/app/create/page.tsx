"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, ArrowLeft, Upload, Check, Globe, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { addForm, generateId } from "@/lib/storage";
import { PaymentForm } from "@/lib/types";

export default function CreateFormPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    upiId: "",
    qrCodeUrl: "",
    businessName: "",
    description: "",
    currency: "INR" as "INR" | "USD" | "EUR" | "GBP",
    acceptInternational: false,
  });

  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setQrPreview(result);
        setFormData((prev) => ({ ...prev, qrCodeUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newForm: PaymentForm = {
      id: generateId(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    
    addForm(newForm);
    router.push(`/my-forms`);
  };

  const isFormValid = formData.name && formData.email && formData.businessName && (formData.upiId || formData.qrCodeUrl);

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
            <Link href="/">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white md:text-4xl">Create Payment Form</h1>
            <p className="mt-2 text-slate-400">Fill in your details to create a custom payment acceptance form</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
                      <CreditCard className="h-4 w-4 text-violet-400" />
                    </div>
                    Personal Details
                  </CardTitle>
                  <CardDescription className="text-slate-400">Your contact information for the payment form</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-slate-300">Business/Brand Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="My Business"
                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-300">Payment Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="What is this payment for? (e.g., Services, Products, Consultation fees)"
                      className="min-h-20 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20">
                      <Smartphone className="h-4 w-4 text-green-400" />
                    </div>
                    Payment Details
                  </CardTitle>
                  <CardDescription className="text-slate-400">Add your UPI ID and/or QR code for receiving payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="upiId" className="text-slate-300">UPI ID</Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      placeholder="yourname@upi"
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                    />
                    <p className="text-xs text-slate-500">Enter your verified UPI ID (e.g., name@okaxis, name@paytm)</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Payment QR Code</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-8 text-center transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
                    >
                      {qrPreview ? (
                        <div className="flex flex-col items-center gap-4">
                          <img src={qrPreview} alt="QR Preview" className="h-40 w-40 rounded-lg object-contain" />
                          <p className="text-sm text-green-400">QR Code uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                            <Upload className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-slate-400">Click to upload your payment QR code</p>
                          <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleQrUpload}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                      <Globe className="h-4 w-4 text-blue-400" />
                    </div>
                    International Settings
                  </CardTitle>
                  <CardDescription className="text-slate-400">Configure currency and international payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Primary Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value: "INR" | "USD" | "EUR" | "GBP") => setFormData((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger className="border-white/10 bg-white/5 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                    <div>
                      <p className="font-medium text-white">Accept International Payments</p>
                      <p className="text-sm text-slate-400">Enable card and net banking for international customers</p>
                    </div>
                    <Switch
                      checked={formData.acceptInternational}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptInternational: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Create Payment Form
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
