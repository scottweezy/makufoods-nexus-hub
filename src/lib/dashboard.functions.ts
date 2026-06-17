import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface CeoKpi {
  label: string;
  value: string;
  delta: string | null;
  trend: "up" | "down" | "flat";
  series: number[];
}

export interface CeoDashboardData {
  kpis: CeoKpi[];
  salesSeries: { label: string; value: number }[];
  topProducts: { name: string; value: number }[];
  activity: { id: string; title: string; meta: string; time: string }[];
  insights: string[];
}

// Empty/zero-state shape — real data wires up in later phases.
export const getCeoDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async (): Promise<CeoDashboardData> => {
    return {
      kpis: [
        { label: "Revenue Today", value: "GHS 0.00", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Revenue This Month", value: "GHS 0.00", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Orders Today", value: "0", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Outstanding Invoices", value: "GHS 0.00", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Cash Available", value: "GHS 0.00", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Payroll Due", value: "GHS 0.00", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Production Status", value: "Idle", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
        { label: "Inventory Value", value: "GHS 0.00", delta: null, trend: "flat", series: [0, 0, 0, 0, 0, 0, 0] },
      ],
      salesSeries: [
        { label: "12 AM", value: 0 },
        { label: "04 AM", value: 0 },
        { label: "08 AM", value: 0 },
        { label: "12 PM", value: 0 },
        { label: "04 PM", value: 0 },
        { label: "08 PM", value: 0 },
      ],
      topProducts: [],
      activity: [],
      insights: [
        "Connect your first products in the Inventory module to start tracking sales.",
        "Add team members in Employees to enable role-based dashboards across MAKU.",
      ],
    };
  });
