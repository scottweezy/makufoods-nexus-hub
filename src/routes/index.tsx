import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MakuLogo } from "@/components/maku-logo";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAKU Foods Nexus" },
      { name: "description", content: "End-to-end operations platform for MAKU Foods — sales, production, deliveries, payroll, and analytics in one place." },
    ],
  }),
  component: Landing,
});

function Landing() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      window.location.replace(data.session ? "/app" : "/auth");
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-navy text-white">
      <MakuLogo />
      <Loader2 className="h-5 w-5 animate-spin opacity-60" />
    </div>
  );
}
