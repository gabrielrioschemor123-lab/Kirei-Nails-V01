"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Sparkles, 
  Phone, 
  User, 
  Check, 
  Trash2, 
  Clock, 
  Lock, 
  ChevronRight, 
  Info,
  Sliders,
  CheckCircle,
  CheckCircle2,
  Menu,
  X,
  ShieldCheck,
  Droplet,
  Home,
  ExternalLink
} from "lucide-react";

// --- FLOATING PARTICLES SYSTEM ---
function FloatingParticles() {
  return null;
}

// --- TYPES & INTERFACES ---
interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  badge?: string;
  detail: string;
  image: string;
  bullets?: string[];
}

interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  zone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  createdAt: string;
  modalidad?: "Local" | "Domicilio";
  barrio?: string;
}

// --- CONSTANTS ---
const SERVICES: Service[] = [
  {
    id: "esculpidas",
    name: "Sistema Soft Gel",
    description: "Largo perfecto al instante. Extensiones súper naturales, livianas y cómodas desde el primer día.",
    price: "$22.000",
    duration: "120 min",
    category: "Estructuras",
    badge: "TENDENCIA",
    detail: "Cuidado absoluto de la uña natural con nivelación exacta.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    bullets: [
      "Uñas ligeras y a medida",
      "Aplicación rápida y prolija",
      "Acabado ultra natural"
    ]
  },
  {
    id: "kapping",
    name: "Kapping Protector",
    description: "Fuerza extrema para tu uña natural. Olvidate de que se te quiebren o escamen.",
    price: "$16.000",
    duration: "90 min",
    category: "Protección",
    badge: "Recomendado",
    detail: "Incluye manicuría combinada y nutrición de cutículas.",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    bullets: [
      "Máxima resistencia diaria",
      "Permite que tu uña crezca sana",
      "Nivelación y estructura perfecta"
    ]
  },
  {
    id: "semipermanente",
    name: "Esmaltado Semipermanente",
    description: "Color y brillo impecables por semanas. Tus manos siempre listas y prolijas.",
    price: "$12.000",
    duration: "60 min",
    category: "Esmaltado",
    badge: "Esencial",
    detail: "Gama completa de tonos clásicos y de vanguardia.",
    image: "https://images.unsplash.com/photo-1595868840242-70b923985114?auto=format&fit=crop&q=80&w=800",
    bullets: [
      "Esmaltado que no se salta",
      "Brillo espejo de larga duración",
      "Cuidado absoluto de tu uña"
    ]
  }
];

const BARRIOS = [
  "Centro",
  "Villa Alonso",
  "Butaló",
  "Fitte",
  "Toay",
  "Santa María",
  "Plan 5000",
  "Villa Santillán",
  "Escalante",
  "Zona Norte",
  "Los Hornos",
  "Las Camelias",
  "Villa Tomás Mason",
  "Aeropuerto"
];

const TIME_SLOTS = [
  "09:00",
  "10:30",
  "12:00",
  "14:30",
  "16:00",
  "17:30"
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: "demo-1",
    clientName: "Valentina Rossini",
    phone: "2954123456",
    serviceId: "esculpidas",
    serviceName: "Uñas Esculpidas",
    zone: "Callaqueo 1019",
    date: getNextDateString(1),
    time: "09:00",
    createdAt: new Date().toISOString(),
    modalidad: "Local",
    barrio: "Callaqueo 1019"
  },
  {
    id: "demo-2",
    clientName: "Camila Varela",
    phone: "2954987654",
    serviceId: "semipermanente",
    serviceName: "Esmaltado Semipermanente",
    zone: "Villa Alonso",
    date: getNextDateString(1),
    time: "14:30",
    createdAt: new Date().toISOString(),
    modalidad: "Domicilio",
    barrio: "Villa Alonso"
  },
  {
    id: "demo-3",
    clientName: "María Emilia Gatica",
    phone: "2954112233",
    serviceId: "kapping",
    serviceName: "Kapping Gel & Acrílico",
    zone: "Butaló",
    date: getNextDateString(2),
    time: "10:30",
    createdAt: new Date().toISOString(),
    modalidad: "Domicilio",
    barrio: "Butaló"
  }
];

function getNextDateString(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
}

const TESTIMONIALS = [
  {
    quote: "Zoe es la mejor manicura de Santa Rosa. Mis esculpidas duran intactas más de 4 semanas y el trato es súper exclusivo.",
    author: "Camila G.",
    location: "Centro, Santa Rosa",
    badge: "Cliente Frecuente"
  },
  {
    quote: "El servicio de Kapping Gel me cambió las uñas por completo. Súper prolija, meticulosa con las cutículas y las perlas de decoración son hermosas.",
    author: "Morena S.",
    location: "Villa Alonso, Santa Rosa",
    badge: "Kapping Lover"
  },
  {
    quote: "Me encanta el espacio boutique. Súper higiénico, el café es riquísimo y los diseños de Pinterest los recrea a la perfección. 100% recomendado.",
    author: "Martina P.",
    location: "Toay, La Pampa",
    badge: "Cliente Premium"
  }
];

export default function App() {
  // --- STATE ---
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [modalidad, setModalidad] = useState<"Local" | "Domicilio">("Local");
  const [barrioInput, setBarrioInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bookingDate, setBookingDate] = useState(getNextDateString(1));
  const [bookingTime, setBookingTime] = useState("");

  // Admin section states
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Notifications
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info"; url?: string; buttonText?: string } | null>(null);

  // Testimonials Carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Load appointments from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kirei_appointments");
      if (stored) {
        try {
          setAppointments(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing stored appointments", e);
          setAppointments(DEFAULT_APPOINTMENTS);
        }
      } else {
        // Pre-seed default appointments
        localStorage.setItem("kirei_appointments", JSON.stringify(DEFAULT_APPOINTMENTS));
        setAppointments(DEFAULT_APPOINTMENTS);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save appointments to localStorage
  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    if (typeof window !== "undefined") {
      localStorage.setItem("kirei_appointments", JSON.stringify(newAppointments));
    }
  };

  // Helper to format dates nicely
  const formatReadableDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return dateObj.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  };

  // Trigger brief alert banner
  const triggerAlert = (
    message: string, 
    type: "success" | "error" | "info" = "success",
    url?: string,
    buttonText?: string
  ) => {
    setAlert({ message, type, url, buttonText });
    setTimeout(() => {
      setAlert(null);
    }, type === "success" && url ? 12000 : 5500);
  };

  // Submit appointment booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !phone.trim() || !bookingDate || !bookingTime) {
      triggerAlert("Por favor, completa todos los campos requeridos.", "error");
      return;
    }

    // Verify slot collision
    const isSlotTaken = appointments.some(
      (app) => app.date === bookingDate && app.time === bookingTime
    );

    if (isSlotTaken) {
      triggerAlert("El horario seleccionado ya no se encuentra disponible. Por favor, selecciona otro.", "error");
      return;
    }

    const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

    if (modalidad === "Domicilio" && !barrioInput.trim()) {
      triggerAlert("Por favor, ingresá tu barrio para la atención a domicilio.", "error");
      return;
    }

    const newAppointment: Appointment = {
      id: "app-" + Date.now(),
      clientName: clientName.trim(),
      phone: phone.trim(),
      serviceId: selectedServiceId,
      serviceName: selectedService.name,
      zone: modalidad === "Local" ? "Callaqueo 1019" : barrioInput.trim(),
      date: bookingDate,
      time: bookingTime,
      createdAt: new Date().toISOString(),
      modalidad: modalidad,
      barrio: modalidad === "Local" ? "Callaqueo 1019" : barrioInput.trim()
    };

    const updated = [newAppointment, ...appointments];
    saveAppointments(updated);

    // Generate WhatsApp confirmation message for Zoe (2954-311579)
    const msg = `Hola Zoe! Quiero confirmar mi turno:\n💅 Tratamiento: ${selectedService.name}\n🗓️ Fecha: ${formatReadableDate(bookingDate)}\n⏰ Hora: ${bookingTime} hs\n👤 Nombre: ${clientName.trim()}\n📱 Celular: ${phone.trim()}\n🏡 Modalidad: ${modalidad}${modalidad === "Domicilio" ? ` (Barrio: ${barrioInput.trim()})` : ""}`;
    const whatsappUrl = `https://wa.me/5492954311579?text=${encodeURIComponent(msg)}`;

    try {
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.log("Popup blocked:", err);
    }

    // Clear form except name/phone for easier subsequent booking if needed
    setBookingTime("");
    if (modalidad === "Domicilio") {
      setBarrioInput("");
    }
    
    triggerAlert(
      `¡Reserva agendada en el sistema! Hacé clic abajo para enviar la confirmación por WhatsApp a Zoe (2954-311579).`, 
      "success",
      whatsappUrl,
      "Enviar por WhatsApp 💬"
    );
    
    // Auto-scroll to services or keep focus
    scrollToSection("hero");
  };

  // Admin delete appointment
  const handleDeleteAppointment = (id: string) => {
    const filtered = appointments.filter((app) => app.id !== id);
    saveAppointments(filtered);
    triggerAlert("El turno ha sido completado y removido de la agenda activa.", "info");
  };

  // Admin authenticate
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "Zai2026") {
      setIsAdminAuthenticated(true);
      triggerAlert("Autenticación exitosa. Bienvenido al panel del estudio.", "success");
    } else {
      triggerAlert("Contraseña incorrecta. Intente nuevamente.", "error");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminPassword("");
    triggerAlert("Sesión de administración cerrada correctamente.", "info");
  };

  const handleResetDemoData = () => {
    saveAppointments(DEFAULT_APPOINTMENTS);
    triggerAlert("Se han restaurado los turnos de prueba por defecto.", "info");
  };

  const handleQuickSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection("turnero");
    triggerAlert(`Seleccionaste ${SERVICES.find(s => s.id === serviceId)?.name}. Elige fecha y hora para agendar.`, "info");
  };

  // Scroll helper for smooth navigation experience
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen marble-shimmer-bg text-stone-800 flex flex-col font-sans selection:bg-[#F3E8FF] selection:text-[#4B2A6B] overflow-x-hidden">
      
      {/* Floating Sparkles & Light Particles */}
      <FloatingParticles />

      {/* Top soft aesthetic framing bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E05A92] via-[#7C549F] to-[#5C3A85] z-50 fixed top-0" />

      {/* --- NOTIFICATION TOAST --- */}
      {alert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 rounded-xl shadow-xl border border-[#FCE7F3] bg-white flex flex-col gap-3 animate-fade-in transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              {alert.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-[#E05A92]" />
              ) : alert.type === "error" ? (
                <Info className="w-5 h-5 text-rose-500" />
              ) : (
                <Info className="w-5 h-5 text-[#5C3A85]" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#4B2A6B]">Notificación de Kirei Nails</p>
              <p className="text-xs text-stone-900 mt-0.5 font-medium leading-relaxed">{alert.message}</p>
            </div>
          </div>
          {alert.url && (
            <div className="pt-1 flex justify-end">
              <a
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#5C3A85] to-[#E05A92] text-white font-bold text-[10px] px-3.5 py-2 rounded-lg uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all text-center flex items-center gap-1.5 shadow-[0_3px_10px_rgba(224,90,146,0.25)]"
              >
                <span>{alert.buttonText || "Confirmar por WhatsApp"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* --- FLOATING WHATSAPP CTA --- */}
      <a 
        href="https://wa.me/5492954311579?text=Hola%20Zoe!%20Quiero%20hacer%20una%20consulta%20por%20un%20turno..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 whatsapp-tactile-pearl p-[1.5px] rounded-full hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group overflow-hidden"
      >
        <div className="px-5 py-3 rounded-full flex items-center gap-2.5 relative">
          {/* Internal polish light reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* A soft amethyst-glowing message bubble icon representing WhatsApp */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#5C3A85] to-[#7C549F] flex items-center justify-center relative shadow-[0_2px_6px_rgba(92,58,133,0.3)] shrink-0">
            <Phone className="w-2.5 h-2.5 text-white" />
          </div>
          
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#5C3A85] group-hover:text-[#4B2A6B] transition-colors">
            WhatsApp de Zoe
          </span>
          
          <Sparkles className="w-3.5 h-3.5 text-[#E05A92] group-hover:rotate-12 transition-transform duration-300 shrink-0" />
        </div>
      </a>

      {/* --- HEADER / NAVIGATION --- */}
      <header className="sticky top-0 z-30 bg-[#FAF6F9] border-b border-[#FCE7F3] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div onClick={() => scrollToSection("hero")} className="flex items-center gap-3 cursor-pointer group select-none">
            {/* Violet logo container with refined coordinated violet-pink border accent */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[1.5px] bg-gradient-to-br from-[#E05A92] via-[#FAF1FA] to-[#7C549F] shadow-[0_4px_12px_rgba(92,58,133,0.18)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full rounded-full bg-[#5C3A85] flex items-center justify-center text-white">
                <span className="font-serif font-black text-lg sm:text-xl text-[#FCE7F3]">K</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-wide font-extrabold text-[#4B2A6B] group-hover:text-[#5C3A85] leading-none transition-colors">
                Kirei Nails
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#5C3A85] font-extrabold block mt-0.5 sm:mt-1">
                BY ZOE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] font-bold text-[#5C3A85]">
            <button 
              onClick={() => scrollToSection("servicios")} 
              className="px-4 py-2.5 rounded-full border border-[#FCE7F3] bg-white text-[#5C3A85] hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_5px_12px_rgba(92,58,133,0.1)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[inset_0_2px_5px_rgba(92,58,133,0.1)] transition-all duration-300 cursor-pointer font-extrabold"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection("galeria")} 
              className="px-4 py-2.5 rounded-full border border-[#FCE7F3] bg-white text-[#5C3A85] hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_5px_12px_rgba(92,58,133,0.1)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[inset_0_2px_5px_rgba(92,58,133,0.1)] transition-all duration-300 cursor-pointer font-extrabold"
            >
              Galería
            </button>
            <button 
              onClick={() => scrollToSection("horarios")} 
              className="px-4 py-2.5 rounded-full border border-[#FCE7F3] bg-white text-[#5C3A85] hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_5px_12px_rgba(92,58,133,0.1)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[inset_0_2px_5px_rgba(92,58,133,0.1)] transition-all duration-300 cursor-pointer font-extrabold"
            >
              Horarios
            </button>
            <button 
              onClick={() => scrollToSection("turnero")} 
              className="px-4 py-2.5 rounded-full border border-[#FCE7F3] bg-white text-[#5C3A85] hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),_0_5px_12px_rgba(92,58,133,0.1)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[inset_0_2px_5px_rgba(92,58,133,0.1)] transition-all duration-300 cursor-pointer font-extrabold"
            >
              Turnos
            </button>
          </nav>

          {/* Action Call Button on the right */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection("turnero")} 
              className="tactile-pill-amethyst text-white px-5.5 py-2.5 rounded-full cursor-pointer flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest transition-all duration-300"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[#FFF5F9]" />
              <span>Reservar turno</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-[#5C3A85] hover:text-[#E05A92] focus:outline-none rounded-2xl bg-white border border-[#FCE7F3] shadow-[inset_0_1px_2px_rgba(255,255,255,1),_0_3px_8px_rgba(92,58,133,0.06)] active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6F9] border-b border-[#FCE7F3] px-4 py-6 space-y-3.5 flex flex-col text-xs uppercase tracking-widest font-bold text-[#5C3A85]">
            <button 
              onClick={() => { scrollToSection("servicios"); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-3 bg-white border border-[#FCE7F3] rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] active:scale-[0.98] transition-all hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40"
            >
              Servicios
            </button>
            <button 
              onClick={() => { scrollToSection("galeria"); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-3 bg-white border border-[#FCE7F3] rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] active:scale-[0.98] transition-all hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40"
            >
              Galería
            </button>
            <button 
              onClick={() => { scrollToSection("horarios"); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-3 bg-white border border-[#FCE7F3] rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] active:scale-[0.98] transition-all hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40"
            >
              Horarios
            </button>
            <button 
              onClick={() => { scrollToSection("turnero"); setMobileMenuOpen(false); }} 
              className="text-left px-4 py-3 bg-white border border-[#FCE7F3] rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,1),_0_2px_5px_rgba(92,58,133,0.04)] active:scale-[0.98] transition-all hover:text-[#4B2A6B] hover:bg-[#FDF2F7] hover:border-[#E05A92]/40"
            >
              Turnos
            </button>
            <button 
              onClick={() => { scrollToSection("turnero"); setMobileMenuOpen(false); }} 
              className="w-full py-3.5 bg-gradient-to-r from-[#5C3A85] to-[#E05A92] text-center text-white rounded-2xl mt-2 flex items-center justify-center gap-2 font-extrabold shadow-[0_6px_15px_rgba(224,90,146,0.22)] active:scale-[0.98] transition-all"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Reservar Turno</span>
            </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative pt-6 pb-12 lg:pt-8 lg:pb-16 overflow-hidden border-b border-[#F3E8FF]">
        
        {/* Aesthetic background soft shapes for beautiful layout breathing */}
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-[#FDF2F7] rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 left-[-5%] w-80 h-80 bg-[#F5EBFA] rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 lg:space-y-6 text-center lg:text-left">
              
              {/* Pill Badge */}
              <div id="hero-badge" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF5F9] to-[#FAF1FA] border border-[#5C3A85]/35 px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(92,58,133,0.06)]">
                <Sparkles className="w-3.5 h-3.5 text-[#E05A92]" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5C3A85]">
                  Estudio de Manicuría Boutique
                </span>
              </div>

              {/* Heading with fucsia pink to deep amethyst violet gradient */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-bold text-stone-900">
                <span className="bg-gradient-to-r from-[#C22867] to-[#4B2A6B] bg-clip-text text-transparent">
                  La excelencia y el cuidado <br className="hidden sm:inline" />que tus manos merecen en
                </span>{" "}
                <span className="text-[#5C3A85] italic font-light">Santa Rosa</span>.
              </h1>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollToSection("turnero")}
                  className="w-full sm:w-auto tactile-pill-fucsia-violet text-white text-xs uppercase tracking-widest font-bold px-8 py-4.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                >
                  <span>Reservar Turno Online</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="w-full sm:w-auto tactile-pill-lightfucsia text-[#5C3A85] text-xs uppercase tracking-widest font-bold px-8 py-4.5 rounded-full transition-all text-center cursor-pointer transition-all duration-300"
                >
                  Ver Servicios Premium
                </button>
              </div>

              {/* Quick Pillars Trust Section */}
              <div className="pt-6 mt-6 border-t border-[#F3E8FF] max-w-xl mx-auto lg:mx-0 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="space-y-1">
                  <span className="block font-serif text-base sm:text-lg font-semibold text-[#4B2A6B]">Salud Integral</span>
                  <span className="text-[10px] text-[#E05A92] uppercase tracking-wider font-semibold">Cuidado de Uñas</span>
                </div>
                <div className="space-y-1 border-x border-[#F3E8FF] px-2">
                  <span className="block font-serif text-base sm:text-lg font-semibold text-[#4B2A6B]">Material Pro</span>
                  <span className="text-[10px] text-[#E05A92] uppercase tracking-wider font-semibold">Libre de MMA</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-serif text-base sm:text-lg font-semibold text-[#4B2A6B]">Esterilización</span>
                  <span className="text-[10px] text-[#E05A92] uppercase tracking-wider font-semibold">Máxima Higiene</span>
                </div>
              </div>

            </div>

            {/* Right Image Column representing macro closeup with gold jewelry frames */}
            <div className="lg:col-span-5 w-full flex justify-center relative">
              {/* Satin reflection blur under image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#E05A92]/10 via-[#7C549F]/5 to-transparent blur-2xl rounded-[40px] pointer-events-none" />
              
              {/* Violet-pink jewelry framed container */}
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-[#5C3A85] via-[#E05A92] to-[#7C549F] shadow-[0_15px_40px_rgba(92,58,133,0.22)] group">
                <div className="w-full h-full rounded-[22px] overflow-hidden relative">
                  <img 
                    src="https://i.postimg.cc/VNL6tHBd/Whats-App-Image-2026-06-12-at-01-08-22-(1).jpg" 
                    alt="Kirei Nails by Zoe - Macro detail with pearl work"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221029]/55 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Subtle lace mesh overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES CATALOG SECTION --- */}
      <section id="servicios" className="py-20 lg:py-28 bg-[#FAF6F9]/50 border-b border-[#F3E8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#E05A92] block">
              Menú de Experiencias
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#4B2A6B] tracking-tight font-medium">
              Especialistas en Estructuras & Salud
            </h2>
            <div className="w-12 h-0.5 bg-[#E05A92]/40 mx-auto rounded-full" />

          </div>

          {/* Grid of Clean Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                className="bg-white border border-[#F3E8FF] rounded-3xl flex flex-col justify-between shadow-[0_12px_40px_-8px_rgba(92,58,133,0.08)] hover:shadow-[0_24px_55px_-10px_rgba(92,58,133,0.16)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
              >
                {/* Header image on top of card - significantly enlarged to dominate top portion */}
                <div className="w-full h-64 sm:h-72 relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {service.badge && (
                    <span className="absolute top-4 right-4 text-[9px] uppercase tracking-wider font-bold bg-[#FAF6F9]/95 text-[#5C3A85] px-2.5 py-1.5 rounded-full border border-[#FCE7F3] shadow-sm">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    {/* Category & Custom Icon in compact closer row */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-stone-50">
                      <span className={`text-[10px] font-mono tracking-widest uppercase block ${
                        service.id === "esculpidas" ? "text-[#8B5CF6]" : "text-[#E05A92]"
                      }`}>
                        {service.category}
                      </span>
                      
                      {/* Refined Custom Icons per requirement */}
                      {service.id === "esculpidas" && (
                        <div className="flex items-center gap-1.5 py-1 px-2.5 bg-[#FAF1FA] rounded-full border border-[#E05A92]/20 shadow-[inset_0_1px_2px_rgba(224,90,146,0.05)]">
                          <div className="relative w-6 h-4.5 flex items-center justify-center shrink-0">
                            <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-[#FAF1FA] to-[#df9baf] border border-[#E05A92]/30" />
                            <div className="absolute bottom-0.5 right-0.5 w-2 rounded-full bg-gradient-to-br from-white via-[#FAF6F9] to-[#c43a75] border border-[#E05A92]/30" />
                            <div className="absolute bottom-0 left-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white via-stone-50 to-[#9c1f51] border border-[#E05A92]/30 animate-pulse" />
                          </div>
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#E05A92]">Perlas de autor</span>
                        </div>
                      )}

                      {service.id === "kapping" && (
                        <div className="flex items-center gap-1 py-1 px-2.5 bg-[#F5EBFA] rounded-full border border-[#5C3A85]/20 shadow-[inset_0_1px_2px_rgba(92,58,133,0.05)]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#5C3A85]" />
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#5C3A85]">Kapping Bond</span>
                        </div>
                      )}

                      {service.id === "semipermanente" && (
                        <div className="flex items-center gap-1 py-1 px-2.5 bg-[#FFF5F9] rounded-full border border-[#E05A92]/20 shadow-[inset_0_1px_2px_rgba(224,90,146,0.05)]">
                          <Droplet className="w-3 h-3 text-[#E05A92] fill-[#E05A92]/10" />
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#E05A92]">Gel UV</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl font-medium text-[#4B2A6B] text-center py-2">
                      {service.name}
                    </h3>

                  </div>

                  <div>
                    {/* Footer specs / price / CTA */}
                    <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-stone-700 uppercase tracking-widest font-bold block">Precio</span>
                        <span className="font-serif text-lg font-semibold text-[#4B2A6B]">{service.price}</span>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-[10px] text-stone-700 uppercase tracking-widest font-bold block">Duración</span>
                        <span className="text-xs text-stone-800 font-medium font-mono">{service.duration}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickSelectService(service.id)}
                      className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#5C3A85] to-[#E05A92] hover:from-[#4B2A6B] hover:to-[#C0497E] active:scale-[0.98] text-white rounded-xl text-[10px] uppercase tracking-widest font-extrabold shadow-[0_6px_15px_rgba(224,90,146,0.22)] hover:shadow-[0_10px_24px_rgba(224,90,146,0.38)] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1 border border-white/10"
                    >
                      <span>Agendar Turno</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>



        </div>
      </section>

      {/* --- GALERÍA DE DISEÑOS SECTION (INCORPORATING SPECIFIC REQUIREMENT) --- */}
      <section id="galeria" className="py-20 lg:py-28 bg-white border-b border-[#F3E8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#E05A92] block">
              Arte en tus Manos
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#4B2A6B] tracking-tight font-bold">
              Galería de diseños
            </h1>
            <div className="w-12 h-0.5 bg-[#E05A92]/40 mx-auto rounded-full" />
            <p className="text-stone-800 text-sm font-medium leading-relaxed">
              Cada set es único. Mirá los trabajos reales y encontrá tu próximo diseño.
            </p>
          </div>

          {/* Prominent block dedicated to the 'apartado de diseños' with soft pink/violet gradient and ornate borders */}
          <div className="relative p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#FFF5F9] via-[#FAF1FA] to-[#F3E8FF] rounded-3xl border border-[#FCE7F3] shadow-[0_22px_50px_rgba(92,58,133,0.11)] hover:shadow-[0_28px_60px_rgba(92,58,133,0.16)] transition-all duration-500 overflow-hidden">
            
            {/* Background elements for depth */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#FCE7F3]/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#F3E8FF]/40 rounded-full blur-2xl pointer-events-none" />

            {/* Inner ornate border overlay to give a high-end luxury feel */}
            <div className="absolute inset-4 border border-[#E05A92]/10 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 border border-[#5C3A85]/5 rounded-2xl pointer-events-none" />

            {/* Grid layout of 4 photos, beautifully balanced (Tall - Stacked - Tall) */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              
              {/* Column 1: Tall Single Image (Pink/Gold nails) */}
              <div className="lg:col-span-1 h-[480px] group relative p-1 rounded-3xl bg-gradient-to-tr from-[#E05A92] to-[#5C3A85] shadow-[0_8px_20px_rgba(92,58,133,0.12)] hover:shadow-[0_16px_36px_rgba(92,58,133,0.22)] hover:-translate-y-1 transition-all duration-500">
                <div className="bg-white p-1 rounded-xl h-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800" 
                    alt="Esculpidas en oro y rosa" 
                    className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white border border-[#E05A92]/30 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 shadow-md">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#E05A92] block">Estructura Premium</span>
                    <span className="text-xs font-serif font-semibold text-[#4B2A6B]">Esculpidas Acrílicas en Oro</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Stacked Images (Top: Clear-tipped metallic, Bottom: Sleek detailed) */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Clear-tipped metallic */}
                <div className="h-[228px] group relative p-1 rounded-3xl bg-gradient-to-tr from-[#E05A92] to-[#5C3A85] shadow-[0_8px_20px_rgba(92,58,133,0.12)] hover:shadow-[0_16px_36px_rgba(92,58,133,0.22)] hover:-translate-y-1 transition-all duration-500">
                  <div className="bg-white p-1 rounded-xl h-full overflow-hidden">
                    <img 
                      src="https://i.postimg.cc/90tSh1RZ/9e546fdc-2360-436d-a1f5-e0be62d49ef5.jpg" 
                      alt="Chrome Minimalist" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white border border-[#E05A92]/30 p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-350 shadow-md">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-[#E05A92] block">Chrome Minimalist</span>
                      <span className="text-[11px] font-serif font-semibold text-[#4B2A6B]">Efecto Espejo & Puntas Crystal</span>
                    </div>
                  </div>
                </div>

                {/* Partial bottom view */}
                <div className="h-[228px] group relative p-1 rounded-3xl bg-gradient-to-tr from-[#E05A92] to-[#5C3A85] shadow-[0_8px_20px_rgba(92,58,133,0.12)] hover:shadow-[0_16px_36px_rgba(92,58,133,0.22)] hover:-translate-y-1 transition-all duration-500">
                  <div className="bg-white p-1 rounded-xl h-full overflow-hidden">
                    <img 
                      src="https://i.postimg.cc/sg0LsMXY/ec73e20c-c24a-4b4c-ba2f-e97310d47c97.jpg" 
                      alt="Kapping Gel" 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white border border-[#E05A92]/30 p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-350 shadow-md">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-[#E05A92] block">Kapping Gel</span>
                      <span className="text-[11px] font-serif font-semibold text-[#4B2A6B]">Nivelación Perfecta Coquette</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Column 3: Tall Single Image (Gold starry details) */}
              <div className="lg:col-span-1 h-[480px] group relative p-1 rounded-3xl bg-gradient-to-tr from-[#E05A92] to-[#5C3A85] shadow-[0_8px_20px_rgba(92,58,133,0.12)] hover:shadow-[0_16px_36px_rgba(92,58,133,0.22)] hover:-translate-y-1 transition-all duration-500">
                <div className="bg-white p-1 rounded-xl h-full overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/SKBtYHcQ/Whats-App-Image-2026-06-12-at-01-08-21-(1).jpg" 
                    alt="Nude Celestial" 
                    className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white border border-[#E05A92]/30 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 shadow-md">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#E05A92] block">Nude Celestial</span>
                    <span className="text-xs font-serif font-semibold text-[#4B2A6B]">Esmaltado con Estrellas en Oro</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Elegant CTA underneath gallery */}
          <div className="mt-12 text-center">
            <p className="text-[#5C3A85] text-sm font-semibold italic">
              "El diseño es infinito. Traé tu idea de Pinterest y la convertimos en realidad en tus uñas."
            </p>
          </div>

        </div>
      </section>



      {/* --- TURNERO SECTION (ADVANCED BOOKING ENGINE) --- */}
      <section id="turnero" className="py-20 lg:py-28 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Turnero Section Header */}
        <div id="turnero-section-header" className="text-center mb-12 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#E05A92] block">
            Reserva Inmediata
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4B2A6B] tracking-tight font-medium">
            Turnero Online Automatizado
          </h2>
          <div className="w-12 h-0.5 bg-[#E05A92]/40 mx-auto rounded-full" />
          <p className="text-stone-800 text-sm font-medium max-w-md mx-auto leading-relaxed">
            Elegí tu tratamiento, zona de residencia en Santa Rosa/Toay y el horario que mejor se adapte a tu agenda. La confirmación es instantánea.
          </p>
        </div>

        {/* Turnero Box Container */}
        <div className="bg-white border-2 border-[#FCE7F3] rounded-3xl shadow-[0_32px_75px_-15px_rgba(92,58,133,0.18)] hover:shadow-[0_40px_90px_-10px_rgba(92,58,133,0.25)] transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">
          
          {/* Left Column: Info and Branding */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#FFF5F9] via-[#FAF1FA] to-[#FAF6F9] p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#FCE7F3] relative overflow-hidden">
            {/* Elegant decorative background shapes */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FCE7F3] rounded-full blur-2xl opacity-40 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#F5EBFA] rounded-full blur-2xl opacity-50 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#FCE7F3] shadow-[0_4px_12px_rgba(92,58,133,0.06)] flex items-center justify-center text-[#5C3A85]">
                <CalendarIcon className="w-6 h-6 text-[#E05A92]" />
              </div>
              
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#E05A92] block">Nueva Solicitud</span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#4B2A6B] mt-1.5 leading-tight">Reserva Tu Cita</h3>
                <div className="w-8 h-0.5 bg-[#E05A92]/40 my-3 rounded-full" />
              </div>
              
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E05A92]" />
                  <span className="text-xs text-[#5C3A85] font-semibold">Santa Rosa • Estudio Privado</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E05A92]" />
                  <span className="text-xs text-[#5C3A85] font-semibold">Atención 1 a 1 Exclusiva</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E05A92]" />
                  <span className="text-xs text-[#5C3A85] font-semibold">Confirmación Directa</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 pt-8 lg:pt-0">
              <p className="text-[10px] text-stone-850 font-semibold leading-relaxed">
                Cada detalle está cuidado bajo un estándar absoluto de pulcritud y salud para tus manos.
              </p>
            </div>
          </div>

          {/* Right Column: Ultra-Compact Form */}
          <form onSubmit={handleBookingSubmit} className="lg:col-span-8 p-6 sm:p-8 space-y-4 flex flex-col justify-between bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                  Nombre Completo <span className="text-rose-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C3A85]/70" />
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Sofía Fernández"
                    required
                    className="w-full bg-[#FAF6F9] border border-[#FCE7F3] hover:border-[#E05A92]/40 rounded-xl py-2 pl-10 pr-3.5 text-stone-950 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C3A85]/15 focus:border-[#5C3A85] shadow-sm transition-all h-10"
                  />
                </div>
              </div>

              {/* Phone WhatsApp */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                  WhatsApp / Teléfono <span className="text-rose-600 font-bold">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C3A85]/70" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 2954123456"
                    required
                    className="w-full bg-[#FAF6F9] border border-[#FCE7F3] hover:border-[#E05A92]/40 rounded-xl py-2 pl-10 pr-3.5 text-stone-950 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C3A85]/15 focus:border-[#5C3A85] shadow-sm transition-all h-10"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                  Elegir Tratamiento <span className="text-rose-600 font-bold">*</span>
                </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => {
                      setSelectedServiceId(e.target.value);
                      setBookingTime(""); // reset slot selection
                    }}
                    className="w-full bg-[#FAF6F9] border border-[#FCE7F3] hover:border-[#E05A92]/40 rounded-xl py-2 px-3.5 text-stone-950 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C3A85]/15 focus:border-[#5C3A85] shadow-sm transition-all cursor-pointer h-10 appearance-none"
                  >
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} — {service.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modalidad de Atención */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                  Modalidad de Atención <span className="text-rose-600 font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 h-10">
                  <button
                    type="button"
                    onClick={() => {
                      setModalidad("Local");
                      setBarrioInput("");
                    }}
                    className={`rounded-xl text-xs font-semibold tracking-wide transition-all border text-center flex items-center justify-center gap-1.5 cursor-pointer h-full ${
                      modalidad === "Local"
                        ? "bg-gradient-to-tr from-[#5C3A85] to-[#4B2A6B] text-white border-transparent shadow-[0_4px_12px_rgba(92,58,133,0.22)] scale-[1.01]"
                        : "bg-stone-50 text-[#5C3A85] border-[#FCE7F3] hover:border-[#E05A92] hover:bg-[#FDF2F7] hover:shadow-[0_2px_8px_rgba(224,90,146,0.08)]"
                    }`}
                  >
                    <Home className="w-3.5 h-3.5 shrink-0" />
                    <span>En local</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalidad("Domicilio")}
                    className={`rounded-xl text-xs font-semibold tracking-wide transition-all border text-center flex items-center justify-center gap-1.5 cursor-pointer h-full ${
                      modalidad === "Domicilio"
                        ? "bg-gradient-to-tr from-[#5C3A85] to-[#4B2A6B] text-white border-transparent shadow-[0_4px_12px_rgba(92,58,133,0.22)] scale-[1.01]"
                        : "bg-stone-50 text-[#5C3A85] border-[#FCE7F3] hover:border-[#E05A92] hover:bg-[#FDF2F7] hover:shadow-[0_2px_8px_rgba(224,90,146,0.08)]"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>A domicilio</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Modalidad Location / Barrio autocomplete */}
              <div className="md:col-span-2">
                {modalidad === "Local" ? (
                  <div className="p-3.5 rounded-xl border-2 border-[#FCE7F3] bg-[#FAF6F9] flex items-center gap-3 animate-fade-in shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#E05A92] shrink-0 border border-[#FCE7F3]">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-extrabold text-[#5C3A85] uppercase tracking-wider leading-none">Dirección de nuestro Estudio</span>
                      <p className="text-[11px] text-stone-900 mt-1 leading-tight font-semibold">
                        Te esperamos en: <span className="text-[#5C3A85] font-extrabold">Callaqueo 1019, Santa Rosa</span>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 relative animate-fade-in">
                    <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                      Barrio para la Atención <span className="text-rose-600 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C3A85]/70 pointer-events-none" />
                      <input
                        type="text"
                        value={barrioInput}
                        onChange={(e) => {
                          setBarrioInput(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => {
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        placeholder="Escribí tu barrio de Santa Rosa (ej. Centro, Villa Alonso, Toay, etc.)"
                        required={modalidad === "Domicilio"}
                        className="w-full bg-[#FAF6F9] border border-[#FCE7F3] rounded-xl py-2 pl-10 pr-3.5 text-stone-950 font-medium text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C3A85] focus:border-[#5C3A85] transition-all h-10 shadow-sm"
                      />
                      
                      {/* Autocomplete Suggestions Dropdown */}
                      {showSuggestions && (
                        <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-[#FCE7F3] rounded-xl shadow-lg z-50 divide-y divide-stone-100 animate-fade-in">
                          {BARRIOS.filter(b => b.toLowerCase().includes(barrioInput.toLowerCase())).length > 0 ? (
                            BARRIOS.filter(b => b.toLowerCase().includes(barrioInput.toLowerCase())).map((barrio) => (
                              <div
                                key={barrio}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setBarrioInput(barrio);
                                  setShowSuggestions(false);
                                }}
                                className="px-3 py-2 text-xs text-stone-900 hover:bg-[#FDF2F7] hover:text-[#5C3A85] transition-all cursor-pointer font-bold flex items-center justify-between"
                              >
                                <span>{barrio}</span>
                                {barrioInput.toLowerCase() === barrio.toLowerCase() && (
                                  <Check className="w-3.5 h-3.5 text-[#E05A92]" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-xs text-stone-800 font-bold italic">
                              No se encontraron coincidencias. Escribilo manualmente.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Date & Hourly Slots side-by-side inside form col layout */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-stone-100">
                
                {/* Date Selection */}
                <div className="md:col-span-5 space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                    Elegir Fecha <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C3A85]/70 pointer-events-none" />
                    <input 
                      type="date" 
                      value={bookingDate}
                      min={getNextDateString(0)}
                      onChange={(e) => {
                        setBookingDate(e.target.value);
                        setBookingTime("");
                      }}
                      required
                      className="w-full bg-[#FAF6F9] border border-[#FCE7F3] hover:border-[#E05A92]/40 rounded-xl py-2 pl-9 pr-3.5 text-stone-950 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5C3A85]/15 focus:border-[#5C3A85] shadow-sm transition-all h-10"
                    />
                  </div>
                  {bookingDate && (
                    <span className="text-[10px] text-[#5C3A85] font-extrabold block mt-1">
                      🗓️ {formatReadableDate(bookingDate)}
                    </span>
                  )}
                </div>

                {/* Slots Selector */}
                <div className="md:col-span-7 space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-[#5C3A85]">
                    Horarios Disponibles <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map((slot) => {
                      const isBooked = appointments.some(
                        (app) => app.date === bookingDate && app.time === slot
                      );
                      const isSelected = bookingTime === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setBookingTime(slot)}
                          className={`py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border flex flex-col items-center justify-center cursor-pointer h-10 ${
                            isBooked 
                              ? "bg-stone-100 text-stone-500 border-stone-200 line-through cursor-not-allowed" 
                              : isSelected
                              ? "bg-gradient-to-tr from-[#5C3A85] to-[#E05A92] text-white border-transparent shadow-[0_4px_12px_rgba(224,90,146,0.35)] scale-[1.03]"
                              : "bg-white text-[#5C3A85] border-[#F3E8FF] hover:border-[#E05A92] hover:bg-[#FFF5F9] hover:shadow-[0_4px_10px_rgba(224,90,146,0.12)] hover:scale-[1.02] active:scale-95"
                          }`}
                        >
                          <span className="leading-none text-[11px]">{slot} hs</span>
                          <span className="text-[7px] tracking-wide uppercase font-sans font-extrabold mt-0.5 leading-none opacity-80">
                            {isBooked ? "Ocupado" : isSelected ? "Elegido" : "Libre"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom full width submit footer */}
              <div className="md:col-span-2 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[9px] text-stone-800 font-medium leading-snug max-w-xs text-center sm:text-left">
                  * Los turnos se otorgan con intervalos holgados para desinfectar toda la estación de trabajo entre clientas.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#5C3A85] to-[#E05A92] hover:from-[#4B2A6B] hover:to-[#C0497E] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(224,90,146,0.2)] hover:shadow-[0_6px_16px_rgba(224,90,146,0.35)] active:scale-98"
                >
                  <span>Confirmar Reserva Exclusiva</span>
                  <Check className="w-4 h-4 text-[#FAF1FA]" />
                </button>
              </div>

            </div>
          </form>

        </div>

      </section>

      {/* --- EXCLUSIVE BACKSTAGE GUEST LIST / ADMIN PANEL --- */}
      {showAdminConsole && (
        <section className="bg-[#211126] text-stone-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#311C38] animate-fade-in">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#311C38] pb-8">
              <div>
                <h3 className="font-serif text-xl font-medium text-white">Consola de Administración</h3>
                <p className="text-[#E05A92]/80 text-xs font-light mt-1">
                  Uso exclusivo para el control de turnos de Zoe y auditorías.
                </p>
              </div>

              {/* Toggle dashboard view trigger styled like a polished metallic jewelry badge */}
              <button
                type="button"
                onClick={() => {
                  setShowAdminConsole(false);
                }}
                className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer bg-[#2c1333] border border-[#E05A92]/50 hover:border-[#FAF1FA] text-[#FAF1FA] hover:text-white hover:shadow-[0_0_12px_rgba(224,90,146,0.35)] duration-300"
              >
                <X className="w-3.5 h-3.5 text-[#E05A92]" />
                <span>Ocultar Consola</span>
              </button>
            </div>

            <div className="mt-8 space-y-8">
              
              {/* Login block if not authenticated */}
              {!isAdminAuthenticated ? (
                <form onSubmit={handleAdminLogin} className="max-w-md mx-auto bg-[#190C1F] border border-[#3D2245] rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-[#1a061c] border border-transparent bg-clip-padding bg-origin-border bg-gradient-to-br from-[#5C3A85] via-[#E05A92] to-[#7C549F] text-[#FAF1FA] shadow-[0_0_10px_rgba(92,58,133,0.4)]">
                    <Lock className="w-5 h-5 text-[#FAF1FA]" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h4 className="text-sm font-bold text-white font-serif">Acceso Requerido</h4>
                    <p className="text-stone-400 text-xs font-light">
                      Ingresá la contraseña para visualizar la agenda activa de turnos.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <input 
                      type="password" 
                      placeholder="Contraseña del estudio"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-[#24132C] border border-[#44234F] rounded-xl py-3 px-4 text-stone-100 text-center text-xs focus:outline-none focus:border-[#E05A92] font-mono"
                    />
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#5C3A85] to-[#E05A92] hover:opacity-95 text-white py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
                    >
                      Ingresar al Dashboard
                    </button>
                  </div>
                </form>
              ) : (
                // Authenticated state view
                <div className="space-y-6">
                  
                  {/* Top Stats of Bookings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    
                    <div className="bg-[#190C1F] border border-[#3D2245] rounded-2xl p-6">
                      <span className="text-[10px] text-[#E05A92] uppercase tracking-widest block font-bold">
                        Turnos Activos
                      </span>
                      <span className="text-3xl font-serif font-bold text-white block mt-1">
                        {appointments.length}
                      </span>
                    </div>

                    <div className="bg-[#190C1F] border border-[#3D2245] rounded-2xl p-6">
                      <span className="text-[10px] text-[#E05A92] uppercase tracking-widest block font-bold">
                        Facturación Agendada Estimada
                      </span>
                      <span className="text-3xl font-serif font-bold text-white block mt-1">
                        ${appointments.reduce((sum, app) => {
                          const service = SERVICES.find((s) => s.name === app.serviceName || s.id === app.serviceId);
                          const value = service ? parseInt(service.price.replace(/[^0-9]/g, "")) : 0;
                          return sum + value;
                        }, 0).toLocaleString("es-AR")}
                      </span>
                    </div>

                    <div className="bg-[#190C1F] border border-[#3D2245] rounded-2xl p-6 flex flex-col justify-between">
                      <span className="text-[10px] text-[#E05A92] uppercase tracking-widest block font-bold">
                        Mantenimiento
                      </span>
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={handleResetDemoData}
                          className="bg-[#311C38] hover:bg-[#43234F] text-white text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-xl transition-all cursor-pointer border border-[#4F255C]"
                        >
                          Restaurar Demos
                        </button>
                        <button
                          type="button"
                          onClick={handleAdminLogout}
                          className="bg-[#190C1F] hover:bg-[#311C38] text-stone-400 hover:text-white text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-xl transition-all cursor-pointer border border-[#3D2245]"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Booking list table */}
                  <div className="bg-[#190C1F] border border-[#3D2245] rounded-2xl overflow-hidden">
                    
                    <div className="p-6 border-b border-[#311C38] flex items-center justify-between">
                      <h4 className="font-serif text-base text-white font-medium">Agenda de Clientes Registrados</h4>
                      <span className="text-[9px] uppercase tracking-widest font-mono text-[#E05A92]">
                        Estado: Sincronizado en tiempo real (Local)
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      {appointments.length === 0 ? (
                        <div className="p-8 text-center text-stone-500 space-y-3">
                          <p className="text-xs">No hay turnos registrados en este momento.</p>
                          <button
                            onClick={handleResetDemoData}
                            className="bg-[#311C38] text-stone-300 px-4 py-2 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                          >
                            Cargar Turnos de Prueba
                          </button>
                        </div>
                      ) : (
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-[#311C38] text-[#E05A92] font-mono text-[9px] uppercase tracking-wider bg-[#26132D]">
                              <th className="p-4 font-semibold">Fecha & Hora</th>
                              <th className="p-4 font-semibold">Cliente</th>
                              <th className="p-4 font-semibold">Tratamiento</th>
                              <th className="p-4 font-semibold">Teléfono / WhatsApp</th>
                              <th className="p-4 font-semibold">Zona</th>
                              <th className="p-4 font-semibold text-right">Acción</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#2B1733]">
                            {appointments.map((app) => (
                              <tr key={app.id} className="hover:bg-[#2B1733]/40 transition-colors">
                                <td className="p-4 whitespace-nowrap font-mono">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                                    <div>
                                      <span className="text-stone-100 font-bold block">{app.time} hs</span>
                                      <span className="text-[10px] text-stone-400 block">{formatReadableDate(app.date)}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 whitespace-nowrap font-medium text-stone-100">
                                  {app.clientName}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <span className="bg-[#2C1434] border border-[#522561] text-stone-300 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                                    {app.serviceName}
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap font-mono text-stone-300">
                                  <a 
                                    href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white underline underline-offset-2 flex items-center gap-1.5"
                                  >
                                    <span>{app.phone}</span>
                                  </a>
                                </td>
                                <td className="p-4 whitespace-nowrap text-stone-400">
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                                    <span>
                                      {app.modalidad === "Local" 
                                        ? "Callaqueo 1019" 
                                        : app.modalidad === "Domicilio" 
                                        ? `A domicilio: ${app.barrio || "Sin especificar"}` 
                                        : app.zone}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4 whitespace-nowrap text-right">
                                  <button
                                    onClick={() => handleDeleteAppointment(app.id)}
                                    className="text-stone-400 hover:text-rose-400 hover:bg-[#311C38] p-2 rounded-xl transition-all cursor-pointer"
                                    title="Marcar como Completado o Cancelar"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-[#170B1B] text-stone-300 py-10 px-4 border-t border-[#291430] mt-auto">
        <div className="max-w-7xl mx-auto text-center text-[10px] space-y-1.5 font-medium relative">
          <p className="font-serif text-sm tracking-wider text-white font-semibold">Kirei Nails BY ZOE</p>
          <div className="flex items-center justify-center gap-1.5 text-stone-400">
            <span>© 2026 Todos los derechos reservados.</span>
            <button 
              type="button"
              onClick={() => setShowAdminConsole(!showAdminConsole)}
              className="opacity-20 hover:opacity-100 transition-opacity duration-300 cursor-pointer p-0.5 text-stone-400 hover:text-[#E05A92] inline-flex items-center"
              aria-label="Acceso Admin"
              title="Acceso Zoe"
            >
              <Sparkles className="w-3 h-3 text-[#E05A92]" />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
