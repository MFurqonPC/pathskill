import { useState, useEffect, useRef } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";
import {
  ChevronDown,
  ArrowRight,
  Play,
  Check,
  Users,
  Award,
  BookOpen,
  Target,
  Briefcase,
  TrendingUp,
  Code2,
  Database,
  Globe,
  Menu,
  X,
  Star,
  MapPin,
  Layers,
  Shield,
  Cpu,
  BarChart2,
  FileText,
  Rocket,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────── */
const radarData = [
  { skill: "React", user: 60, industry: 90 },
  { skill: "TypeScript", user: 35, industry: 85 },
  { skill: "Node.js", user: 45, industry: 80 },
  { skill: "SQL", user: 70, industry: 88 },
  { skill: "Docker", user: 20, industry: 72 },
  { skill: "Git", user: 55, industry: 92 },
];

const problems = [
  { icon: MapPin,    title: "Bingung Mulai dari Mana",        desc: "Terlalu banyak resource tersebar, tidak tahu harus belajar apa lebih dulu untuk karier yang diinginkan." },
  { icon: Target,    title: "Skill Tidak Sesuai Industri",    desc: "Sudah belajar banyak tapi tetap tidak lolos interview karena skill yang dipelajari tidak relevan dengan kebutuhan HRD." },
  { icon: Layers,    title: "Overthinking Lihat Lowongan",    desc: "Membuka job listing dan langsung merasa tidak layak karena tidak tahu seberapa besar gap skill yang dimiliki." },
  { icon: FileText,  title: "Tidak Punya Portofolio",         desc: "Menyadari butuh portofolio tapi tidak tahu proyek apa yang perlu dibuat atau bagaimana cara mempresentasikannya." },
];

const solutions = [
  { icon: BarChart2,  title: "Skill Mapping",      desc: "Radar chart interaktif yang menunjukkan posisi skill kamu vs kebutuhan industri nyata. Lihat gap-nya seketika.",      tag: "Analitik" },
  { icon: BookOpen,   title: "Learning Path",      desc: "Jalur belajar step-by-step yang dipersonalisasi sesuai target karier dan level skill kamu saat ini.",                    tag: "Personalisasi" },
  { icon: TrendingUp, title: "Progress Tracking",  desc: "Upload assignment, tracking progress harian, dan dapatkan feedback otomatis untuk setiap modul yang diselesaikan.",      tag: "Gamifikasi" },
  { icon: Briefcase,  title: "Portfolio Builder",  desc: "Bangun portofolio profesional dari proyek nyata yang dikerjakan selama learning path. Siap share ke recruiter.",         tag: "Karier" },
];

const steps = [
  { n: "01", icon: Target,    title: "Pilih Target Karier",   desc: "Pilih role impianmu: Frontend, Backend, Data Analyst, UI/UX, dan lainnya." },
  { n: "02", icon: BarChart2, title: "Analisis Skill",        desc: "Jawab assessment singkat, lalu lihat gap skill kamu vs standar industri secara visual." },
  { n: "03", icon: BookOpen,  title: "Ikuti Learning Path",   desc: "Jalur belajar terstruktur dengan video, artikel, dan proyek nyata yang dipilihkan untukmu." },
  { n: "04", icon: Rocket,    title: "Siap Kerja",            desc: "Portofolio selesai, skill terverifikasi, dan confidence kamu siap tembus interview pertama." },
];

const testimonials = [
  { name: "Rizky Aditya",     role: "Fresh Graduate S1 Informatika",        avatar: "RA", text: "PathSkill beneran gamechanger. Dulu aku bingung harus belajar apa buat jadi frontend dev. Sekarang punya roadmap yang jelas dan portofolio yang sudah bisa dibuat!", stars: 5 },
  { name: "Dinda Pratiwi",    role: "Mahasiswi Semester Akhir D3 RPL",       avatar: "DP", text: "Skill mapping-nya akurat banget. Aku baru tahu kalau TypeScript itu sangat dibutuhkan industri tapi aku belum belajar sama sekali. Langsung ada rekomendasinya!", stars: 5 },
  { name: "Farhan Maulana",   role: "Pencari Kerja IT | Ex-Bootcamp",        avatar: "FM", text: "Sudah ikut bootcamp tapi masih kesulitan dapat kerja. PathSkill bantu aku identifikasi skill yang masih kurang dan langsung kasih solusi konkretnya.", stars: 5 },
];

const faqs = [
  { q: "Apakah PathSkill gratis?",                    a: "PathSkill menyediakan akses gratis untuk fitur dasar termasuk skill assessment dan learning path umum. Untuk fitur premium seperti mentoring 1-on-1 dan portfolio builder lanjutan, tersedia paket berlangganan terjangkau mulai Rp 49.000/bulan." },
  { q: "Apakah cocok untuk pemula?",                   a: "Tentu! PathSkill dirancang khusus untuk fresh graduate dan mahasiswa semester akhir yang baru memulai karier di bidang IT. Platform kami memandu dari level dasar hingga siap kerja dengan roadmap yang jelas." },
  { q: "Apakah ada roadmap frontend/backend?",         a: "Ya! PathSkill menyediakan roadmap lengkap untuk Frontend Developer, Backend Developer, Full Stack, Data Analyst, UI/UX Designer, DevOps, dan banyak jalur karier IT lainnya sesuai kebutuhan industri Indonesia." },
  { q: "Apakah bisa membangun portofolio?",            a: "Tentu! Setiap learning path dilengkapi assignment dan proyek nyata yang bisa langsung ditambahkan ke portofolio. Kami juga menyediakan portfolio builder terintegrasi yang bisa dibagikan langsung ke recruiter." },
];

/* ─── Hooks ─────────────────────────────────────── */
function useCounter(end, dur = 2000, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0 = null;
    const raf = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setN(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, end, dur]);
  return n;
}

/* ─── Sub-components ─────────────────────────────── */

function GlowBlob({ className, style }) {
  return (
    <div
      className={className}
      style={{
        position: "absolute", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", ...style,
      }}
    />
  );
}

function Badge({ children }) {
  return (
    <span style={{
      display: "inline-block",
      background: "rgba(37,99,235,0.15)",
      border: "1px solid rgba(37,99,235,0.35)",
      color: "#93C5FD",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.08em",
      padding: "4px 12px",
      borderRadius: 99,
      textTransform: "uppercase",
    }}>
      {children}
    </span>
  );
}

/* Navbar */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Features", "Learning Path", "Testimonials", "FAQ"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,23,42,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(37,99,235,0.15)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#2563EB,#1E40AF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={16} color="white" />
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "white", letterSpacing: "-0.02em" }}>PathSkill</span>
        </div>
        <div className="hide-mobile" style={{ display: "flex", gap: 32 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ color: "#94A3B8", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#DBEAFE"}
              onMouseLeave={e => e.target.style.color = "#94A3B8"}
            >{l}</a>
          ))}
        </div>
        <button style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "white", border: "none", padding: "10px 22px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all .3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(37,99,235,.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          className="hide-mobile"
        >Get Started</button>
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "none" }} className="show-mobile">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(15,23,42,0.97)", borderTop: "1px solid rgba(37,99,235,0.15)", padding: "16px 24px 24px" }}>
          {links.map(l => <div key={l} style={{ padding: "12px 0", color: "#94A3B8", fontSize: 15 }}>{l}</div>)}
          <button style={{ width: "100%", marginTop: 12, background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "white", border: "none", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Get Started</button>
        </div>
      )}
    </nav>
  );
}

/* Hero */
function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 80 }}>
      {/* BG Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      <GlowBlob style={{ width: 600, height: 600, top: -100, right: -100 }} />
      <GlowBlob style={{ width: 400, height: 400, bottom: 0, left: -100 }} />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 4 + (i % 3) * 3,
          height: 4 + (i % 3) * 3,
          borderRadius: "50%",
          background: `rgba(37,99,235,${0.3 + (i % 4) * 0.1})`,
          left: `${10 + i * 12}%`,
          top: `${15 + (i % 5) * 15}%`,
          animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
        }} />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }} className="hero-grid">
        {/* Left */}
        <div style={{ animation: "fade-up 0.9s ease forwards" }}>
          <Badge>Platform Career Learning #1 untuk IT Indonesia</Badge>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,68px)",
            lineHeight: 1.05, marginTop: 20, marginBottom: 24,
            background: "linear-gradient(135deg,#FFFFFF 40%,#93C5FD 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}>
            Stop Belajar<br />Tanpa Arah.
          </h1>
          <p style={{ color: "#94A3B8", fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.75, maxWidth: 480, marginBottom: 36 }}>
            PathSkill membantu fresh graduate IT mengetahui <span style={{ color: "#93C5FD" }}>gap skill</span> mereka, mengikuti <span style={{ color: "#93C5FD" }}>learning path terstruktur</span>, dan membangun <span style={{ color: "#93C5FD" }}>portofolio</span> agar lebih siap kerja.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "white",
              border: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 600,
              fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 0 30px rgba(37,99,235,.4)", transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 30px rgba(37,99,235,.4)"; }}
            >
              Mulai Sekarang <ArrowRight size={16} />
            </button>
            <button style={{
              background: "rgba(37,99,235,0.1)", color: "#93C5FD",
              border: "1px solid rgba(37,99,235,0.3)", padding: "14px 28px", borderRadius: 12,
              fontWeight: 600, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.1)"; }}
            >
              <Play size={16} fill="currentColor" /> Lihat Demo
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            {[["500+","Pengguna Aktif"],["85%","Lebih Confident"],["22+","Karier Dicapai"]].map(([n,l]) => (
              <div key={n}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "white" }}>{n}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Dashboard Card */}
        <div style={{ position: "relative", animation: "float 5s ease-in-out infinite" }}>
          <div style={{
            background: "rgba(15,23,42,0.8)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(37,99,235,0.25)", borderRadius: 24,
            padding: 24, boxShadow: "0 30px 80px rgba(0,0,0,.5), 0 0 60px rgba(37,99,235,.15)",
          }}>
            {/* Card header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "white" }}>Skill Analysis</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>Frontend Developer Path</div>
              </div>
              <div style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#93C5FD", fontWeight: 600 }}>Live</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                <PolarGrid stroke="rgba(37,99,235,0.15)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748B", fontSize: 11 }} />
                <Radar name="Kamu" dataKey="user" stroke="#2563EB" fill="#2563EB" fillOpacity={0.25} strokeWidth={2} />
                <Radar name="Industri" dataKey="industry" stroke="#93C5FD" fill="#93C5FD" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <div style={{ flex: 1, background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 12, padding: 12 }}>
                <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>Gap Score</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#F87171" }}>-38%</div>
              </div>
              <div style={{ flex: 1, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: 12 }}>
                <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>Progress</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#34D399" }}>64%</div>
              </div>
              <div style={{ flex: 1, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 12, padding: 12 }}>
                <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>Modul</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#C084FC" }}>12/19</div>
              </div>
            </div>
          </div>
          {/* Floating mini card */}
          <div style={{
            position: "absolute", top: -20, right: -20,
            background: "rgba(15,23,42,0.9)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(37,99,235,0.3)", borderRadius: 16,
            padding: "12px 16px", animation: "float 4s ease-in-out 1s infinite",
            boxShadow: "0 8px 30px rgba(0,0,0,.4)",
          }}>
            <div style={{ fontSize: 11, color: "#64748B" }}>Rekomendasi Selanjutnya</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginTop: 3 }}>TypeScript Fundamentals</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <div style={{ flex: 1, height: 4, background: "rgba(37,99,235,0.15)", borderRadius: 2 }}>
                <div style={{ width: "35%", height: "100%", background: "#2563EB", borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 11, color: "#93C5FD" }}>35%</span>
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: -16, left: -20,
            background: "rgba(15,23,42,0.9)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12,
            padding: "10px 14px", animation: "float 4s ease-in-out 2s infinite",
            boxShadow: "0 8px 30px rgba(0,0,0,.4)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={14} color="#34D399" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "white" }}>Assignment Selesai!</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>React Hooks Project</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Problems */
function ProblemSection() {
  return (
    <section id="features" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <GlowBlob style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
          <Badge>Pain Points</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", marginTop: 16, marginBottom: 16, color: "white", letterSpacing: "-0.02em" }}>
            Kamu Pernah Merasakan Ini?
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
            Ribuan fresh graduate IT mengalami masalah yang sama sebelum menemukan PathSkill.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {problems.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              background: "rgba(15,23,42,0.7)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(37,99,235,0.15)", borderRadius: 20,
              padding: 28, cursor: "default", transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.4)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(37,99,235,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.15)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Icon size={22} color="#60A5FA" />
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "white", marginBottom: 10 }}>{title}</h3>
              <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Solution */
function SolutionSection() {
  return (
    <section style={{ padding: "100px 24px", background: "rgba(37,99,235,0.03)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
          <Badge>Solusi Lengkap</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", marginTop: 16, marginBottom: 16, color: "white", letterSpacing: "-0.02em" }}>
            Semua yang Kamu Butuhkan<br />untuk Siap Kerja
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            Dari assessment skill hingga portofolio siap kirim, semua ada di satu platform.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          {solutions.map(({ icon: Icon, title, desc, tag }, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              background: "rgba(15,23,42,0.8)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(37,99,235,0.15)", borderRadius: 22,
              padding: 30, position: "relative", overflow: "hidden", cursor: "default", transition: "all .35s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.45)"; e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 25px 50px rgba(37,99,235,.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.15)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "0 0 0 80px", background: "rgba(37,99,235,0.05)" }} />
              <span style={{ position: "absolute", top: 16, right: 16, fontSize: 11, color: "#60A5FA", background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 6, padding: "3px 8px", fontWeight: 600 }}>{tag}</span>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: "linear-gradient(135deg,rgba(37,99,235,0.3),rgba(29,78,216,0.15))", border: "1px solid rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Icon size={24} color="#60A5FA" />
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: "white", marginBottom: 12 }}>{title}</h3>
              <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* How It Works */
function HowItWorksSection() {
  return (
    <section id="learning-path" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <GlowBlob style={{ width: 400, height: 400, bottom: 0, right: 0 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }} className="reveal">
          <Badge>Cara Kerja</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", marginTop: 16, color: "white", letterSpacing: "-0.02em" }}>
            4 Langkah Menuju Karier Impian
          </h2>
        </div>
        {/* Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 0, position: "relative" }}>
          {/* connector line */}
          <div style={{ position: "absolute", top: 44, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg,transparent,rgba(37,99,235,.4),rgba(37,99,235,.4),transparent)", zIndex: 0 }} className="hide-mobile" />
          {steps.map(({ n, icon: Icon, title, desc }, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 88, height: 88, borderRadius: 24, margin: "0 auto 24px",
                background: "rgba(15,23,42,0.9)", border: "2px solid rgba(37,99,235,0.4)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                boxShadow: "0 0 0 8px rgba(15,23,42,.8), 0 0 30px rgba(37,99,235,.2)",
                transition: "all .3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 8px rgba(15,23,42,.8), 0 0 40px rgba(37,99,235,.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.4)"; e.currentTarget.style.boxShadow = "0 0 0 8px rgba(15,23,42,.8), 0 0 30px rgba(37,99,235,.2)"; }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", letterSpacing: "0.05em" }}>{n}</span>
                <Icon size={20} color="#60A5FA" />
              </div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "white", marginBottom: 10 }}>{title}</h3>
              <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Dashboard Preview */
function DashboardPreview() {
  return (
    <section style={{ padding: "100px 24px", background: "rgba(37,99,235,0.03)", position: "relative", overflow: "hidden" }}>
      <GlowBlob style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }} className="reveal">
          <Badge>Dashboard Preview</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", marginTop: 16, color: "white", letterSpacing: "-0.02em" }}>
            Semua Data Karier Kamu<br />dalam Satu Tampilan
          </h2>
        </div>
        {/* Dashboard mockup */}
        <div className="reveal" style={{
          background: "rgba(15,23,42,0.85)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(37,99,235,0.2)", borderRadius: 24,
          overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.5), 0 0 80px rgba(37,99,235,.1)",
        }}>
          {/* Browser chrome */}
          <div style={{ background: "rgba(37,99,235,0.08)", borderBottom: "1px solid rgba(37,99,235,0.1)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
            </div>
            <div style={{ flex: 1, background: "rgba(37,99,235,0.08)", borderRadius: 6, padding: "5px 14px", fontSize: 12, color: "#64748B" }}>app.pathskill.id/dashboard</div>
          </div>
          {/* Dashboard content */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: 420 }} className="dashboard-grid">
            {/* Sidebar */}
            <div style={{ borderRight: "1px solid rgba(37,99,235,0.1)", padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#2563EB,#1E40AF)" }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Rizky Aditya</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>Frontend Dev Path</div>
                </div>
              </div>
              {[["Dashboard","#2563EB",true],[" Learning","#64748B",false],["Progress","#64748B",false],["Portfolio","#64748B",false],["Karier","#64748B",false]].map(([l, c, active]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 4, background: active ? "rgba(37,99,235,0.15)" : "transparent", cursor: "pointer" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                  <span style={{ fontSize: 13, color: active ? "#93C5FD" : "#64748B", fontWeight: active ? 600 : 400 }}>{l}</span>
                </div>
              ))}
            </div>
            {/* Main content */}
            <div style={{ padding: 24 }}>
              {/* Top row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
                {[
                  { label: "Skill Match", value: "62%", color: "#F87171", bg: "rgba(239,68,68,0.08)" },
                  { label: "Modul Selesai", value: "12/19", color: "#34D399", bg: "rgba(16,185,129,0.08)" },
                  { label: "Assignment", value: "8 Done", color: "#C084FC", bg: "rgba(168,85,247,0.08)" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} style={{ background: bg, border: `1px solid ${color}33`, borderRadius: 14, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color }}>{value}</div>
                  </div>
                ))}
              </div>
              {/* Bottom row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 12 }}>Learning Progress</div>
                  {[["React Fundamentals",100],["TypeScript Basics",65],["Node.js REST API",30]].map(([label, pct]) => (
                    <div key={label} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748B", marginBottom: 4 }}>
                        <span>{label}</span><span>{pct}%</span>
                      </div>
                      <div style={{ height: 5, background: "rgba(37,99,235,0.1)", borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#34D399" : "#2563EB", borderRadius: 3 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "white", marginBottom: 12 }}>Career Recommendations</div>
                  {[["Frontend Developer","Rp 8–15jt","#34D399"],["React Engineer","Rp 10–18jt","#60A5FA"],["Full Stack Dev","Rp 12–20jt","#C084FC"]].map(([role, sal, c]) => (
                    <div key={role} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "white" }}>{role}</div>
                        <div style={{ fontSize: 11, color: "#64748B" }}>{sal}/bulan</div>
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Testimonials */
function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <GlowBlob style={{ width: 400, height: 400, top: 0, left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
          <Badge>Testimoni Nyata</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", marginTop: 16, color: "white", letterSpacing: "-0.02em" }}>
            Dipercaya 500+ Pengguna
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {testimonials.map(({ name, role, avatar, text, stars }, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              background: "rgba(15,23,42,0.8)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(37,99,235,0.15)", borderRadius: 22,
              padding: 28, transition: "all .3s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.4)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,.15)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[...Array(stars)].map((_, j) => <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>"{text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "white", flexShrink: 0 }}>
                  {avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "white" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Stats */
function StatsSection({ statsRef, modules, confidence, careers, users }) {
  const stats = [
    { value: modules, suffix: "+", label: "Learning Modules", icon: BookOpen },
    { value: confidence, suffix: "%", label: "User More Confident", icon: TrendingUp },
    { value: careers, suffix: "+", label: "Career Paths", icon: Briefcase },
    { value: users, suffix: "+", label: "User Testing", icon: Users },
  ];
  return (
    <section ref={statsRef} style={{ padding: "80px 24px", background: "rgba(37,99,235,0.04)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {stats.map(({ value, suffix, label, icon: Icon }, i) => (
            <div key={i} style={{
              background: "rgba(15,23,42,0.8)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(37,99,235,0.2)", borderRadius: 20,
              padding: "28px 24px", textAlign: "center",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon size={20} color="#60A5FA" />
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 42, fontWeight: 800, color: "white", lineHeight: 1 }}>
                {value}{suffix}
              </div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FAQ */
function FAQSection({ faqs, openFaq, setOpenFaq }) {
  return (
    <section id="faq" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }} className="reveal">
          <Badge>FAQ</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", marginTop: 16, color: "white", letterSpacing: "-0.02em" }}>
            Pertanyaan yang Sering Ditanya
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="reveal" style={{
              background: "rgba(15,23,42,0.8)", backdropFilter: "blur(16px)",
              border: `1px solid ${openFaq === i ? "rgba(37,99,235,.5)" : "rgba(37,99,235,.15)"}`,
              borderRadius: 16, overflow: "hidden", transition: "border-color .3s",
            }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: "100%", background: "none", border: "none", padding: "20px 24px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", gap: 16,
              }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 15, color: "white", textAlign: "left" }}>{q}</span>
                <ChevronDown size={18} color="#64748B" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px", color: "#94A3B8", fontSize: 14, lineHeight: 1.75, borderTop: "1px solid rgba(37,99,235,.1)" }}>
                  <div style={{ paddingTop: 16 }}>{a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA */
function CTASection() {
  return (
    <section style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <GlowBlob style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div className="reveal" style={{
          background: "rgba(15,23,42,0.85)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(37,99,235,0.3)", borderRadius: 28,
          padding: "64px 48px",
          boxShadow: "0 40px 80px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.05)",
        }}>
          <Badge>Mulai Sekarang</Badge>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(30px,5vw,56px)", marginTop: 20, marginBottom: 20, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Mulai Perjalanan<br />Kariermu Hari Ini.
          </h2>
          <p style={{ color: "#64748B", fontSize: 16, marginBottom: 36, maxWidth: 420, margin: "0 auto 36px" }}>
            Bergabung dengan ratusan fresh graduate IT yang sudah menemukan arah karier mereka bersama PathSkill.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "white", border: "none",
              padding: "15px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer",
              boxShadow: "0 0 40px rgba(37,99,235,.5)", transition: "all .3s", display: "flex", alignItems: "center", gap: 8,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(37,99,235,.65)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 40px rgba(37,99,235,.5)"; }}
            >
              Get Started <ArrowRight size={16} />
            </button>
            <button style={{
              background: "rgba(37,99,235,0.08)", color: "#93C5FD",
              border: "1px solid rgba(37,99,235,0.3)", padding: "15px 32px", borderRadius: 12,
              fontWeight: 600, fontSize: 16, cursor: "pointer", transition: "all .3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.08)"; }}
            >
              Join Beta
            </button>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: "#334155" }}>Gratis untuk memulai · Tanpa kartu kredit</p>
        </div>
      </div>
    </section>
  );
}

/* Footer */
function FooterSection() {
  return (
    <footer style={{ borderTop: "1px solid rgba(37,99,235,0.12)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#2563EB,#1E40AF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingUp size={16} color="white" />
              </div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "white" }}>PathSkill</span>
            </div>
            <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75, maxWidth: 280 }}>
              Platform career learning untuk fresh graduate IT Indonesia. Dari gap skill hingga siap kerja, semua ada di sini.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {[Globe, Code2, Database, Cpu].map((Icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.25)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(37,99,235,0.1)"; e.currentTarget.style.borderColor = "rgba(37,99,235,0.2)"; }}
                >
                  <Icon size={15} color="#60A5FA" />
                </div>
              ))}
            </div>
          </div>
          {[
            { title: "Produk", links: ["Features","Learning Path","Dashboard","Portfolio Builder"] },
            { title: "Karier", links: ["Frontend Dev","Backend Dev","Data Analyst","UI/UX Designer"] },
            { title: "Perusahaan", links: ["Tentang Kami","Blog","Kontak","Privacy Policy"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "white", marginBottom: 20 }}>{title}</div>
              {links.map(l => (
                <div key={l} style={{ fontSize: 13, color: "#64748B", marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.target.style.color = "#93C5FD"}
                  onMouseLeave={e => e.target.style.color = "#64748B"}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(37,99,235,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#334155" }}>© 2026 PathSkill. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
              <span key={l} style={{ fontSize: 13, color: "#334155", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root Export ────────────────────────────────── */
export default function PathSkillLanding() {
  const [openFaq, setOpenFaq] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const modules    = useCounter(1000, 2200, statsVisible);
  const confidence = useCounter(85,   2000, statsVisible);
  const careers    = useCounter(500,  2000, statsVisible);
  const users      = useCounter(22,   1500, statsVisible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, * { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1,h2,h3,.font-display { font-family: 'Syne', sans-serif !important; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fade-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
        .revealed { opacity:1 !important; transform:translateY(0) !important; }
        .reveal-delay-1 { transition-delay:.1s }
        .reveal-delay-2 { transition-delay:.2s }
        .reveal-delay-3 { transition-delay:.3s }
        .reveal-delay-4 { transition-delay:.4s }
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:#0F172A }
        ::-webkit-scrollbar-thumb { background:#2563EB; border-radius:3px }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .dashboard-grid { grid-template-columns:1fr !important; }
          .footer-grid { grid-template-columns:1fr 1fr !important; }
          .hide-mobile { display:none !important; }
          .show-mobile { display:block !important; }
        }
        .hide-mobile { }
        .show-mobile { display:none; }
      `}</style>
      <div style={{ background: "#0F172A", color: "#F8FAFC", minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <DashboardPreview />
        <TestimonialsSection />
        <StatsSection statsRef={statsRef} modules={modules} confidence={confidence} careers={careers} users={users} />
        <FAQSection faqs={faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        <CTASection />
        <FooterSection />
      </div>
    </>
  );
}
