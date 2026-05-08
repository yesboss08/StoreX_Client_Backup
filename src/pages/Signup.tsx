import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   UPDATED TECHNICAL BACKGROUND
   ───────────────────────────────────────────── */
const CloudBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050811]">
    {/* Deep background ambient glows */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
    <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-blue-900/15 rounded-full blur-[100px]" />

    {/* SVG Circuit and Server Graphics */}
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
          <stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" />
          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Isometric Server Rack (Left Side) */}
      <g opacity="0.4" transform="translate(80, 250)">
        {/* Main Box Outline */}
        <path d="M0,80 L120,20 L120,320 L0,380 Z" fill="rgba(6, 182, 212, 0.02)" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M120,20 L220,70 L220,370 L120,320 Z" fill="rgba(6, 182, 212, 0.03)" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="3 3" />
        <path d="M0,80 L100,130 L220,70 L120,20 Z" fill="rgba(6, 182, 212, 0.04)" stroke="#06b6d4" strokeWidth="1" />
        
        {/* Server Slots / Blades */}
        {[...Array(6)].map((_, i) => (
          <g key={`server-slot-${i}`} transform={`translate(0, ${i * 45})`}>
            <line x1="0" y1="110" x2="120" y2="50" stroke="#06b6d4" strokeWidth="0.5" />
            <circle cx="20" cy="95" r="2.5" fill="#06b6d4" className={i % 2 === 0 ? "animate-pulse" : ""} style={{ animationDelay: `${i * 0.3}s`}} />
            <circle cx="35" cy="87" r="2.5" fill="#3b82f6" />
            <line x1="50" y1="80" x2="100" y2="55" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.4" />
          </g>
        ))}
      </g>

      {/* Cyber/Circuit Traces */}
      {/* Top Left Trace */}
      <path d="M-100,200 L200,200 L300,300 L450,300" fill="none" stroke="url(#cyanGrad)" strokeWidth="1.5" />
      <circle cx="450" cy="300" r="3.5" fill="#06b6d4" filter="url(#glow)" className="animate-pulse" />
      <circle cx="200" cy="200" r="2" fill="#06b6d4" />

      {/* Mid Left Trace */}
      <path d="M-50,600 L150,600 L250,500 L400,500" fill="none" stroke="url(#cyanGrad)" strokeWidth="1" opacity="0.6"/>
      <circle cx="400" cy="500" r="2.5" fill="#06b6d4" filter="url(#glow)" />

      {/* Bottom Left Trace */}
      <path d="M0,800 L250,800 L350,700 L550,700" fill="none" stroke="url(#blueGrad)" strokeWidth="1.5" />
      <circle cx="550" cy="700" r="3.5" fill="#3b82f6" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '1s'}} />

      {/* Top Right Trace */}
      <path d="M1540,150 L1200,150 L1100,250 L850,250" fill="none" stroke="url(#blueGrad)" strokeWidth="1.5" />
      <circle cx="850" cy="250" r="3.5" fill="#3b82f6" filter="url(#glow)" />
      <circle cx="1200" cy="150" r="2" fill="#3b82f6" />

      {/* Mid Right Trace */}
      <path d="M1440,550 L1250,550 L1150,450 L950,450" fill="none" stroke="url(#cyanGrad)" strokeWidth="1" opacity="0.8"/>
      <circle cx="950" cy="450" r="3" fill="#06b6d4" filter="url(#glow)" className="animate-pulse" style={{animationDelay: '0.5s'}} />

      {/* Bottom Right Trace */}
      <path d="M1500,850 L1150,850 L1050,750 L800,750" fill="none" stroke="url(#blueGrad)" strokeWidth="1.5" />
      <circle cx="800" cy="750" r="3.5" fill="#3b82f6" filter="url(#glow)" className="animate-pulse" />

      {/* Scattered Floating Data Nodes */}
      <g fill="#06b6d4" opacity="0.7">
        <rect x="300" y="150" width="4" height="4" className="animate-pulse" />
        <rect x="1100" y="300" width="3" height="3" className="animate-pulse" style={{animationDelay: '0.7s'}} />
        <rect x="1250" y="700" width="5" height="5" opacity="0.4" />
        <rect x="200" y="750" width="3" height="3" className="animate-pulse" style={{animationDelay: '1.2s'}} />
        <circle cx="400" cy="850" r="2" />
        <circle cx="1300" cy="100" r="1.5" />
        <circle cx="700" cy="150" r="2.5" opacity="0.5" />
      </g>
    </svg>

    {/* Subtle Scanline Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
  </div>
);

/* ─────────────────────────────────────────────
   GOOGLE LOGO SVG
   ───────────────────────────────────────────── */
const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

/* ─────────────────────────────────────────────
   GITHUB LOGO SVG
   ───────────────────────────────────────────── */
const GitHubLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ─────────────────────────────────────────────
   PASSWORD STRENGTH METER
   ───────────────────────────────────────────── */
const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const getStrength = (pwd: string): { level: number; label: string; colors: string[] } => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const levels = [
      { level: 0, label: '', colors: ['bg-white/10', 'bg-white/10', 'bg-white/10', 'bg-white/10'] },
      { level: 1, label: 'Weak', colors: ['bg-red-500', 'bg-white/10', 'bg-white/10', 'bg-white/10'] },
      { level: 2, label: 'Fair', colors: ['bg-orange-500', 'bg-orange-500', 'bg-white/10', 'bg-white/10'] },
      { level: 3, label: 'Good', colors: ['bg-yellow-500', 'bg-yellow-500', 'bg-yellow-500', 'bg-white/10'] },
      { level: 4, label: 'Strong', colors: ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500'] },
      { level: 5, label: 'Very Strong', colors: ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500'] },
    ];
    return levels[Math.min(score, 5)];
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {strength.colors.map((color, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${color}`} />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        Password strength: <span className={
          strength.level <= 1 ? 'text-red-400' :
          strength.level === 2 ? 'text-orange-400' :
          strength.level === 3 ? 'text-yellow-400' :
          'text-green-400'
        }>{strength.label}</span>
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   INPUT FIELD COMPONENTS
   ───────────────────────────────────────────── */
const InputField = ({
  icon: Icon,
  placeholder,
  type = 'text',
  value,
  onChange,
  rightIcon: RightIcon,
  onRightIconClick,
}: {
  icon: any;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  rightIcon?: any;
  onRightIconClick?: () => void;
}) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
      <Icon className="w-4 h-4" />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
    />
    {RightIcon && (
      <button
        type="button"
        onClick={onRightIconClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
      >
        <RightIcon className="w-4 h-4" />
      </button>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   CHECKBOX COMPONENT
   ───────────────────────────────────────────── */
const Checkbox = ({ checked, onChange, label, children }: { checked: boolean; onChange: () => void; label?: string; children?: React.ReactNode }) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
        checked
          ? 'bg-blue-500 border-blue-500'
          : 'border-white/20 bg-transparent group-hover:border-white/40'
      }`}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
    {label ? <span className="text-xs text-gray-400">{label}</span> : children}
  </label>
);

/* ─────────────────────────────────────────────
   OAUTH BUTTONS
   ───────────────────────────────────────────── */
const OAuthButton = ({ logo: Logo, label, variant }: { logo: React.ReactNode; label: string; variant: 'google' | 'github' }) => (
  <button
    type="button"
    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
      variant === 'google'
        ? 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
        : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
    }`}
  >
    {Logo}
    {label}
  </button>
);


export const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup submitted:', { ...formData, agreedToTerms, rememberMe });
  };

  return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4 relative overflow-hidden">
      <CloudBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Animated glowing border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl opacity-60 animate-spin-slow"
          style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-rotate 4s linear infinite'
          }}
        />
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-md opacity-40" />

        <div className="relative bg-[#0a0f1a]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                StoreX<span className="text-cyan-400">.</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Join CloudDrive</h1>
            <p className="text-sm text-gray-500">Secure your technical data vault. Let's get you set up.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <InputField
              icon={User}
              placeholder="Full Name"
              value={formData.fullName}
              onChange={updateField('fullName')}
            />

            {/* Email */}
            <InputField
              icon={Mail}
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={updateField('email')}
            />

            {/* Password */}
            <InputField
              icon={Lock}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={updateField('password')}
              rightIcon={showPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowPassword(!showPassword)}
            />
            <PasswordStrengthMeter password={formData.password} />

            {/* Confirm Password */}
            <InputField
              icon={Lock}
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={updateField('confirmPassword')}
              rightIcon={showConfirmPassword ? EyeOff : Eye}
              onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <Checkbox checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)}>
                <span className="text-xs text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms-of-service" className="text-cyan-400 hover:text-cyan-300">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link>
                </span>
              </Checkbox>
              <Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} label="Remember me" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">Or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* OAuth Buttons */}
          <div className="flex gap-3">
            <OAuthButton logo={<GoogleLogo />} label="Sign up with Google" variant="google" />
            <OAuthButton logo={<GitHubLogo />} label="Sign up with GitHub" variant="github" />
          </div>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;