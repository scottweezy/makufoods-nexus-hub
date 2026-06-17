import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getMe, type AppRole } from "@/lib/auth.functions";
import { getCeoDashboard } from "@/lib/dashboard.functions";
import { supabase } from "@/integrations/supabase/client";

import { MakuLogo } from "@/components/maku-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  Factory,
  Warehouse,
  Truck,
  DollarSign,
  UserCog,
  Briefcase,
  Settings,
  Bell,
  MessageSquare,
  Search,
  TrendingUp,
  ArrowUpRight,
  LogOut,
  Loader2,
  Sparkles,
  ClipboardList,
  MapPin,
  Navigation,
  CheckCircle2,
  Phone,
  MoreHorizontal,
  Home,
  ScanLine,
  FileText,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [{ title: "MAKU Foods Nexus" }] }),
  component: AppRoot,
});

function AppRoot() {
  const fetchMe = useServerFn(getMe);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-navy text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-brand-navy text-white">
        <p>Could not load your workspace.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const role: AppRole = data.primaryRole ?? "online_sales_rep";

  if (role === "online_sales_rep") return <SalesOfficerApp name={data.fullName ?? data.email ?? "Rep"} />;
  if (role === "driver") return <DriverApp name={data.fullName ?? data.email ?? "Driver"} />;
  if (role === "production_staff")
    return <PlaceholderRole name={data.fullName ?? "Production"} title="Production Workspace" message="Phase 8 will unlock production batches, material consumption and finished goods." />;

  // CEO / EA / Accountant / Marketing → desktop dashboard shell
  return <DashboardShell role={role} name={data.fullName ?? data.email ?? "Admin"} email={data.email} />;
}

/* ---------- DESKTOP DASHBOARD SHELL ---------- */

const NAV_ITEMS = [
  { title: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { title: "Analytics", icon: BarChart3, key: "analytics" },
  { title: "CRM", icon: Users, key: "crm" },
  { title: "Sales", icon: TrendingUp, key: "sales" },
  { title: "Orders", icon: ShoppingCart, key: "orders" },
  { title: "Production", icon: Factory, key: "production" },
  { title: "Inventory", icon: Package, key: "inventory" },
  { title: "Purchases", icon: ClipboardList, key: "purchases" },
  { title: "Warehouse", icon: Warehouse, key: "warehouse" },
  { title: "Logistics", icon: Truck, key: "logistics" },
  { title: "Finance", icon: DollarSign, key: "finance" },
  { title: "HR & Payroll", icon: UserCog, key: "hr" },
  { title: "Assets", icon: Briefcase, key: "assets" },
  { title: "Reports", icon: FileText, key: "reports" },
  { title: "Settings", icon: Settings, key: "settings" },
];

function DashboardShell({ role, name, email }: { role: AppRole; name: string; email: string | null }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon" className="border-r-0">
          <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
            <MakuLogo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.map((item, i) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton isActive={i === 0} className="data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-3">
            <SignOutButton />
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <TopBar name={name} email={email} role={role} />
          <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
            <CeoDashboard name={name} role={role} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function TopBar({ name, email, role }: { name: string; email: string | null; role: AppRole }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    [name],
  );
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <SidebarTrigger />
      <div className="hidden flex-1 md:flex md:max-w-xl">
        <div className="flex h-10 w-full items-center gap-2 rounded-full border bg-muted/40 px-4 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder="Search anything…"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 rounded-full border bg-card px-1 py-1 pr-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-red text-brand-red-foreground text-xs font-bold">
              {initials || "M"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-xs font-semibold">{name}</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {roleLabel(role)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function SignOutButton() {
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  return (
    <Button
      onClick={signOut}
      variant="ghost"
      className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
    >
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </Button>
  );
}

function roleLabel(role: AppRole) {
  return {
    ceo: "CEO",
    executive_assistant: "Executive Assistant",
    accountant: "Accountant",
    marketing_officer: "Marketing Officer",
    online_sales_rep: "Online Sales Rep",
    driver: "Driver",
    production_staff: "Production",
  }[role];
}

/* ---------- CEO DASHBOARD CONTENT ---------- */

function CeoDashboard({ name, role }: { name: string; role: AppRole }) {
  const fetchDashboard = useServerFn(getCeoDashboard);
  const { data } = useQuery({
    queryKey: ["ceo-dashboard"],
    queryFn: () => fetchDashboard(),
  });

  const firstName = name.split(" ")[0];
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="truncate text-2xl font-black md:text-3xl">
            {firstName} <span className="inline-block">👋</span>
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Here's what's happening with your business today — {roleLabel(role)}.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" className="hidden h-10 rounded-full md:inline-flex">
            <span className="text-xs font-medium">{today}</span>
          </Button>
          <Button className="h-10 rounded-full px-4 text-sm font-semibold">
            View Full Report <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {(data?.kpis ?? Array.from({ length: 8 })).map((kpi, i) => (
          <KpiCard key={i} kpi={kpi as any} index={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="col-span-1 bg-brand-navy text-brand-navy-foreground lg:col-span-2">
          <div className="flex items-center justify-between p-5">
            <h3 className="font-bold">Sales Overview</h3>
            <Tabs defaultValue="daily">
              <TabsList className="bg-white/10">
                <TabsTrigger value="daily" className="data-[state=active]:bg-brand-red data-[state=active]:text-brand-red-foreground">
                  Daily
                </TabsTrigger>
                <TabsTrigger value="weekly" className="text-white/70">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-white/70">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-72 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.salesSeries ?? []}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" stroke="oklch(0.7 0.02 250)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0.02 250)" fontSize={11} />
                <ReTooltip
                  contentStyle={{
                    background: "oklch(0.22 0.04 260)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 8,
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.62 0.22 25)"
                  strokeWidth={2}
                  fill="url(#salesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 font-bold">Live Business Activity</h3>
          {data?.activity?.length ? (
            <ul className="space-y-3">
              {data.activity.map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                  <div className="flex-1">
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.meta} · {a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<Sparkles className="h-5 w-5" />}
              title="No activity yet"
              body="Orders, payments and deliveries will stream in here in real time."
            />
          )}
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-l-4 border-l-brand-red bg-accent/40 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-bold">
            <Sparkles className="h-4 w-4 text-brand-red" /> AI Insights
          </h3>
          <Badge variant="outline" className="border-brand-red text-brand-red">
            Ask AI
          </Badge>
        </div>
        <ul className="space-y-2 text-sm">
          {(data?.insights ?? []).map((insight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand-red" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function KpiCard({ kpi, index }: { kpi: { label: string; value: string; delta: string | null }; index: number }) {
  if (!kpi || !kpi.label) {
    return <div className="kpi-card h-32 animate-pulse bg-muted/40" />;
  }
  const colors = [
    "oklch(0.62 0.18 150)",
    "oklch(0.55 0.2 265)",
    "oklch(0.55 0.22 305)",
    "oklch(0.78 0.15 80)",
    "oklch(0.58 0.22 25)",
    "oklch(0.62 0.18 150)",
    "oklch(0.55 0.2 265)",
    "oklch(0.78 0.15 80)",
  ];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {kpi.label}
          </p>
          <p className="mt-1 text-xl font-black md:text-2xl">{kpi.value}</p>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {kpi.delta ?? "no change vs yesterday"}
          </p>
        </div>
        <div className="h-12 w-20 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[1, 2, 1.5, 3, 2, 4, 3].map((v) => ({ v }))}>
              <Area type="monotone" dataKey="v" stroke={colors[index % colors.length]} fill={colors[index % colors.length]} fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center">
      <div className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground">
        {icon}
      </div>
      <p className="font-medium">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">{body}</p>
    </div>
  );
}

/* ---------- SALES OFFICER MOBILE APP ---------- */

function SalesOfficerApp({ name }: { name: string }) {
  return (
    <MobileShell>
      <header className="px-5 pt-6">
        <p className="text-xs uppercase tracking-widest text-white/60">Good morning</p>
        <h1 className="text-2xl font-black">{name.split(" ")[0]} 👋</h1>
      </header>

      <section className="mx-5 mt-6 rounded-2xl bg-white/5 p-4 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Today's Summary
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-white/60">Orders</p>
            <p className="text-2xl font-black">0</p>
          </div>
          <div>
            <p className="text-xs text-white/60">Sales (GHS)</p>
            <p className="text-2xl font-black">0.00</p>
          </div>
        </div>
      </section>

      <section className="mx-5 mt-4 rounded-2xl bg-white/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Daily Target</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Target</p>
            <p className="text-lg font-bold">GHS 10,000</p>
          </div>
          <ProgressRing value={0} />
        </div>
      </section>

      <section className="mx-5 mt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
          Quick Actions
        </p>
        <div className="grid grid-cols-3 gap-3">
          <QuickAction icon={<ShoppingCart className="h-5 w-5" />} label="New Order" />
          <QuickAction icon={<Users className="h-5 w-5" />} label="Customers" />
          <QuickAction icon={<Wallet className="h-5 w-5" />} label="Collections" />
          <QuickAction icon={<Package className="h-5 w-5" />} label="Products" />
          <QuickAction icon={<ClipboardList className="h-5 w-5" />} label="Visit Report" />
          <QuickAction icon={<MoreHorizontal className="h-5 w-5" />} label="More" />
        </div>
      </section>

      <BottomNav
        items={[
          { icon: <Home className="h-5 w-5" />, label: "Home", active: true },
          { icon: <ShoppingCart className="h-5 w-5" />, label: "Orders" },
          { icon: <Users className="h-5 w-5" />, label: "Customers" },
          { icon: <MoreHorizontal className="h-5 w-5" />, label: "More" },
        ]}
      />
    </MobileShell>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 text-xs font-medium text-white/90 transition hover:bg-white/10">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-red/20 text-brand-red">
        {icon}
      </div>
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}

function ProgressRing({ value }: { value: number }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r={r} stroke="oklch(1 0 0 / 0.1)" strokeWidth="6" fill="none" />
        <circle
          cx="32"
          cy="32"
          r={r}
          stroke="oklch(0.62 0.22 25)"
          strokeWidth="6"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-bold">{value}%</span>
    </div>
  );
}

/* ---------- DRIVER MOBILE APP ---------- */

function DriverApp({ name }: { name: string }) {
  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pt-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-success">● On Delivery</p>
          <h1 className="mt-1 text-lg font-bold">Truck 02 · GW 4536-22</h1>
        </div>
        <Button size="icon" variant="ghost" className="text-white">
          <Phone className="h-5 w-5" />
        </Button>
      </header>

      {/* Map placeholder */}
      <div className="mx-5 mt-4 h-48 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-leaf/30 via-white/5 to-brand-red/20">
        <div className="flex h-full items-center justify-center text-white/60">
          <MapPin className="mr-2 h-5 w-5" /> Live map (Google Maps wires in Phase 11)
        </div>
      </div>

      <section className="mx-5 mt-4 rounded-2xl bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">Current Delivery</p>
            <p className="font-bold">No active delivery</p>
            <p className="text-xs text-white/60">Assignments from EA will appear here.</p>
          </div>
          <Badge className="bg-success text-success-foreground">Ready</Badge>
        </div>
      </section>

      <section className="mx-5 mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Pending Stops</p>
          <p className="mt-1 text-2xl font-black">0</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wider text-white/60">Distance Left</p>
          <p className="mt-1 text-2xl font-black">0 KM</p>
        </div>
      </section>

      <BottomNav
        items={[
          { icon: <Home className="h-5 w-5" />, label: "Home", active: true },
          { icon: <Navigation className="h-5 w-5" />, label: "Route" },
          { icon: <ScanLine className="h-5 w-5" />, label: "Scan" },
          { icon: <MoreHorizontal className="h-5 w-5" />, label: "More" },
        ]}
      />
    </MobileShell>
  );
}

/* ---------- MOBILE SHELL ---------- */

function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-brand-navy pb-24 text-brand-navy-foreground">
        <div className="flex items-center justify-between px-5 pt-3 text-[10px] uppercase tracking-widest text-white/40">
          <MakuLogo showWordmark={false} />
          <SignOutPill />
        </div>
        {children}
      </div>
    </div>
  );
}

function SignOutPill() {
  const navigate = useNavigate();
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }
  return (
    <button
      onClick={signOut}
      className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/70 hover:bg-white/10"
    >
      Sign out
    </button>
  );
}

function BottomNav({ items }: { items: { icon: React.ReactNode; label: string; active?: boolean }[] }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md border-t border-white/10 bg-brand-navy/95 px-3 py-2 backdrop-blur">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 rounded-lg py-2 text-[10px] font-semibold uppercase tracking-wider ${
              item.active ? "text-brand-red" : "text-white/60"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ---------- PLACEHOLDER ROLE ---------- */

function PlaceholderRole({ name, title, message }: { name: string; title: string; message: string }) {
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand-red/20 text-brand-red">
          <Factory className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-black">{title}</h1>
        <p className="mt-2 text-sm text-white/70">Hi {name.split(" ")[0]} — {message}</p>
      </div>
    </MobileShell>
  );
}
