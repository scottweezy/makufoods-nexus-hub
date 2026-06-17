import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MakuLogo } from "@/components/maku-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — MAKU Foods Nexus" },
      { name: "description", content: "Sign in to the MAKU Foods operations platform." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.replace("/app");
      }
    });
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    window.location.assign("/app");
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. You can sign in now.");
    setMode("signin");
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Reset link sent. Check your inbox.");
    setMode("signin");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-navy text-brand-navy-foreground">
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-brand-red/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-leaf/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <MakuLogo />
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80">
            Nexus
          </span>
        </div>

        <div className="mt-12 mb-6">
          <h1 className="text-3xl font-black leading-tight">
            {mode === "signin" && "Welcome back."}
            {mode === "signup" && "Join the team."}
            {mode === "forgot" && "Reset password"}
          </h1>
          <p className="mt-2 text-sm text-white/70">
            {mode === "signin" && "Sign in to your MAKU workspace."}
            {mode === "signup" && "The first account becomes the CEO workspace."}
            {mode === "forgot" && "We'll email you a secure reset link."}
          </p>
        </div>

        {mode !== "forgot" && (
          <Tabs value={mode} onValueChange={(v) => setMode(v as "signin" | "signup")} className="mb-4">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 text-white/70">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:text-brand-navy">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-brand-navy">
                Create account
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                <Field icon={<Mail className="h-4 w-4" />} label="Email">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@maku.foods"
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                  />
                </Field>
                <Field icon={<Lock className="h-4 w-4" />} label="Password">
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                  />
                </Field>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white hover:underline"
                >
                  Forgot password?
                </button>
                <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
                </Button>
                <button
                  type="button"
                  disabled
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 text-sm font-medium text-white/50"
                  title="Biometric login coming in Phase 2"
                >
                  <Fingerprint className="h-4 w-4" /> Biometric login (coming soon)
                </button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 pt-4">
                <Field icon={<User className="h-4 w-4" />} label="Full name">
                  <Input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ama Mensah"
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                  />
                </Field>
                <Field icon={<Mail className="h-4 w-4" />} label="Email">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@maku.foods"
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                  />
                </Field>
                <Field icon={<Lock className="h-4 w-4" />} label="Password">
                  <Input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                  />
                </Field>
                <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create account"}
                </Button>
                <p className="text-center text-xs text-white/50">
                  After Phase 2, registration becomes admin-controlled by invite.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        )}

        {mode === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-4">
            <Field icon={<Mail className="h-4 w-4" />} label="Email">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@maku.foods"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
              />
            </Field>
            <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send reset link"}
            </Button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="block w-full text-center text-sm text-white/60 hover:text-white"
            >
              Back to sign in
            </button>
          </form>
        )}

        <p className="mt-auto pt-10 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} MAKU Foods. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-white/60">
        <span className="inline-flex items-center gap-1.5">
          {icon}
          {label}
        </span>
      </Label>
      {children}
    </div>
  );
}
