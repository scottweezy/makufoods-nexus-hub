import { createFileRoute, Link } from "@tanstack/react-router";
import { MakuLogo } from "@/components/maku-logo";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Brain,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Cloud,
  CreditCard,
  DollarSign,
  Factory,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Navigation,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Sun,
  TrendingUp,
  Truck,
  UserCog,
  Users,
  Wallet,
  Warehouse,
  Wifi,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAKU Foods Nexus — All-in-one Business Operations" },
      {
        name: "description",
        content:
          "MAKU Foods Nexus is the all-in-one operations platform: sales, production, inventory, logistics, payroll, and AI insights — built mobile-first for Ghana's food industry.",
      },
      { property: "og:title", content: "MAKU Foods Nexus" },
      {
        property: "og:description",
        content:
          "End-to-end operations: CEO dashboard, field sales, driver routing, AI insights — one app for the whole business.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top utility bar */}
      <div className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 md:px-6">
          <MakuLogo />
          <nav className="ml-auto hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#dashboard" className="hover:text-brand-red">Dashboard</a>
            <a href="#mobile" className="hover:text-brand-red">Mobile Apps</a>
            <a href="#flow" className="hover:text-brand-red">Process Flow</a>
            <a href="#features" className="hover:text-brand-red">Features</a>
          </nav>
          <Link
            to="/auth"
            className="ml-auto md:ml-0 rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-brand-red-foreground shadow-[var(--shadow-glow-brand)] hover:brightness-110"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* ===== HERO: Admin dashboard + two phones (mirrors the mockup) ===== */}
      <section id="dashboard" className="mx-auto max-w-[1600px] px-2 md:px-4 pt-4">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_360px]">
          <AdminMockup />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <SalesPhone />
            <DriverPhone />
            <AiInsightsCard className="sm:col-span-2 xl:col-span-1" />
          </div>
        </div>
      </section>

      {/* ===== Process flow band ===== */}
      <ProcessFlow />

      {/* ===== Feature bar ===== */}
      <FeatureBar />

      {/* ===== Footer CTA ===== */}
      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} MAKU Foods. All rights reserved.</p>
          <p>Built for Ghana's food industry · Mobile-first · AI-powered</p>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   ADMIN DASHBOARD MOCKUP (left side of the hero)
   ============================================================ */

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: LineChart, label: "Analytics" },
  { icon: Users, label: "CRM" },
  { icon: TrendingUp, label: "Sales" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Factory, label: "Production" },
  { icon: Package, label: "Inventory" },
  { icon: ClipboardList, label: "Purchases" },
  { icon: ShieldCheck, label: "Quality Control" },
  { icon: Warehouse, label: "Warehouse" },
  { icon: Truck, label: "Logistics" },
  { icon: DollarSign, label: "Finance" },
  { icon: UserCog, label: "HR & Payroll" },
  { icon: Briefcase, label: "Assets" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

const KPIS = [
  { label: "Total Revenue", value: "GHS 125,560.00", delta: "18.5%", color: "var(--brand-leaf)" },
  { label: "Total Orders", value: "1,245", delta: "12.3%", color: "var(--chart-3)" },
  { label: "Production Today", value: "5,340 Units", delta: "8.2%", color: "var(--chart-5)" },
  { label: "Total Customers", value: "3,892", delta: "15.7%", color: "var(--brand-gold)" },
  { label: "Gross Profit", value: "GHS 45,780.00", delta: "20.5%", color: "var(--brand-leaf)" },
];

function AdminMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-[var(--shadow-elevated)]">
      <div className="flex min-h-[860px]">
        {/* Sidebar */}
        <aside className="hidden w-[200px] shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
          <div className="border-b border-sidebar-border p-4">
            <MakuLogo variant="light" />
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {SIDEBAR_ITEMS.map((it) => (
              <button
                key={it.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  it.active
                    ? "bg-brand-red text-brand-red-foreground shadow-[var(--shadow-glow-brand)]"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <it.icon className="h-4 w-4" />
                <span className="truncate">{it.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col bg-muted/30">
          {/* Top bar */}
          <header className="flex h-14 items-center gap-3 border-b bg-card px-4">
            <div className="hidden flex-1 md:flex md:max-w-md">
              <div className="flex h-9 w-full items-center gap-2 rounded-full border bg-muted/50 px-3 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>Search anything…</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Mail className="h-5 w-5 text-muted-foreground" />
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <Sun className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-center gap-2 rounded-full border bg-background px-2 py-1">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-red text-[10px] font-bold text-brand-red-foreground">
                  SA
                </div>
                <div className="hidden text-left leading-tight md:block">
                  <p className="text-[11px] font-semibold">Super Admin</p>
                  <p className="text-[9px] uppercase tracking-wide text-muted-foreground">Admin</p>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          </header>

          <div className="space-y-4 p-4 md:p-5">
            {/* Welcome row */}
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Welcome back,</p>
                <h2 className="text-2xl font-black md:text-3xl">
                  Super Admin <span>👋</span>
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Here's what is happening with your business today.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs font-medium">
                  <CalendarDays className="h-4 w-4" /> 17 June 2025
                  <ChevronDown className="h-3 w-3" />
                </button>
                <button className="rounded-lg bg-brand-red px-4 py-2 text-xs font-semibold text-brand-red-foreground shadow-[var(--shadow-glow-brand)]">
                  View Full Report
                </button>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {KPIS.map((k) => (
                <div key={k.label} className="kpi-card">
                  <p className="text-[11px] font-medium text-muted-foreground">{k.label}</p>
                  <p className="mt-1 text-base font-black md:text-lg">{k.value}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold" style={{ color: k.color as string }}>
                      ↑ {k.delta}
                      <span className="ml-1 font-normal text-muted-foreground">vs yesterday</span>
                    </p>
                    <div className="h-8 w-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spark()}>
                          <Area type="monotone" dataKey="v" stroke={k.color as string} fill={k.color as string} fillOpacity={0.2} strokeWidth={1.5} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sales overview + donut + activity */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1.1fr]">
              {/* Sales overview */}
              <div className="rounded-2xl bg-brand-navy p-4 text-brand-navy-foreground shadow-[var(--shadow-elevated)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">Sales Overview</h3>
                  <div className="flex rounded-lg bg-white/10 p-0.5 text-[11px]">
                    <span className="rounded-md bg-brand-red px-3 py-1 font-semibold text-brand-red-foreground">Daily</span>
                    <span className="px-3 py-1 text-white/70">Weekly</span>
                    <span className="px-3 py-1 text-white/70">Monthly</span>
                  </div>
                </div>
                <div className="mt-3 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesCurve}>
                      <defs>
                        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="oklch(0.62 0.22 25)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="oklch(0.7 0.22 25)" strokeWidth={2} fill="url(#sg)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-1 flex justify-between px-2 text-[10px] text-white/60">
                  <span>12 AM</span><span>04 AM</span><span>08 AM</span><span>12 PM</span><span>04 PM</span><span>08 PM</span>
                </div>
              </div>

              {/* Top selling products */}
              <div className="rounded-2xl bg-brand-navy p-4 text-brand-navy-foreground shadow-[var(--shadow-elevated)]">
                <h3 className="font-bold">Top Selling Products</h3>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-36 w-36 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={donut} dataKey="v" innerRadius={36} outerRadius={64} paddingAngle={2}>
                          {donut.map((d, i) => (
                            <Cell key={i} fill={d.c} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="flex-1 space-y-1.5 text-[11px]">
                    {donut.map((d) => (
                      <li key={d.name}>
                        <p className="flex items-center gap-2 font-semibold">
                          <span className="h-2 w-2 rounded-full" style={{ background: d.c }} />
                          {d.name}
                        </p>
                        <p className="ml-4 text-white/60">{d.sub}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Live activity */}
              <div className="rounded-2xl border bg-card p-4">
                <h3 className="font-bold">Live Business Activity</h3>
                <ul className="mt-3 space-y-3 text-xs">
                  {ACTIVITY.map((a) => (
                    <li key={a.title} className="flex items-start gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: `color-mix(in oklab, ${a.color} 18%, transparent)`, color: a.color }}>
                        <a.icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{a.title}</p>
                        <p className="text-[11px] text-muted-foreground">{a.meta}</p>
                      </div>
                      <p className="shrink-0 text-[10px] text-muted-foreground">{a.time}</p>
                    </li>
                  ))}
                </ul>
                <a className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red">
                  View all activities <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Lower row: 4 status cards */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <StatusCard title="Inventory Status">
                {INVENTORY.map((p) => (
                  <li key={p.name} className="flex items-center justify-between py-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-7 w-7 rounded-md bg-brand-red/10" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{p.qty}</p>
                      <p className={`text-[10px] ${p.low ? "text-brand-red" : "text-success"}`}>{p.status}</p>
                    </div>
                  </li>
                ))}
              </StatusCard>

              <div className="rounded-2xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">Production Status</h4>
                  <a className="text-[11px] text-brand-red">View all →</a>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="relative h-24 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[{ v: 75, c: "var(--brand-leaf)" }, { v: 25, c: "var(--muted)" }]} dataKey="v" innerRadius={28} outerRadius={42} startAngle={90} endAngle={-270}>
                          <Cell fill="oklch(0.62 0.18 150)" />
                          <Cell fill="oklch(0.92 0.01 250)" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <p className="text-base font-black">75%</p>
                        <p className="text-[9px] text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-[11px]">
                    <p className="font-bold">Batch #BCH-00045</p>
                    <p className="text-muted-foreground">KORI Ginger Paste</p>
                    <div className="mt-2 space-y-0.5">
                      <Row label="Planned" v="7,000 Units" />
                      <Row label="Completed" v="5,250 Units" />
                      <Row label="Remaining" v="1,750 Units" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between border-t pt-2 text-[11px]">
                  <span className="text-muted-foreground">Estimated Finish</span>
                  <span className="font-semibold">02:30 PM</span>
                </div>
              </div>

              <StatusCard title="Financial Overview">
                <Row label={<span className="inline-flex items-center gap-2"><Wallet className="h-3.5 w-3.5 text-success" />Cash in Hand</span>} v="GHS 120,560.00" />
                <Row label={<span className="inline-flex items-center gap-2"><CreditCard className="h-3.5 w-3.5 text-brand-red" />Accounts Receivable</span>} v="GHS 85,430.00" />
                <Row label={<span className="inline-flex items-center gap-2"><CreditCard className="h-3.5 w-3.5 text-brand-red" />Accounts Payable</span>} v="GHS 45,250.00" />
                <Row label={<span className="inline-flex items-center gap-2"><DollarSign className="h-3.5 w-3.5 text-brand-red" />Payroll Due</span>} v={<span className="text-brand-red">GHS 28,650.00</span>} />
              </StatusCard>

              <div className="rounded-2xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">Employee Overview</h4>
                  <a className="text-[11px] text-brand-red">View all →</a>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <ul className="flex-1 space-y-1.5 text-xs">
                    <Row label="Total Employees" v="156" />
                    <Row label={<span className="text-success">Present</span>} v="128" />
                    <Row label={<span className="text-brand-gold">On Leave</span>} v="12" />
                    <Row label={<span className="text-brand-red">Absent</span>} v="16" />
                  </ul>
                  <div className="h-24 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[{ v: 128 }, { v: 12 }, { v: 16 }]} dataKey="v" innerRadius={26} outerRadius={42}>
                          <Cell fill="oklch(0.62 0.18 150)" />
                          <Cell fill="oklch(0.78 0.15 80)" />
                          <Cell fill="oklch(0.58 0.22 25)" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PHONE MOCKUPS
   ============================================================ */

function PhoneFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <p className="mb-2 text-center text-xs font-semibold text-muted-foreground">{title}</p>
      <div className="phone-frame relative aspect-[9/19] w-full">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/40" />
        <div className="relative flex h-full flex-col pt-6">
          <div className="flex items-center justify-between px-5 text-[10px] text-white/70">
            <span>9:41</span>
            <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /></span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function SalesPhone() {
  return (
    <PhoneFrame title="Sales Officer App">
      <div className="flex flex-1 flex-col">
        <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-red text-xs font-bold text-brand-red-foreground">KM</div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/60">Good Morning</p>
            <p className="text-sm font-bold">Kwame Mensah</p>
          </div>
        </div>

        <p className="mt-3 px-5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Today's Summary</p>
        <div className="mx-4 mt-1.5 grid grid-cols-2 gap-3 rounded-xl bg-white/5 p-3">
          <div>
            <p className="text-[10px] text-white/60">Orders</p>
            <p className="text-lg font-black">12</p>
          </div>
          <div>
            <p className="text-[10px] text-white/60">Sales (GHS)</p>
            <p className="text-lg font-black">5,650.00</p>
          </div>
        </div>

        <p className="mt-3 px-5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Targets</p>
        <div className="mx-4 mt-1.5 flex items-center justify-between rounded-xl bg-white/5 p-3">
          <div>
            <p className="text-[10px] text-white/60">Daily Target</p>
            <p className="text-sm font-bold">GHS 10,000</p>
          </div>
          <RingProgress value={56} />
        </div>

        <p className="mt-3 px-5 text-[10px] font-semibold uppercase tracking-wider text-white/60">Quick Actions</p>
        <div className="mx-4 mt-1.5 grid grid-cols-3 gap-2">
          {[
            { icon: ShoppingCart, label: "New Order" },
            { icon: Users, label: "Customers" },
            { icon: Wallet, label: "Collections" },
            { icon: Package, label: "Products" },
            { icon: FileText, label: "Visit Report" },
            { icon: MoreHorizontal, label: "More" },
          ].map((q) => (
            <div key={q.label} className="rounded-lg bg-white/5 p-2 text-center">
              <q.icon className="mx-auto mb-1 h-4 w-4" />
              <p className="text-[9px] text-white/70">{q.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto mx-3 mb-3 flex items-center justify-around rounded-2xl bg-white/5 p-2">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: ShoppingBag, label: "Orders" },
            { icon: Users, label: "Customers" },
            { icon: MoreHorizontal, label: "More" },
          ].map((t) => (
            <div key={t.label} className={`flex flex-col items-center ${t.active ? "text-brand-red" : "text-white/60"}`}>
              <t.icon className="h-4 w-4" />
              <span className="mt-0.5 text-[9px]">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function DriverPhone() {
  return (
    <PhoneFrame title="Driver/Logistics App">
      <div className="flex flex-1 flex-col">
        <div className="mx-4 mt-3 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <Navigation className="h-3.5 w-3.5 text-success" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60">On Delivery</p>
              <p className="text-xs font-bold">Truck 02 · GW 4536-22</p>
            </div>
          </div>
        </div>

        {/* "Map" */}
        <div className="mx-4 mt-3 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-900/40 via-teal-800/30 to-blue-900/40 relative">
          <svg viewBox="0 0 200 100" className="h-full w-full opacity-80">
            <path d="M10 80 Q 60 20 100 60 T 190 30" fill="none" stroke="oklch(0.62 0.22 25)" strokeWidth="2.5" strokeDasharray="3 3" />
            <circle cx="10" cy="80" r="4" fill="oklch(0.62 0.18 150)" />
            <circle cx="190" cy="30" r="4" fill="oklch(0.58 0.22 25)" />
          </svg>
          <MapPin className="absolute right-3 top-3 h-4 w-4 text-brand-red" />
        </div>

        <div className="mx-4 mt-3 rounded-xl bg-white/5 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Current Delivery</p>
          <p className="mt-1 text-xs font-bold">#DLV-00098</p>
          <p className="text-xs">Ama Retail Shop</p>
          <p className="text-[10px] text-white/60">Tema Community 25</p>
          <span className="mt-2 inline-block rounded-full bg-success px-3 py-0.5 text-[9px] font-semibold text-success-foreground">Delivered</span>
        </div>

        <div className="mx-4 mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-[10px] text-white/60">Pending Stops</p>
            <p className="text-lg font-black">2</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-[10px] text-white/60">Distance Left</p>
            <p className="text-lg font-black">8.6 KM</p>
          </div>
        </div>

        <div className="mt-auto mx-3 mb-3 flex items-center justify-around rounded-2xl bg-white/5 p-2">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: Truck, label: "Routes" },
            { icon: ClipboardList, label: "Logs" },
            { icon: MoreHorizontal, label: "More" },
          ].map((t) => (
            <div key={t.label} className={`flex flex-col items-center ${t.active ? "text-brand-red" : "text-white/60"}`}>
              <t.icon className="h-4 w-4" />
              <span className="mt-0.5 text-[9px]">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function AiInsightsCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border-l-4 border-l-brand-red bg-accent/40 p-4 shadow-[var(--shadow-card)] ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <Sparkles className="h-4 w-4 text-brand-red" /> AI Insights
        </h3>
        <span className="rounded-full border border-brand-red px-2 py-0.5 text-[10px] font-semibold text-brand-red">
          ✦ Ask AI
        </span>
      </div>
      <ul className="mt-3 space-y-2 text-xs">
        {[
          "Sales in Accra region increased by 18% today.",
          "KORI Garlic Paste is trending high.",
          "Raw material (Ginger) will finish in 12 days.",
          "3 customers are at high risk of churn.",
        ].map((t) => (
          <li key={t} className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-3 w-3 text-brand-red" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   PROCESS FLOW
   ============================================================ */

const FLOW = [
  { n: 1, icon: Users, title: "SUPPLIERS", sub: "Manage suppliers & contracts" },
  { n: 2, icon: ShoppingCart, title: "PROCUREMENT", sub: "Request, PO, Receive & Pay suppliers" },
  { n: 3, icon: Warehouse, title: "RAW MATERIAL WAREHOUSE", sub: "Store & manage raw materials" },
  { n: 4, icon: Factory, title: "PRODUCTION", sub: "Plan, produce & track batches" },
  { n: 5, icon: ShieldCheck, title: "QUALITY CONTROL", sub: "Inspect & approve products" },
  { n: 6, icon: Building2, title: "FINISHED GOODS WAREHOUSE", sub: "Store & manage finished goods" },
  { n: 7, icon: Truck, title: "DISTRIBUTION", sub: "Plan routes & distribute" },
  { n: 8, icon: Store, title: "SALES CHANNELS", sub: "Field Sales, Distributors, Online, Social Media" },
  { n: 9, icon: Heart, title: "CUSTOMERS", sub: "Serve customers & build loyalty" },
  { n: 10, icon: DollarSign, title: "PAYMENTS", sub: "Receive payments & manage credit" },
  { n: 11, icon: Wallet, title: "FINANCE & PAYROLL", sub: "Accounting, payroll, reports & compliance" },
  { n: 12, icon: Brain, title: "ANALYTICS & AI", sub: "Real-time insights, forecast & decisions" },
];

function ProcessFlow() {
  return (
    <section id="flow" className="mt-8 bg-card py-8">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <h2 className="text-center text-lg font-black tracking-wide md:text-xl">END TO END BUSINESS PROCESS FLOW</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
          {FLOW.map((f, i) => (
            <div key={f.n} className="relative flex flex-col items-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-leaf/15 text-brand-leaf">
                <f.icon className="h-6 w-6" />
              </div>
              <p className="mt-2 text-[11px] font-bold leading-tight">
                {f.n}. {f.title}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{f.sub}</p>
              {i < FLOW.length - 1 && (
                <ArrowRight className="absolute -right-3 top-5 hidden h-4 w-4 text-muted-foreground xl:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURE BAR
   ============================================================ */

const FEATURES = [
  { icon: Zap, title: "Real Time Data", sub: "Live sync across all departments" },
  { icon: Cloud, title: "Cloud Based", sub: "Secure, scalable & reliable" },
  { icon: Brain, title: "AI Powered", sub: "Smarter decisions everyday" },
  { icon: Smartphone, title: "Mobile Ready", sub: "Work from anywhere" },
  { icon: Lock, title: "Secure & Compliant", sub: "Role based access & audit trail" },
  { icon: Workflow, title: "Integrated", sub: "All modules work as one" },
];

function FeatureBar() {
  return (
    <section id="features" className="bg-brand-navy py-6 text-brand-navy-foreground">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-6 px-4 md:grid-cols-3 lg:grid-cols-6 md:px-6">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15">
              <f.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">{f.title}</p>
              <p className="text-[11px] text-white/60">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   HELPERS
   ============================================================ */

function StatusCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold">{title}</h4>
        <a className="text-[11px] text-brand-red">View all →</a>
      </div>
      <ul className="mt-2 divide-y">{children}</ul>
    </div>
  );
}

function Row({ label, v }: { label: React.ReactNode; v: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between py-1 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{v}</span>
    </li>
  );
}

function RingProgress({ value }: { value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative h-14 w-14">
      <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
        <circle cx="30" cy="30" r={r} stroke="oklch(1 0 0 / 0.15)" strokeWidth="5" fill="none" />
        <circle cx="30" cy="30" r={r} stroke="oklch(0.55 0.2 265)" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-[10px] font-bold">{value}%</div>
    </div>
  );
}

const ACTIVITY = [
  { icon: ShoppingCart, color: "oklch(0.62 0.18 150)", title: "New order received", meta: "#ORD-001245", time: "2 mins ago" },
  { icon: DollarSign, color: "oklch(0.55 0.2 265)", title: "Payment received", meta: "GHS 2,450.00", time: "5 mins ago" },
  { icon: Factory, color: "oklch(0.55 0.22 305)", title: "Production completed", meta: "Batch #BCH-00045", time: "15 mins ago" },
  { icon: Users, color: "oklch(0.78 0.15 80)", title: "New customer registered", meta: "Ama Modern Shop", time: "18 mins ago" },
  { icon: Truck, color: "oklch(0.58 0.22 25)", title: "Delivery completed", meta: "#DLV-00098", time: "25 mins ago" },
];

const INVENTORY = [
  { name: "KORI Ginger Paste", qty: "1,250 Units", status: "In Stock", low: false },
  { name: "KORI Garlic Paste", qty: "980 Units", status: "In Stock", low: false },
  { name: "KORI Pepper Sauce", qty: "890 Units", status: "Low Stock", low: true },
  { name: "KORI Shito", qty: "430 Units", status: "Low Stock", low: true },
];

const salesCurve = [
  { v: 12 }, { v: 18 }, { v: 16 }, { v: 22 }, { v: 28 }, { v: 24 }, { v: 30 }, { v: 36 }, { v: 32 }, { v: 40 }, { v: 38 }, { v: 46 },
];

const donut = [
  { name: "KORI Ginger Paste", sub: "4,560 (38%)", v: 38, c: "oklch(0.58 0.22 25)" },
  { name: "KORI Garlic Paste", sub: "3,250 (27%)", v: 27, c: "oklch(0.78 0.15 80)" },
  { name: "KORI Pepper Sauce", sub: "2,450 (21%)", v: 21, c: "oklch(0.55 0.2 265)" },
  { name: "KORI Shito", sub: "1,320 (11%)", v: 11, c: "oklch(0.55 0.22 305)" },
  { name: "Others", sub: "420 (3%)", v: 3, c: "oklch(0.62 0.18 150)" },
];

function spark() {
  return Array.from({ length: 10 }, () => ({ v: Math.random() * 10 + 2 }));
}
