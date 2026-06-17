import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AppRole =
  | "ceo"
  | "executive_assistant"
  | "accountant"
  | "marketing_officer"
  | "online_sales_rep"
  | "driver"
  | "production_staff";

export interface MeResponse {
  userId: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  phone: string | null;
  roles: AppRole[];
  primaryRole: AppRole | null;
}

const ROLE_PRIORITY: AppRole[] = [
  "ceo",
  "executive_assistant",
  "accountant",
  "marketing_officer",
  "online_sales_rep",
  "driver",
  "production_staff",
];

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MeResponse> => {
    const { supabase, userId, claims } = context;

    const [profileRes, rolesRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, avatar_url, phone")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId),
    ]);

    const roles = (rolesRes.data ?? []).map((r) => r.role as AppRole);
    const primaryRole =
      ROLE_PRIORITY.find((r) => roles.includes(r)) ?? null;

    return {
      userId,
      email: (claims.email as string | undefined) ?? null,
      fullName: profileRes.data?.full_name ?? null,
      avatarUrl: profileRes.data?.avatar_url ?? null,
      phone: profileRes.data?.phone ?? null,
      roles,
      primaryRole,
    };
  });
