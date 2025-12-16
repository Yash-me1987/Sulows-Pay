"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bird, Store, User, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as "user" | "acceptor" | null;

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!role || (role !== "user" && role !== "acceptor"))) {
      router.push("/signin");
    } else if (mounted) {
      router.prefetch("/");
      router.prefetch("/my-forms");
    }
  }, [role, router, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: dbError } = await supabase
        .from("users")
        .insert([
          {
            role,
            name: formData.name,
            email: formData.email,
            mobile_number: formData.mobileNumber,
            location: formData.location,
          },
        ])
        .select()
        .single();

      if (dbError) {
        if (dbError.code === "23505") {
          setError("Email already exists. Please use a different email.");
        } else {
          setError(dbError.message);
        }
        setLoading(false);
        return;
      }

        if (typeof window !== "undefined") {
          localStorage.setItem("user_role", role!);
          localStorage.setItem("user_id", data.id);
          localStorage.setItem("user_name", formData.name);
        }

        router.push("/profile");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!mounted) {
    return null;
  }

  if (!role) return null;

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
        <div className="w-full max-w-md">
          <Card className="border-zinc-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 shadow-lg">
                {role === "acceptor" ? (
                  <Store className="h-8 w-8 text-white" />
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <CardTitle className="text-zinc-900 text-2xl mb-2">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-zinc-600">
                {role === "acceptor"
                  ? "Setup your payment acceptor account"
                  : "Setup your user account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-900">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-zinc-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-900">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-zinc-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber" className="text-zinc-900">
                    Mobile Number
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="border-zinc-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-zinc-900">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="border-zinc-300"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/signin"
                  className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  ← Back to role selection
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}