"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bird, Store, User, Mail, Phone, MapPin, LogOut, Edit2, Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  const [userProfile, setUserProfile] = useState({
    id: "",
    role: "",
    name: "",
    email: "",
    mobile_number: "",
    location: "",
    created_at: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    mobile_number: "",
    location: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const userId = localStorage.getItem("user_id");
    const userRole = localStorage.getItem("user_role");

    if (!userId || !userRole) {
      router.push("/signin");
      return;
    }

    loadUserProfile(userId);
  }, [mounted, router]);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (dbError) {
        setError("Failed to load profile");
        setLoading(false);
        return;
      }

      setUserProfile(data);
      setEditData({
        name: data.name,
        mobile_number: data.mobile_number,
        location: data.location,
      });
      setLoading(false);
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: userProfile.name,
      mobile_number: userProfile.mobile_number,
      location: userProfile.location,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: userProfile.name,
      mobile_number: userProfile.mobile_number,
      location: userProfile.location,
    });
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      const { error: dbError } = await supabase
        .from("users")
        .update({
          name: editData.name,
          mobile_number: editData.mobile_number,
          location: editData.location,
        })
        .eq("id", userProfile.id);

      if (dbError) {
        setError(dbError.message);
        setSaving(false);
        return;
      }

      localStorage.setItem("user_name", editData.name);

      setUserProfile({
        ...userProfile,
        name: editData.name,
        mobile_number: editData.mobile_number,
        location: editData.location,
      });

      setIsEditing(false);
      setSaving(false);
    } catch (err) {
      setError("Failed to update profile");
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  if (!mounted || loading) {
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
        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-zinc-200 rounded"></div>
            <div className="h-96 bg-zinc-200 rounded"></div>
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
            <div className="flex items-center gap-3">
              {userProfile.role === "acceptor" && (
                <Link href="/my-forms">
                  <Button variant="outline" className="border-zinc-300 text-zinc-700 hover:bg-zinc-100">
                    My Forms
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">Account Profile</h1>
          <p className="mt-2 text-zinc-600">Manage your account information</p>
        </div>

        <Card className="border-zinc-200 shadow-lg">
          <CardHeader className="border-b border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 shadow-lg">
                  {userProfile.role === "acceptor" ? (
                    <Store className="h-8 w-8 text-white" />
                  ) : (
                    <User className="h-8 w-8 text-white" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-zinc-900 text-2xl">
                    {userProfile.name}
                  </CardTitle>
                  <CardDescription className="text-zinc-600 capitalize mt-1">
                    {userProfile.role === "acceptor" ? "Payment Acceptor" : "User"}
                  </CardDescription>
                </div>
              </div>
              {!isEditing && (
                <Button
                  onClick={handleEdit}
                  className="bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-zinc-700 font-medium">Full Name</Label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="border-zinc-300"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg">
                      <User className="h-4 w-4 text-zinc-600" />
                      <span className="text-zinc-900">{userProfile.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-700 font-medium">Email Address</Label>
                  <div className="flex items-center gap-3 px-3 py-2 bg-zinc-100 border border-zinc-300 rounded-lg cursor-not-allowed opacity-60">
                    <Mail className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-700">{userProfile.email}</span>
                  </div>
                  <p className="text-xs text-zinc-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-700 font-medium">Mobile Number</Label>
                  {isEditing ? (
                    <Input
                      name="mobile_number"
                      value={editData.mobile_number}
                      onChange={handleChange}
                      className="border-zinc-300"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg">
                      <Phone className="h-4 w-4 text-zinc-600" />
                      <span className="text-zinc-900">{userProfile.mobile_number}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-700 font-medium">Location</Label>
                  {isEditing ? (
                    <Input
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                      className="border-zinc-300"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg">
                      <MapPin className="h-4 w-4 text-zinc-600" />
                      <span className="text-zinc-900">{userProfile.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200">
                <p className="text-sm text-zinc-500">
                  Account created on {new Date(userProfile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-zinc-900 text-white hover:bg-zinc-800"
                  >
                    {saving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    disabled={saving}
                    variant="outline"
                    className="flex-1 border-zinc-300 text-zinc-700 hover:bg-zinc-100"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {userProfile.role === "acceptor" && (
          <div className="mt-8">
            <Card className="border-zinc-200 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold mb-2">Ready to accept payments?</h3>
                <p className="text-zinc-300 mb-6">
                  Create payment forms and start receiving payments from your customers.
                </p>
                <Link href="/my-forms">
                  <Button className="bg-white text-zinc-900 hover:bg-zinc-100">
                    Go to My Forms
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
