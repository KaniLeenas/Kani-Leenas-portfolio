import React, { useEffect, useMemo, useRef, useState } from "react";

type CertificateItem = {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  image: string;        // path in /public or remote URL
  verifyUrl?: string;
};

type CertificateProps = {
  certificates?: CertificateItem[]; // optional: supply from API/Firestore
  heading?: string;
  subheading?: string;
  showStats?: boolean;
};

// Example data (safe defaults). NOTE: public assets must be referenced with a leading "/"
const fallbackCertificates: CertificateItem[] = [
  { id: "c1", title: "DevOps and AI on AWS: Build Smarter, Faster", issuer: "AWS", date: "2025", image: "/lovable-uploads/image.png", verifyUrl: "https://coursera.org/verify/specialization/O83C93510LBX" },
  { id: "c2", title: "Meta Android Developer", issuer: "Meta", date: "2024", image: "/Screenshot 2025-10-25 210219.png", verifyUrl: "https://coursera.org/verify/professional-cert/FGEBXE4TATX7" },
  { id: "c3", title: "AWS Cloud Technical Essentials", issuer: "Amazon Web Services", date: "2025", image: "/lovable-uploads/Screenshot 2025-10-25 211240.png", verifyUrl: "https://coursera.org/verify/B26G7N0D5V1A" },
  { id: "c4", title: "DevOps Essentials and Version Control with Git", issuer: "Edureka", date: "2025", image: "/lovable-uploads/Screenshot 2025-10-25 2112402.png", verifyUrl: "https://coursera.org/verify/Q20461VZMY7O" },
  { id: "c5", title: "Introduction to Software Engineering", issuer: "IBM", date: "2024", image: "/lovable-uploads/Screenshot 2025-10-25 212258.png", verifyUrl: "https://coursera.org/verify/S20NXGUWP7LS" },
  { id: "c6", title: "Artificial Intelligence (AI) Education for Teachers", issuer: "IBM", date: "2024", image: "/lovable-uploads/WhatsApp Image 2025-10-25 at 21.32.35_aa447926.jpg", verifyUrl: "https://coursera.org/verify/3FZAVC6PBSFS" },
  { id: "c7", title: "Project Network", issuer: "Coursera", date: "2022", image: "/lovable-uploads/WhatsApp Image 2025-10-25 at 21.32.37_6bef8dba.jpg", verifyUrl: "https://coursera.org/verify/PD9PD7BES7KQ" },
  { id: "c8", title: "Python Programming", issuer: "CODL, University of Moratuwa", date: "2022", image: "/lovable-uploads/WhatsApp Image 2025-10-25 at 21.32.38_34c21b56.jpg", verifyUrl: "https://open.uom.lk/verify" },
];

const Lightbox: React.FC<{
  item?: CertificateItem | null;
  open: boolean;
  onClose: () => void;
}> = ({ item, open, onClose }) => {
  if (!open || !item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Certificate preview"
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
          onClick={onClose}
          aria-label="Close preview"
        >
          Close
        </button>
        <img
          src={item.image}
          alt={`${item.title}${item.issuer ? ` - ${item.issuer}` : ""}`}
          className="max-h-[80vh] w-full object-contain"
        />
        <div className="border-t border-white/10 p-4 text-white">
          <h4 className="text-lg font-semibold">{item.title}</h4>
          <p className="text-sm text-white/80">
            {item.issuer ?? ""} {item.date ? `• ${item.date}` : ""}
          </p>
          {item.verifyUrl && item.verifyUrl !== "#" && (
            <a
              href={item.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
            >
              Verify Certificate
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Certificate: React.FC<CertificateProps> = ({
  certificates,
  heading = "Certificates",
  subheading = "A curated selection of my certifications across development, cloud, and DevOps.",
  showStats = true,
}) => {
  const list = useMemo(
    () => (certificates && certificates.length ? certificates : fallbackCertificates),
    [certificates]
  );

  const [inView, setInView] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState<CertificateItem | null>(null);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const open = (item: CertificateItem) => {
    setCurrent(item);
    setModalOpen(true);
  };
  const close = () => {
    setModalOpen(false);
    setCurrent(null);
  };

  const total = list.length;
  const byIssuer = Array.from(new Set(list.map((c) => (c.issuer || "").trim()).filter(Boolean))).length;

  return (
    <section id="Certificate" className="py-20" ref={ref as any}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className={`mb-6 sm:mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-sm uppercase tracking-widest text-white/60">Showcase</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
          <p className="mt-2 max-w-3xl text-white/70">{subheading}</p>
          {showStats && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80">
                {total} {total === 1 ? "certificate" : "certificates"}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80">
                {byIssuer} issuers
              </span>
            </div>
          )}
        </div>

        {/* Grid of uniform cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, idx) => (
            <div
              key={item.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition hover:shadow-2xl"
              style={{ animationDelay: `${idx * 60}ms` }}
              role="button"
              tabIndex={0}
              onClick={() => open(item)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(item); }}
              aria-label={`Open certificate ${item.title}`}
            >
              {/* Image area: fixed aspect + padding so nothing is cropped */}
              <div className="relative bg-black/30">
                <div className="aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title}${item.issuer ? ` - ${item.issuer}` : ""}`}
                    className={`h-full w-full object-contain p-3 transition duration-300 group-hover:scale-[1.01] ${inView ? "opacity-100" : "opacity-0"}`}
                    loading="lazy"
                  />
                </div>

                {/* Hover actions on top-right */}
                <div className="pointer-events-none absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="pointer-events-auto rounded-lg border border-white/20 bg-black/50 px-2 py-1 text-xs text-white/90 backdrop-blur-md">
                    Preview
                  </span>
                  {item.verifyUrl && item.verifyUrl !== "#" && (
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="pointer-events-auto rounded-lg border border-white/20 bg-black/50 px-2 py-1 text-xs text-white/90 backdrop-blur-md hover:bg-white/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify
                    </a>
                  )}
                </div>
              </div>

              {/* Text content under the image */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h4 className="text-base font-semibold text-white">{item.title}</h4>
                  {(item.issuer || item.date) && (
                    <p className="mt-1 text-sm text-white/70">
                      {item.issuer ?? ""} {item.date ? `• ${item.date}` : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox modal */}
        <Lightbox item={current} open={modalOpen} onClose={close} />

        {/* Helper */}
        <p className="mt-8 text-xs text-white/50">
          Pass <code>certificates</code> as a prop or edit <code>fallbackCertificates</code>. Place images under <code>/public</code> and reference them with a leading <code>/</code>.
        </p>
      </div>
    </section>
  );
};

export default Certificate;
