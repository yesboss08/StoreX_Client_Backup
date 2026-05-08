import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  Shield,
  Zap,
  Share2,
  Lock,
  Globe,
  ArrowRight,
  Check,
  Menu,
  X,
  Star,
  Users,
  HardDrive,
  Server,
  Github,
  Twitter,
  Linkedin,
  LayoutDashboard,
  ShieldCheck,
  Network,
  ScrollText,
  Settings,
  Upload,
  Download,
  RefreshCw,
  Activity,
  Cpu,
  Database,
  CheckCircle2,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────── */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Features', to: '#features' },
    { label: 'How It Works', to: '#how-it-works' },
    { label: 'Pricing', to: '#pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0b14]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              CloudDrive<span className="text-blue-400">.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              Get Started Free
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 384 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06]"
          >
            <div className="bg-[#0d0f17]/95 backdrop-blur-xl px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-gray-400 hover:text-white py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-medium text-gray-300 hover:text-white py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ─────────────────────────────────────────────
   ADVANCED DASHBOARD COMPONENT
   ───────────────────────────────────────────── */

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Lock, label: 'Encrypted Vault', active: false },
  { icon: Network, label: 'Network Nodes', active: false },
  { icon: ScrollText, label: 'Activity Logs', active: false },
  { icon: Settings, label: 'Security Settings', active: false },
];

const storageData = [
  { label: 'Files', value: 42, color: '#3b82f6' },
  { label: 'Photos', value: 28, color: '#8b5cf6' },
  { label: 'Backups', value: 18, color: '#06b6d4' },
  { label: 'Shared', value: 12, color: '#22c55e' },
];

const activityLogs = [
  { icon: Upload, text: 'Project_X_v2.pdf uploaded', status: 'complete', time: '2m ago' },
  { icon: Lock, text: 'AES-256-GCM Encryption Verified', status: 'complete', time: '5m ago' },
  { icon: RefreshCw, text: 'Node sync: us-east-1 → eu-west-3', status: 'syncing', time: 'now' },
  { icon: Download, text: 'assets_q4_2025.zip downloaded', status: 'complete', time: '12m ago' },
  { icon: ShieldCheck, text: 'Security scan: All clear', status: 'complete', time: '1h ago' },
];

const globalNodes = [
  { name: 'US-East', status: 'active', lat: 40, lng: -74 },
  { name: 'EU-West', status: 'active', lat: 51, lng: -0.13 },
  { name: 'AP-Southeast', status: 'active', lat: 1, lng: 104 },
  { name: 'US-West', status: 'syncing', lat: 37, lng: -122 },
  { name: 'SA-East', status: 'active', lat: -23, lng: -46 },
  { name: 'AP-Northeast', status: 'active', lat: 35, lng: 139 },
];

const techLogs = [
  { label: 'API Version', value: '3.12.5-beta', status: 'ok' },
  { label: 'Security Audit', value: 'Passed', status: 'ok' },
  { label: 'Key Rotation', value: 'Success', status: 'ok' },
  { label: 'Node Health', value: '6/6 Online', status: 'ok' },
  { label: 'API Latency', value: '12ms', status: 'ok' },
];

/* Storage Donut Chart */
const DonutChart = () => {
  const total = storageData.reduce((acc, d) => acc + d.value, 0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        {storageData.map((d) => {
          const dash = (d.value / total) * circumference;
          const gap = ((cumulative / total) * circumference).toFixed(2);
          cumulative += d.value;
          return (
            <circle
              key={d.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-Number(gap)}
              strokeLinecap="round"
              className="drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">847</span>
        <span className="text-xs text-gray-500">GB Total</span>
      </div>
    </div>
  );
};

/* Global Network Map */
const GlobalMap = () => {
  return (
    <div className="relative w-full h-40 bg-gradient-to-br from-blue-950/50 to-indigo-950/50 rounded-lg border border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 360 180" className="w-full h-full">
          {/* Simplified world map paths */}
          <path d="M50,60 Q80,40 120,50 T180,45 T240,55 T300,45 L340,50" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>
          <path d="M40,90 Q70,80 100,85 T160,80 T220,90 T280,85 T340,90" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>
          <path d="M30,120 Q60,110 90,115 T150,110 T210,120 T270,115 T330,120" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>
          <path d="M60,140 Q90,130 120,135 T180,130 T240,140 T300,135 L340,140" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5"/>
          {/* Connecting lines between nodes */}
          <line x1="85" y1="70" x2="180" y2="75" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
          <line x1="180" y1="75" x2="280" y2="65" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
          <line x1="180" y1="75" x2="130" y2="110" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
          <line x1="280" y1="65" x2="310" y2="100" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3"/>
        </svg>
      </div>
      {/* Node dots */}
      {globalNodes.map((node, i) => (
        <motion.div
          key={node.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 + 0.5 }}
          className={`absolute w-2.5 h-2.5 rounded-full ${
            node.status === 'active'
              ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
              : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse'
          }`}
          style={{
            left: `${15 + (i * 12)}%`,
            top: `${25 + (i % 3) * 20}%`,
          }}
        />
      ))}
      <div className="absolute bottom-2 left-3 text-[10px] text-gray-500 font-mono">40+ Edge Locations</div>
    </div>
  );
};

/* Sidebar Navigation Item */
const SidebarItem = ({ icon: Icon, label, active }: { icon: any; label: string; active: boolean }) => (
  <motion.button
    whileHover={{ x: 4 }}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      active
        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : ''}`} />
    {label}
  </motion.button>
);

/* Live Activity Item */
const ActivityItem = ({ item, index }: { item: typeof activityLogs[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-3 py-2"
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
      item.status === 'complete' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
    }`}>
      <item.icon className={`w-4 h-4 ${item.status === 'complete' ? 'text-emerald-400' : 'text-blue-400'}`} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-300 truncate">{item.text}</p>
      <p className="text-[10px] text-gray-500">{item.time}</p>
    </div>
    {item.status === 'syncing' && (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-4 h-4 text-blue-400"
      >
        <RefreshCw className="w-4 h-4" />
      </motion.div>
    )}
    {item.status === 'complete' && (
      <Check className="w-4 h-4 text-emerald-400" />
    )}
  </motion.div>
);

/* Advanced Dashboard Mockup */
const AdvancedDashboard = () => {
  const [apiLatency, setApiLatency] = useState(12);
  const [syncing] = useState(true);
  const [selectedNav, setSelectedNav] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setApiLatency(Math.floor(Math.random() * 20) + 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-6xl mx-auto relative"
    >
      {/* Atmospheric glow */}
      <div className="absolute -inset-24 bg-gradient-to-t from-blue-600/10 via-transparent to-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Laptop container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800/80 border-b border-white/[0.06]">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-4">
            <div className="bg-zinc-700/60 rounded-lg px-4 py-1.5 flex items-center gap-2 max-w-md mx-auto">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-gray-400 font-mono">app.clouddrive.io/dashboard</span>
            </div>
          </div>
          {/* Syncing indicator */}
          <motion.div
            animate={{ opacity: syncing ? [1, 0.5, 1] : 1 }}
            transition={{ duration: 1.5, repeat: syncing ? Infinity : 0 }}
            className="flex items-center gap-1.5 text-[10px] text-blue-400"
          >
            <Cloud className="w-3.5 h-3.5" />
            {syncing ? 'Syncing...' : 'Synced'}
          </motion.div>
        </div>

        {/* Dashboard content */}
        <div className="flex">
          {/* Left sidebar */}
          <div className="w-56 p-4 bg-zinc-950/50 border-r border-white/[0.04] hidden lg:block">
            <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-4 px-3">Navigation</div>
            <div className="space-y-1">
              {navItems.map((item, i) => (
                <div key={item.label} onClick={() => setSelectedNav(i)}>
                  <SidebarItem icon={item.icon} label={item.label} active={selectedNav === i} />
                </div>
              ))}
            </div>

            {/* Storage summary */}
            <div className="mt-6 pt-6 border-t border-white/[0.04]">
              <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-3 px-3">Quick Stats</div>
              <div className="px-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Storage Used</span>
                  <span className="text-white font-medium">847 GB</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '63%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">API Latency</span>
                  <span className="text-emerald-400 font-mono">{apiLatency}ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-4 lg:p-6 space-y-4 overflow-hidden">
            {/* Top section: Storage & Network */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Storage metrics */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-white mb-1">
                      <Database className="w-4 h-4 text-blue-400" />
                      Data Distribution
                    </div>
                    <div className="text-[10px] text-gray-500 mb-4">847 GB / 1 TB Used</div>
                    <div className="space-y-2">
                      {storageData.map((d) => (
                        <div key={d.label} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                          <span className="text-xs text-gray-400 flex-1">{d.label}</span>
                          <span className="text-xs text-white font-medium">{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DonutChart />
                </div>
              </motion.div>

              {/* Global network map */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  Global Edge Network
                </div>
                <GlobalMap />
              </motion.div>
            </div>

            {/* Center section: Live activity stream */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-white mb-4">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live Activities
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-hide">
                  {activityLogs.map((item, i) => (
                    <ActivityItem key={i} item={item} index={i} />
                  ))}
                </div>
              </motion.div>

              {/* System metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-white mb-4">
                  <Cpu className="w-4 h-4 text-violet-400" />
                  System Status
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {techLogs.map((log, i) => (
                    <motion.div
                      key={log.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="text-[10px] text-gray-500 mb-1">{log.label}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-medium text-white">{log.value}</span>
                        {log.status === 'ok' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom section: Terminal logs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] font-mono"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                <ScrollText className="w-4 h-4 text-amber-400" />
                Compliance & Logs
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="text-gray-500">
                  <span className="text-blue-400">[INFO]</span> System initialized at {new Date().toLocaleString()}
                </div>
                <div className="text-gray-500">
                  <span className="text-emerald-400">[SEC]</span> Encryption service: AES-256-GCM active
                </div>
                <div className="text-gray-500">
                  <span className="text-emerald-400">[SEC]</span> Zero-knowledge proof verified
                </div>
                <div className="text-gray-500">
                  <span className="text-cyan-400">[NET]</span> 40 edge nodes responding within 50ms
                </div>
                <div className="text-gray-500">
                  <span className="text-amber-400">[WARN]</span> Backup vault: 2 updates pending sync
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -4, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 blur-sm"
      />
      <motion.div
        animate={{ y: [0, 4, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 blur-sm"
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────── */

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#08090f]">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px]" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" style={{ animationDelay: '4s' }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
            Now with end-to-end encryption
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Store, sync, and share
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              with zero compromise.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade cloud storage that is blazing fast, beautifully simple, and
            private by design. Your files, your control — anywhere, on any device.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all"
            >
              Explore Features
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-gray-500"
          >
            No credit card required &middot; 14-day free trial &middot; Cancel anytime
          </motion.p>
        </div>

        {/* Advanced Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16"
        >
          <AdvancedDashboard />
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   STATS SECTION
   ───────────────────────────────────────────── */

const stats = [
  { icon: Users, value: '50K+', label: 'Active Users' },
  { icon: HardDrive, value: '10 PB+', label: 'Data Stored' },
  { icon: Server, value: '99.99%', label: 'Uptime SLA' },
  { icon: Globe, value: '40+', label: 'Edge Locations' },
];

const StatsSection = () => (
  <section className="py-16 lg:py-20 bg-[#08090f] border-y border-white/[0.04]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Icon className="w-6 h-6 text-blue-400/60 mx-auto mb-3" />
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FEATURES SECTION
   ───────────────────────────────────────────── */

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption with zero-knowledge architecture. Your files are encrypted before they leave your device.',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Global edge network with intelligent caching delivers uploads and downloads at maximum speed, anywhere.',
    color: 'amber',
  },
  {
    icon: Share2,
    title: 'Smart Sharing',
    description: 'Granular permissions, expiring links, and view-only shares. Collaborate without compromising control.',
    color: 'emerald',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Privacy',
    description: 'We cannot see your files. Period. Your encryption keys stay with you, ensuring absolute privacy.',
    color: 'violet',
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'Native apps for Windows, Mac, iOS, and Android. Plus a blazing-fast web interface for anywhere access.',
    color: 'cyan',
  },
  {
    icon: Server,
    title: 'Version Control',
    description: 'Automatic file versioning with 365-day history. Restore any previous version with a single click.',
    color: 'rose',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:border-blue-500/40 group-hover:shadow-blue-500/10',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:border-amber-500/40 group-hover:shadow-amber-500/10',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20 group-hover:border-violet-500/40 group-hover:shadow-violet-500/10',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:border-rose-500/40 group-hover:shadow-rose-500/10',
};

const FeaturesSection = () => (
  <section id="features" className="py-20 lg:py-28 bg-[#0a0b14] scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        className="max-w-2xl mx-auto text-center mb-16"
      >
        <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">Features</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
          Everything you need,
          <span className="text-gray-400"> built right in.</span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg leading-relaxed">
          Powerful tools designed for individuals and teams who demand the best in cloud storage.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, description, color }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group p-6 lg:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 ${colorMap[color]}`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   HOW IT WORKS SECTION
   ───────────────────────────────────────────── */

const steps = [
  { step: '01', title: 'Create your account', description: 'Sign up in under 30 seconds. No credit card needed. Choose your plan and get instant access.' },
  { step: '02', title: 'Upload & organize', description: 'Drag and drop files, create folders, and organize your content. Automatic sync across all your devices.' },
  { step: '03', title: 'Share & collaborate', description: 'Share securely with anyone. Set permissions, track changes, and collaborate in real-time.' },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 lg:py-28 bg-[#08090f] scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        className="max-w-2xl mx-auto text-center mb-16"
      >
        <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">How It Works</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
          Start in minutes,
          <span className="text-gray-400"> not hours.</span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg leading-relaxed">
          Three simple steps to secure, fast, and reliable cloud storage.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {steps.map(({ step, title, description }, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative group"
          >
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-[calc(100%-1rem)] w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
            )}
            <div className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 text-center lg:text-left">
              <span className="inline-block text-5xl font-bold text-white/[0.03] mb-4 select-none">{step}</span>
              <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   PRICING SECTION
   ───────────────────────────────────────────── */

const plans = [
  { name: 'Starter', price: '0', period: '/month', desc: 'Perfect for getting started.', features: ['5 GB storage', 'Basic file sharing', 'Mobile & web apps', 'Email support'], cta: 'Get Started Free', to: '/signup', highlighted: false },
  { name: 'Pro', price: '12', period: '/month', desc: 'Ideal for professionals.', features: ['1 TB storage', 'Advanced sharing & permissions', '30-day version history', 'Priority support', 'API access', 'Custom integrations'], cta: 'Start Pro Trial', to: '/signup?plan=pro', highlighted: true },
  { name: 'Enterprise', price: '25', period: '/user/month', desc: 'For large organizations.', features: ['Unlimited storage', 'Admin controls & audit logs', '365-day version history', '24/7 phone support', 'SLA guarantee', 'Custom contracts', 'Dedicated account manager'], cta: 'Contact Sales', to: '/contact', highlighted: false },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 lg:py-28 bg-[#0a0b14] scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 }
        }}
        className="max-w-2xl mx-auto text-center mb-16"
      >
        <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">Pricing</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
          Simple, transparent
          <span className="text-gray-400"> pricing.</span>
        </h2>
        <p className="mt-4 text-gray-400 text-lg leading-relaxed">
          No hidden fees. Upgrade or downgrade at any time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
              plan.highlighted
                ? 'bg-blue-600 border-2 border-blue-400 shadow-2xl shadow-blue-600/20 scale-[1.02] lg:scale-105'
                : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/15'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                Most Popular
              </div>
            )}
            <h3 className={`text-lg font-semibold mb-1 ${plan.highlighted ? 'text-blue-100' : 'text-white'}`}>{plan.name}</h3>
            <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>{plan.desc}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-white'}`}>${plan.price}</span>
              <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 mt-px flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-500'}`} />
                  <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-400'}`}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to={plan.to}
              className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
                plan.highlighted
                  ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
                  : 'border border-white/15 text-white hover:bg-white/5'
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   CTA SECTION
   ───────────────────────────────────────────── */

const CTASection = () => (
  <section className="py-20 lg:py-28 bg-[#08090f]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-3xl bg-gradient-to-br from-blue-600/20 via-blue-700/10 to-indigo-600/20 border border-blue-500/10 p-10 lg:p-16 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative">
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Join thousands of teams who trust CloudDrive for their most important files.
            Start your free trial today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */

const footerLinks = {
  Product: [
    { label: 'Features', to: '#features' },
    { label: 'Pricing', to: '#pricing' },
    { label: 'Security', to: '/security' },
    { label: 'Integrations', to: '/integrations' },
    { label: 'Roadmap', to: '/roadmap' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms of Service', to: '/terms-of-service' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
};

const FooterSection = () => (
  <footer className="bg-[#06070d] border-t border-white/[0.04]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              CloudDrive<span className="text-blue-400">.</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Secure, fast, and reliable cloud storage for individuals and teams. Your files,
            your control.
          </p>
          <div className="flex items-center gap-4 mt-6">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.to} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} CloudDrive. All rights reserved.</p>
        <p className="text-xs text-gray-600">Made with care for your data privacy.</p>
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
   ───────────────────────────────────────────── */

export const YoLanding = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href')!;
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#08090f] text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
};

export default YoLanding;
