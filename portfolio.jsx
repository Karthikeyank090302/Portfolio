import { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────
const DATA = {
  name: "Karthikeyan Krishnan",
  title: "Data Engineer · PySpark · ETL Pipelines",
  tagline: "Turning raw data into production-grade pipelines that scale.",
  email: "krishnankarthikeya8@gmail.com",
  phone: "+91 96004 47244",
  location: "Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/karthikeyankrishnan08-",
  summary:
    "I'm a Data Engineer and Python Developer who architects scalable ETL pipelines and distributed data workflows. With a foundation in PySpark, Apache Spark, and SQL, I design systems that handle millions of records reliably — from raw ingestion to structured, auditable warehouses. Honors graduate in Data Science (CGPA 8.35) with a bias for clean, measurable, production-grade solutions.",

  skills: {
    "Languages & Frameworks": ["Python", "PySpark", "Apache Spark", "Spark SQL", "SQL", "Java", "C"],
    "Data Engineering": ["ETL/ELT Pipelines", "Data Transformation", "Data Validation", "Distributed Computing", "Batch Processing"],
    "Libraries & ML": ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "TensorFlow", "OpenCV"],
    "Databases": ["MySQL", "PostgreSQL", "Spark SQL (Hive)", "Relational Schema Design"],
    "Cloud & Big Data": ["Hadoop Ecosystem", "HDFS", "AWS Fundamentals", "Distributed File Systems"],
    "Tools & Platforms": ["Git", "Django", "REST APIs", "VS Code", "Qt", "Jupyter Notebook"],
  },

  projects: [
    {
      title: "Big Data ETL Pipeline",
      subtitle: "PySpark · Apache Spark · Spark SQL · HDFS · MySQL",
      tag: "Data Engineering",
      color: "#00e5ff",
      metrics: ["10M+ records", "99.2% data accuracy", "~40% faster execution"],
      bullets: [
        "Engineered end-to-end ETL pipeline to ingest, transform, and load 10M+ records from CSV/JSON into a structured warehouse.",
        "Designed Spark SQL logic for multi-step cleansing, type casting, null handling, and deduplication.",
        "Optimized distributed processing via partition tuning and broadcast joins, cutting execution time by ~40%.",
        "Implemented schema validation checkpoints with anomaly logging to a MySQL audit table for full observability.",
      ],
    },
    {
      title: "NeuroFusion",
      subtitle: "Python · TensorFlow · CNN · OpenCV · Django",
      tag: "Machine Learning",
      color: "#ff6b9d",
      metrics: ["94%+ accuracy", "5,000+ MRI images", "Real-time inference"],
      bullets: [
        "Built and trained a CNN achieving 94%+ classification accuracy on brain tumor MRI datasets.",
        "Integrated OpenCV preprocessing pipeline to standardize and augment 5,000+ medical images.",
        "Deployed model via a Django REST API backend enabling real-time JSON inference for downstream integration.",
      ],
    },
    {
      title: "AI & Unemployment Analysis",
      subtitle: "Python · Pandas · NumPy · Matplotlib · EDA",
      tag: "Data Analysis",
      color: "#ffd93d",
      metrics: ["50K+ records", "Multivariate EDA", "Statistical correlations"],
      bullets: [
        "Executed comprehensive data cleaning on a 50,000+ record dataset — missing values, outliers, and encoding inconsistencies.",
        "Conducted multivariate EDA to surface statistically significant correlations between AI adoption and unemployment rates.",
      ],
    },
  ],

  experience: [
    {
      role: "Software Developer Intern",
      company: "VgoTec Solutions",
      duration: "Jul 2025 – Dec 2025",
      bullets: [
        "Developed and optimized Java backend modules, improving system response time by 25% under high-throughput transactional loads.",
        "Diagnosed and refactored critical SQL queries — indexing + join optimization cut query execution time by 35%.",
        "Collaborated on C++/Qt UI module development, integrating frontend components with backend data services.",
      ],
    },
    {
      role: "Python Developer Intern",
      company: "Techfidelite Solutions",
      duration: "Jul 2024 – Sep 2024",
      bullets: [
        "Designed Python applications with MySQL integration: CRUD operations, parameterized queries, and connection pooling.",
        "Automated data extraction workflows, reducing manual processing time by ~60%.",
        "Built and deployed RESTful API endpoints for structured data exchange between frontend and backend layers.",
      ],
    },
  ],

  education: {
    degree: "B.E. Computer Science Engineering",
    institution: "Unnamalai Institute of Technology",
    location: "Tamil Nadu",
    duration: "2021 – 2025",
    cgpa: "8.35",
    honors: "Honors in Data Science",
  },

  certifications: [
    "Big Data 101, 201 & 301 – Infosys Springboard (Hadoop, Spark, Distributed Systems)",
    "Oracle Certified Foundation Associate – Oracle",
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Nav({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["About", "Skills", "Projects", "Experience", "Contact"];
  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? (dark ? "rgba(6,6,16,0.92)" : "rgba(255,255,255,0.92)") : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}` : "none",
        transition: "background 0.3s, border 0.3s",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em", color: dark ? "#fff" : "#0a0a0a" }}>
        KK<span style={{ color: "#00e5ff" }}>.</span>
      </span>

      {/* Desktop */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map((l) => (
          <button
            key={l}
            onClick={() => scroll(l)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
              color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
              letterSpacing: "0.06em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#00e5ff"}
            onMouseLeave={e => e.target.style.color = dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)"}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
            border: "none", borderRadius: "50%", width: "34px", height: "34px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", transition: "background 0.2s",
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ dark }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 3200);
    return () => clearInterval(t);
  }, []);
  const roles = ["Data Engineer", "PySpark Developer", "ETL Architect", "Python Developer"];
  const role = roles[tick % roles.length];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.03,
        backgroundImage: "linear-gradient(rgba(0,229,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,1) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", width: "100%", position: "relative" }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.78rem",
          color: "#00e5ff", letterSpacing: "0.12em", marginBottom: "1.2rem",
          opacity: 0, animation: "fadeUp 0.6s ease 0.1s forwards",
        }}>
          ✦ AVAILABLE FOR OPPORTUNITIES
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: dark ? "#fff" : "#0a0a0a",
          margin: "0 0 0.4rem",
          opacity: 0, animation: "fadeUp 0.6s ease 0.2s forwards",
        }}>
          {DATA.name}
        </h1>

        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
          color: "#00e5ff",
          marginBottom: "1.5rem",
          height: "2.8rem",
          overflow: "hidden",
          opacity: 0, animation: "fadeUp 0.6s ease 0.35s forwards",
        }}>
          <span style={{
            display: "inline-block",
            animation: "roleCycle 0.4s ease",
            key: role,
          }}>
            {role}
          </span>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
          maxWidth: "540px", lineHeight: 1.7, marginBottom: "2.5rem",
          opacity: 0, animation: "fadeUp 0.6s ease 0.5s forwards",
        }}>
          {DATA.tagline}
        </p>

        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          opacity: 0, animation: "fadeUp 0.6s ease 0.65s forwards",
        }}>
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.82rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              background: "#00e5ff", color: "#000",
              padding: "0.85rem 2rem", borderRadius: "3px",
              textDecoration: "none", fontWeight: 700,
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 24px rgba(0,229,255,0.35)",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 32px rgba(0,229,255,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 24px rgba(0,229,255,0.35)"; }}
          >
            View Projects
          </a>
          <a
            href={`mailto:${DATA.email}`}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.82rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              background: "transparent",
              border: `1.5px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
              color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
              padding: "0.85rem 2rem", borderRadius: "3px",
              textDecoration: "none", fontWeight: 600,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#00e5ff"; e.target.style.color = "#00e5ff"; }}
            onMouseLeave={e => { e.target.style.borderColor = dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"; e.target.style.color = dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"; }}
          >
            Contact Me
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: "2.5rem", marginTop: "4rem", flexWrap: "wrap",
          opacity: 0, animation: "fadeUp 0.6s ease 0.8s forwards",
        }}>
          {[
            { n: "10M+", l: "Records Processed" },
            { n: "99.2%", l: "Data Accuracy" },
            { n: "~40%", l: "Pipeline Speedup" },
            { n: "94%+", l: "ML Accuracy" },
          ].map(({ n, l }) => (
            <div key={l}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.7rem", color: "#00e5ff", letterSpacing: "-0.02em" }}>{n}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", letterSpacing: "0.06em", marginTop: "0.2rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes roleCycle { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </section>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, dark, style = {} }) {
  return (
    <section
      id={id}
      style={{
        padding: "clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
        maxWidth: "1100px",
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children, dark }) {
  return (
    <div style={{
      fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: "#00e5ff", marginBottom: "0.6rem",
    }}>
      ✦ {children}
    </div>
  );
}

function SectionTitle({ children, dark }) {
  return (
    <h2 style={{
      fontFamily: "'Syne', sans-serif", fontWeight: 800,
      fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.03em",
      color: dark ? "#fff" : "#0a0a0a",
      lineHeight: 1.1, marginBottom: "3rem",
    }}>
      {children}
    </h2>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ dark }) {
  return (
    <Section id="about" dark={dark} style={{
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
    }}>
      <Reveal>
        <SectionLabel dark={dark}>About Me</SectionLabel>
        <SectionTitle dark={dark}>Built for scale.<br />Driven by data.</SectionTitle>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "start" }}>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.05rem", lineHeight: 1.85,
            color: dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
          }}>
            {DATA.summary}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "📍", label: "Location", value: DATA.location },
              { icon: "🎓", label: "Education", value: `${DATA.education.degree} — ${DATA.education.cgpa} CGPA` },
              { icon: "🏅", label: "Honors", value: DATA.education.honors },
              { icon: "📧", label: "Email", value: DATA.email },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                display: "flex", gap: "1rem", alignItems: "flex-start",
                padding: "1rem 1.2rem",
                background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                borderRadius: "6px",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.1em", color: "#00e5ff", marginBottom: "0.2rem" }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills({ dark }) {
  return (
    <Section id="skills" dark={dark} style={{
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
    }}>
      <Reveal>
        <SectionLabel dark={dark}>Technical Skills</SectionLabel>
        <SectionTitle dark={dark}>The stack<br />behind the work.</SectionTitle>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {Object.entries(DATA.skills).map(([cat, items], i) => (
          <Reveal key={cat} delay={i * 0.07}>
            <div style={{
              padding: "1.6rem",
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              borderRadius: "8px",
              transition: "border-color 0.25s, transform 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.35)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", color: "#00e5ff", marginBottom: "1rem" }}>{cat.toUpperCase()}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {items.map(skill => (
                  <span key={skill} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                    padding: "0.3rem 0.7rem", borderRadius: "3px",
                    background: dark ? "rgba(0,229,255,0.08)" : "rgba(0,229,255,0.1)",
                    color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(0,229,255,0.15)",
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects({ dark }) {
  const [active, setActive] = useState(0);
  const p = DATA.projects[active];

  return (
    <Section id="projects" dark={dark} style={{
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
    }}>
      <Reveal>
        <SectionLabel dark={dark}>Projects</SectionLabel>
        <SectionTitle dark={dark}>Production-grade<br />solutions.</SectionTitle>
      </Reveal>

      {/* Tab selector */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {DATA.projects.map((proj, i) => (
          <button
            key={proj.title}
            onClick={() => setActive(i)}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.75rem",
              letterSpacing: "0.06em", padding: "0.6rem 1.2rem",
              borderRadius: "3px", cursor: "pointer",
              border: `1.5px solid ${i === active ? proj.color : (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)")}`,
              background: i === active ? `${proj.color}18` : "transparent",
              color: i === active ? proj.color : (dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)"),
              transition: "all 0.2s",
            }}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Project card */}
      <Reveal key={active}>
        <div style={{
          border: `1.5px solid ${p.color}40`,
          borderRadius: "12px",
          overflow: "hidden",
          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
        }}>
          {/* Header bar */}
          <div style={{
            background: `linear-gradient(135deg, ${p.color}18, transparent)`,
            padding: "2rem 2.5rem",
            borderBottom: `1px solid ${p.color}20`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.68rem",
                  letterSpacing: "0.1em", color: p.color,
                  background: `${p.color}18`, padding: "0.25rem 0.6rem", borderRadius: "2px",
                  marginBottom: "0.8rem", display: "inline-block",
                }}>
                  {p.tag}
                </span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.7rem", color: dark ? "#fff" : "#0a0a0a", letterSpacing: "-0.02em" }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginTop: "0.4rem" }}>{p.subtitle}</p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {p.metrics.map(m => (
                  <div key={m} style={{
                    padding: "0.5rem 1rem", borderRadius: "4px",
                    background: `${p.color}18`, border: `1px solid ${p.color}30`,
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: "0.85rem", color: p.color,
                  }}>
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bullets */}
          <div style={{ padding: "2rem 2.5rem" }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ color: p.color, marginTop: "0.25rem", flexShrink: 0, fontSize: "0.9rem" }}>→</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem", lineHeight: 1.75, color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function Experience({ dark }) {
  return (
    <Section id="experience" dark={dark} style={{
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
    }}>
      <Reveal>
        <SectionLabel dark={dark}>Experience</SectionLabel>
        <SectionTitle dark={dark}>Where I've<br />shipped real work.</SectionTitle>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {DATA.experience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.1}>
            <div style={{
              padding: "2rem",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              borderRadius: "10px",
              background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
              transition: "border-color 0.25s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem" }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: dark ? "#fff" : "#0a0a0a" }}>{exp.role}</h3>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#00e5ff", marginTop: "0.2rem" }}>{exp.company}</div>
                </div>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
                  color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                  padding: "0.3rem 0.8rem",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  borderRadius: "3px",
                  letterSpacing: "0.04em",
                }}>
                  {exp.duration}
                </span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {exp.bullets.map((b, j) => (
                  <li key={j} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#00e5ff", flexShrink: 0, marginTop: "0.25rem", fontSize: "0.8rem" }}>▸</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.62)" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Certifications */}
      <Reveal delay={0.25}>
        <div style={{ marginTop: "3rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", color: "#00e5ff", marginBottom: "1rem" }}>✦ CERTIFICATIONS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {DATA.certifications.map((c, i) => (
              <div key={i} style={{
                display: "flex", gap: "0.8rem", alignItems: "center",
                padding: "0.9rem 1.2rem",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                borderRadius: "6px",
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
              }}>
                <span style={{ fontSize: "1rem" }}>🏆</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact({ dark }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    const mailto = `mailto:${DATA.email}?subject=Portfolio Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inputStyle = (dark) => ({
    width: "100%",
    padding: "0.9rem 1.1rem",
    borderRadius: "5px",
    border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <Section id="contact" dark={dark} style={{
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
    }}>
      <Reveal>
        <SectionLabel dark={dark}>Get In Touch</SectionLabel>
        <SectionTitle dark={dark}>Let's build<br />something impactful.</SectionTitle>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
        <Reveal delay={0.1}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", marginBottom: "2rem" }}>
              Open to full-time Data Engineering roles, collaborations, or just a good conversation about data systems. Reach out — I respond promptly.
            </p>
            {[
              { icon: "📧", label: "Email", value: DATA.email, href: `mailto:${DATA.email}` },
              { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/karthikeyankrishnan08-", href: DATA.linkedin },
              { icon: "📱", label: "Phone", value: DATA.phone, href: `tel:${DATA.phone}` },
              { icon: "📍", label: "Location", value: DATA.location, href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{
                display: "flex", gap: "1rem", alignItems: "center",
                marginBottom: "1rem", padding: "0.85rem 1rem",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                borderRadius: "6px",
              }}>
                <span>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#00e5ff" }}>{label}</div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)", textDecoration: "none" }}>{value}</a>
                  ) : (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: dark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)" }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle(dark)}
              onFocus={e => e.target.style.borderColor = "#00e5ff"}
              onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}
            />
            <input
              placeholder="Your Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle(dark)}
              onFocus={e => e.target.style.borderColor = "#00e5ff"}
              onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}
            />
            <textarea
              placeholder="Your message..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={5}
              style={{ ...inputStyle(dark), resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#00e5ff"}
              onBlur={e => e.target.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}
            />
            <button
              onClick={handleSubmit}
              style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.82rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                background: sent ? "rgba(0,229,255,0.15)" : "#00e5ff",
                color: sent ? "#00e5ff" : "#000",
                border: sent ? "1.5px solid #00e5ff" : "none",
                padding: "1rem", borderRadius: "4px",
                cursor: "pointer", fontWeight: 700,
                transition: "all 0.2s",
              }}
            >
              {sent ? "✓ Message Opened in Email Client" : "Send Message →"}
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ dark }) {
  return (
    <footer style={{
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      padding: "2rem clamp(1.5rem, 5vw, 4rem)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>
        KK<span style={{ color: "#00e5ff" }}>.</span>
      </span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", letterSpacing: "0.06em" }}>
        © 2025 Karthikeyan Krishnan · Data Engineer
      </span>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div style={{
      minHeight: "100vh",
      background: dark ? "#060610" : "#f8f8fc",
      color: dark ? "#fff" : "#0a0a0a",
      transition: "background 0.35s, color 0.35s",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Nav dark={dark} setDark={setDark} />
      <Hero dark={dark} />
      <About dark={dark} />
      <Skills dark={dark} />
      <Projects dark={dark} />
      <Experience dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
