"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Check, Globe, Smartphone, Bird, User } from "lucide-react";
import { motion } from "framer-motion";
import { addForm, generateId } from "@/lib/storage";
import { PaymentForm } from "@/lib/types";
import { getUserRole } from "@/lib/auth";

export default function CreateFormPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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

  useEffect(() => {
    const role = getUserRole();
    if (role !== "acceptor") {
      router.push("/signin");
    } else {
      setIsLoading(false);
    }
  }, [router]);

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

  if (isLoading) {
    return null;
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
            <Link href="/">
              <Button variant="ghost" className="text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">Create Payment Form</h1>
            <p className="mt-2 text-zinc-600">Fill in your details to create a custom payment acceptance form</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card className="border-zinc-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    Personal Details
                  </CardTitle>
                  <CardDescription className="text-zinc-600">Your contact information for the payment form</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-700">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-700">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-zinc-700">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-zinc-700">Business/Brand Name *</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="My Business"
                        className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-zinc-700">Payment Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="What is this payment for? (e.g., Services, Products, Consultation fees)"
                      className="min-h-20 border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                      <Smartphone className="h-4 w-4 text-emerald-700" />
                    </div>
                    Payment Details
                  </CardTitle>
                  <CardDescription className="text-zinc-600">Add your UPI ID and/or QR code for receiving payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="upiId" className="text-zinc-700">UPI ID</Label>
                    <Input
                      id="upiId"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      placeholder="yourname@upi"
                      className="border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400"
                    />
                    <p className="text-xs text-zinc-500">Enter your verified UPI ID (e.g., name@okaxis, name@paytm)</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-700">Payment QR Code</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-8 text-center transition-colors hover:border-zinc-400 hover:bg-zinc-100"
                    >
                      {qrPreview ? (
                        <div className="flex flex-col items-center gap-4">
                          <img src={qrPreview} alt="QR Preview" className="h-40 w-40 rounded-lg object-contain" />
                          <p className="text-sm text-emerald-600">QR Code uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200">
                            <Upload className="h-6 w-6 text-zinc-600" />
                          </div>
                          <p className="text-sm text-zinc-600">Click to upload your payment QR code</p>
                          <p className="text-xs text-zinc-500">PNG, JPG up to 5MB</p>
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

              <Card className="border-zinc-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <Globe className="h-4 w-4 text-blue-700" />
                    </div>
                    International Settings
                  </CardTitle>
                  <CardDescription className="text-zinc-600">Configure currency and international payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-zinc-700">Primary Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value: "INR" | "USD" | "EUR" | "GBP") => setFormData((prev) => ({ ...prev, currency: value }))}
                    >
                      <SelectTrigger className="border-zinc-200 bg-white text-zinc-900">
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

                  <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                    <div>
                      <p className="font-medium text-zinc-900">Accept International Payments</p>
                      <p className="text-sm text-zinc-600">Enable card and net banking for international customers</p>
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
                  <Button type="button" variant="outline" className="w-full h-12 border-zinc-300 text-zinc-700 hover:bg-zinc-100">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1 h-12 bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 shadow-sm"
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