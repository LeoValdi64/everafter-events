"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Menu,
  X,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Users,
  Flower2,
  Star,
  ChevronDown,
  Phone,
  Mail,
  MapPinned,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Sparkles,
  Crown,
  Gem,
  ClipboardList,
  Palette,
  PartyPopper,
  CheckCircle,
  Building2,
} from "lucide-react";

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gold/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-gold"
        aria-expanded={open}
      >
        <span className="font-serif text-lg font-medium text-charcoal">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open
            ? "grid-rows-[1fr] opacity-100 pb-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-charcoal/70 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      message: "",
    });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  const hero = useInView(0.1);
  const about = useInView(0.15);
  const services = useInView(0.1);
  const gallery = useInView(0.1);
  const process = useInView(0.1);
  const testimonials = useInView(0.1);
  const pricing = useInView(0.1);
  const faqSection = useInView(0.1);
  const contact = useInView(0.1);

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-lg shadow-charcoal/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <Heart className="h-7 w-7 text-gold" fill="#C9A96E" />
              <span className="font-serif text-2xl font-bold text-charcoal">
                EverAfter <span className="text-gold">Events</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-charcoal/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/25"
              >
                Book Consultation
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-ivory/95 backdrop-blur-md px-4 pb-6 pt-2 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-charcoal/80 font-medium transition-colors hover:text-gold border-b border-gold/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 block rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section
        ref={hero.ref}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #FFFFF0 0%, #F4E1E1 40%, #FFFFF0 70%, #B2BDA0 100%)",
        }}
      >
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blush/30 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-sage/20 blur-2xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className={hero.inView ? "animate-fade-in-up" : "opacity-0"}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-5 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-charcoal/70">
                Luxury Wedding & Event Planning
              </span>
            </div>
          </div>

          <h1
            className={`font-serif text-5xl font-bold leading-tight text-charcoal sm:text-6xl lg:text-7xl ${
              hero.inView ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            Your Perfect Day,
            <br />
            <span className="text-gold">Perfectly Planned</span>
          </h1>

          <p
            className={`mx-auto mt-6 max-w-2xl text-lg text-charcoal/70 sm:text-xl ${
              hero.inView ? "animate-fade-in-up delay-300" : "opacity-0"
            }`}
          >
            From intimate ceremonies to grand celebrations, we craft
            unforgettable experiences tailored to your unique vision.
          </p>

          <div
            className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center ${
              hero.inView ? "animate-fade-in-up delay-400" : "opacity-0"
            }`}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gold-dark hover:shadow-xl hover:shadow-gold/25"
            >
              Start Planning
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold/40 bg-white/50 px-8 py-4 text-lg font-semibold text-charcoal backdrop-blur-sm transition-all hover:border-gold hover:bg-white/80"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* ── About Section ──────────────────────────────────────────────── */}
      <section id="about" ref={about.ref} className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div
              className={about.inView ? "animate-fade-in-up" : "opacity-0"}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-gold">
                About Us
              </span>
              <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
                Crafting Dreams Into{" "}
                <span className="text-gold">Reality</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
                With over 15 years of experience, EverAfter Events has been the
                trusted partner for couples and organizations seeking flawless,
                memorable celebrations. Our dedicated team of planners,
                designers, and coordinators brings passion and precision to every
                detail.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                We believe every event tells a story. Our mission is to ensure
                yours is told beautifully, from the first consultation to the
                last dance.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 sm:grid-cols-3 ${
                about.inView ? "animate-scale-in" : "opacity-0"
              }`}
            >
              {[
                {
                  number: 500,
                  suffix: "+",
                  label: "Weddings Planned",
                  icon: Heart,
                },
                {
                  number: 15,
                  suffix: "+",
                  label: "Years Experience",
                  icon: Calendar,
                },
                {
                  number: 98,
                  suffix: "%",
                  label: "Client Satisfaction",
                  icon: Star,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-gold/10 bg-ivory p-8 text-center shadow-sm transition-all hover:shadow-md hover:shadow-gold/10"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
                    <stat.icon className="h-7 w-7 text-gold" />
                  </div>
                  <span className="font-serif text-4xl font-bold text-charcoal">
                    <Counter end={stat.number} suffix={stat.suffix} />
                  </span>
                  <span className="mt-2 text-sm font-medium text-charcoal/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ───────────────────────────────────────────── */}
      <section
        id="services"
        ref={services.ref}
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #FFFFF0 0%, #F4E1E1 50%, #FFFFF0 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              What We Offer
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              Our <span className="text-gold">Services</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal/70">
              Comprehensive event planning services designed to make your
              special moments truly extraordinary.
            </p>
          </div>

          <div
            className={`mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
              services.inView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            {[
              {
                icon: ClipboardList,
                title: "Full Planning",
                desc: "End-to-end wedding planning from concept to execution. We handle every detail so you can enjoy the journey.",
              },
              {
                icon: Palette,
                title: "Partial Planning",
                desc: "Already started planning? We step in wherever you need us, filling gaps and adding professional expertise.",
              },
              {
                icon: Clock,
                title: "Day-of Coordination",
                desc: "Relax on your big day knowing our team is managing every timeline, vendor, and detail flawlessly.",
              },
              {
                icon: MapPin,
                title: "Destination Weddings",
                desc: "Dream of saying 'I do' somewhere extraordinary? We plan stunning celebrations in breathtaking locations worldwide.",
              },
              {
                icon: Building2,
                title: "Corporate Events",
                desc: "From galas to conferences, we bring the same elegance and precision to your professional celebrations.",
              },
              {
                icon: Flower2,
                title: "Floral Design",
                desc: "Bespoke floral arrangements that transform spaces and capture the essence of your event's aesthetic.",
              },
            ].map((service, i) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-gold/10 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <service.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {service.title}
                </h3>
                <p className="mt-3 text-charcoal/70 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ────────────────────────────────────────────── */}
      <section id="gallery" ref={gallery.ref} className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Our Portfolio
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              Event <span className="text-gold">Gallery</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal/70">
              A glimpse into the beautiful celebrations we have had the honor
              of creating.
            </p>
          </div>

          <div
            className={`mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
              gallery.inView ? "animate-scale-in" : "opacity-0"
            }`}
          >
            {[
              {
                label: "Garden Wedding",
                gradient: "from-sage/60 to-gold/40",
              },
              {
                label: "Beach Ceremony",
                gradient: "from-blush/60 to-sage/40",
              },
              {
                label: "Ballroom Reception",
                gradient: "from-gold/50 to-blush/40",
              },
              {
                label: "Rustic Celebration",
                gradient: "from-sage/50 to-ivory-dark/60",
              },
              {
                label: "Rooftop Gala",
                gradient: "from-charcoal/30 to-gold/40",
              },
              {
                label: "Vineyard Affair",
                gradient: "from-sage/40 to-gold/30",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-charcoal backdrop-blur-sm">
                      {item.label}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-white/80 drop-shadow-lg">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ────────────────────────────────────────────── */}
      <section
        id="process"
        ref={process.ref}
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #FFFFF0 0%, #B2BDA0 30%, #B2BDA0 70%, #FFFFF0 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              How It Works
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              Our <span className="text-gold">Process</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal/70">
              A seamless journey from your first inquiry to your
              picture-perfect celebration.
            </p>
          </div>

          <div
            className={`mt-16 ${
              process.inView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            {[
              {
                step: "01",
                icon: Phone,
                title: "Initial Consultation",
                desc: "We begin with a complimentary consultation to understand your vision, style, and budget. This is where your dream starts taking shape.",
              },
              {
                step: "02",
                icon: Palette,
                title: "Design & Planning",
                desc: "Our team creates a detailed plan with mood boards, vendor recommendations, timelines, and a comprehensive budget breakdown.",
              },
              {
                step: "03",
                icon: ClipboardList,
                title: "Coordination & Setup",
                desc: "We manage all vendor communications, logistics, and rehearsals. Every element is orchestrated to perfection.",
              },
              {
                step: "04",
                icon: PartyPopper,
                title: "Your Perfect Day",
                desc: "Sit back and enjoy every moment. Our team handles everything behind the scenes so your celebration is flawless.",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative flex gap-6 pb-12 last:pb-0">
                {i < 3 && (
                  <div className="absolute left-7 top-16 h-full w-px bg-gold/30" />
                )}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border-2 border-gold shadow-md shadow-gold/10">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <div className="pt-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold/70">
                    Step {item.step}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-charcoal/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section ───────────────────────────────────────── */}
      <section ref={testimonials.ref} className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Testimonials
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              What Our <span className="text-gold">Couples Say</span>
            </h2>
          </div>

          <div
            className={`mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
              testimonials.inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {[
              {
                name: "Sarah & Michael",
                event: "Garden Wedding",
                text: "EverAfter Events made our dream wedding a reality. Every detail was perfect, from the flowers to the timeline. We could not have done it without them.",
                rating: 5,
              },
              {
                name: "Jessica & David",
                event: "Destination Wedding",
                text: "Planning a destination wedding felt overwhelming until we found EverAfter. They handled everything with grace and professionalism. Truly magical.",
                rating: 5,
              },
              {
                name: "Emily & James",
                event: "Luxury Reception",
                text: "The attention to detail was extraordinary. Our guests are still talking about how beautiful everything was. Worth every penny.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gold/10 bg-ivory p-8 shadow-sm transition-all hover:shadow-md hover:shadow-gold/10"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-5 w-5 text-gold"
                      fill="#C9A96E"
                    />
                  ))}
                </div>
                <p className="mt-4 text-charcoal/70 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10">
                    <Users className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-charcoal">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-charcoal/60">
                      {testimonial.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ────────────────────────────────────────────── */}
      <section
        id="pricing"
        ref={pricing.ref}
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #FFFFF0 0%, #F4E1E1 50%, #FFFFF0 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Pricing
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              Investment <span className="text-gold">Packages</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal/70">
              Transparent pricing for every scope and style. Custom packages
              available upon request.
            </p>
          </div>

          <div
            className={`mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
              pricing.inView ? "animate-scale-in" : "opacity-0"
            }`}
          >
            {[
              {
                icon: Sparkles,
                name: "Essential",
                price: "$3,500",
                desc: "Day-of coordination and essential planning support",
                features: [
                  "Day-of coordination (10+ hours)",
                  "Vendor communication (final month)",
                  "Timeline creation & management",
                  "Rehearsal coordination",
                  "Emergency kit on event day",
                  "Setup & breakdown oversight",
                ],
              },
              {
                icon: Crown,
                name: "Premium",
                price: "$7,500",
                desc: "Comprehensive planning for a seamless experience",
                popular: true,
                features: [
                  "Everything in Essential",
                  "Full vendor sourcing & booking",
                  "Budget management & tracking",
                  "Design concept & mood boards",
                  "Monthly planning meetings",
                  "Guest management assistance",
                  "Accommodation coordination",
                ],
              },
              {
                icon: Gem,
                name: "Luxury",
                price: "$15,000+",
                desc: "White-glove service for the most discerning clients",
                features: [
                  "Everything in Premium",
                  "Unlimited planning sessions",
                  "Custom floral & decor design",
                  "Welcome party planning",
                  "Day-after brunch coordination",
                  "Honeymoon planning assistance",
                  "VIP concierge services",
                  "Multi-event weekend management",
                ],
              },
            ].map((tier, i) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all hover:shadow-xl ${
                  tier.popular
                    ? "border-gold bg-white shadow-lg shadow-gold/10 scale-[1.02]"
                    : "border-gold/10 bg-white/80"
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <tier.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal/60">{tier.desc}</p>
                <div className="mt-4 mb-6">
                  <span className="font-serif text-4xl font-bold text-gold">
                    {tier.price}
                  </span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark" />
                      <span className="text-sm text-charcoal/70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block rounded-full py-3 text-center font-semibold transition-all ${
                    tier.popular
                      ? "bg-gold text-white hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/25"
                      : "border-2 border-gold/30 text-charcoal hover:border-gold hover:bg-gold/5"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────────── */}
      <section ref={faqSection.ref} className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              FAQ
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              Common <span className="text-gold">Questions</span>
            </h2>
          </div>

          <div
            className={`mt-12 ${
              faqSection.inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <FAQItem
              question="How far in advance should we book?"
              answer="We recommend booking 12 to 18 months before your event for full planning services. For day-of coordination, 3 to 6 months is typically sufficient. However, we always try to accommodate shorter timelines when possible."
            />
            <FAQItem
              question="Do you travel for destination weddings?"
              answer="We plan destination weddings worldwide. Travel fees vary by location and are discussed during the initial consultation. We have established vendor relationships in many popular destinations."
            />
            <FAQItem
              question="Can we customize a package?"
              answer="Every couple is unique, and so is every celebration. Our packages serve as starting points, and we are happy to create a custom proposal tailored to your specific needs and budget."
            />
            <FAQItem
              question="What is included in the initial consultation?"
              answer="The initial consultation is complimentary and typically lasts 60 to 90 minutes. We discuss your vision, budget, guest count, venue preferences, and any special requirements. It is a chance for us to get to know each other."
            />
            <FAQItem
              question="How many events do you take on per weekend?"
              answer="To ensure each client receives our full attention, we limit ourselves to one event per weekend. This allows our team to be fully present and dedicated to making your day perfect."
            />
            <FAQItem
              question="What happens if there is an issue on the day of the event?"
              answer="Our experienced team is trained to handle any situation discreetly and efficiently. We always have backup plans, an emergency kit, and strong vendor relationships that allow us to resolve issues quickly without disrupting your celebration."
            />
          </div>
        </div>
      </section>

      {/* ── Contact Section ────────────────────────────────────────────── */}
      <section
        id="contact"
        ref={contact.ref}
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #FFFFF0 0%, #B2BDA0 40%, #B2BDA0 60%, #FFFFF0 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">
              Get In Touch
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold text-charcoal sm:text-5xl">
              Contact <span className="text-gold">Us</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal/70">
              Ready to start planning your dream event? Reach out and let us
              bring your vision to life.
            </p>
          </div>

          <div
            className={`mt-16 grid gap-12 lg:grid-cols-5 ${
              contact.inView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal">Phone</h3>
                  <p className="mt-1 text-charcoal/70">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal">Email</h3>
                  <p className="mt-1 text-charcoal/70">
                    hello@everafterevents.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <MapPinned className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal">
                    Studio
                  </h3>
                  <p className="mt-1 text-charcoal/70">
                    123 Bridal Lane, Suite 200
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <Clock className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal">Hours</h3>
                  <p className="mt-1 text-charcoal/70">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat: By Appointment
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gold/10 bg-white/90 p-8 shadow-lg backdrop-blur-sm"
              >
                {formSubmitted && (
                  <div className="mb-6 flex items-center gap-2 rounded-lg bg-sage/20 p-4 text-charcoal">
                    <CheckCircle className="h-5 w-5 text-sage-dark" />
                    <span className="font-medium">
                      Thank you! We will be in touch within 24 hours.
                    </span>
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eventType"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      value={formData.eventType}
                      onChange={(e) =>
                        setFormData({ ...formData, eventType: e.target.value })
                      }
                      className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-charcoal focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="destination">Destination Wedding</option>
                      <option value="social">Social Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-charcoal"
                  >
                    Tell Us About Your Vision
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors resize-none"
                    placeholder="Share details about your event, preferred date, guest count, and any special requests..."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-white transition-all hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/25 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-charcoal py-16 text-white/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-gold" fill="#C9A96E" />
                <span className="font-serif text-xl font-bold text-white">
                  EverAfter <span className="text-gold">Events</span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Creating unforgettable celebrations with elegance, precision,
                and heart since 2010.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold/30 hover:text-gold"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                Services
              </h4>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Full Planning",
                  "Partial Planning",
                  "Day-of Coordination",
                  "Destination Weddings",
                  "Corporate Events",
                  "Floral Design",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-sm text-white/60 transition-colors hover:text-gold"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                Contact
              </h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Phone className="h-4 w-4 text-gold" />
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Mail className="h-4 w-4 text-gold" />
                  hello@everafterevents.com
                </li>
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  123 Bridal Lane, Suite 200, New York, NY 10001
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} EverAfter Events. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
