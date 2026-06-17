import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MakuLogo } from "@/components/maku-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{ title: "Reset password — MAKU Foods Nexus" }],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated. Signing you in…");
    window.location.assign("/app");
  }

  return (
    <div className="min-h-screen bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-10">
        <MakuLogo />
        <div className="my-10">
          <h1 className="text-3xl font-black">Set a new password</h1>
          <p className="mt-2 text-sm text-white/70">
            Enter the new password for your MAKU account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-white/60">
              New password
            </Label>
            <Input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
            />
          </div>
          <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
