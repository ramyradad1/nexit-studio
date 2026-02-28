"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const t = useTranslations("Contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service || !formData.message) {
      toast.error(t("form.error")); // Basic validation
      return;
    }

    setIsSubmitting(true);

    try {
      // Attempt to save to Supabase
      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success(t("form.success"));
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      console.warn("Supabase insert failed, falling back to localStorage", err);
      // Fallback to localStorage
      try {
        const existingLogs = JSON.parse(localStorage.getItem("nexa-leads") || "[]");
        existingLogs.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem("nexa-leads", JSON.stringify(existingLogs));

        toast.success(t("form.success"));
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } catch (localErr) {
        toast.error(t("form.error"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5 glass-card p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                    {t("form.name")} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder={t("form.name")}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-muted-foreground">
                    {t("form.phone")} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder={t("form.phone")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                    {t("form.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder={t("form.email")}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2 text-muted-foreground">
                    {t("form.service")} *
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                  >
                    <option value="" disabled>{t("form.service")}</option>
                    <option value="web">{t("form.services.web")}</option>
                    <option value="it">{t("form.services.it")}</option>
                    <option value="cloud">{t("form.services.cloud")}</option>
                    <option value="security">{t("form.services.security")}</option>
                    <option value="other">{t("form.services.other")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                  {t("form.message")} *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  placeholder={t("form.message")}
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto mt-2">
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    {t("form.send")}
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: <Mail size={20} />, label: t("info.emailLabel"), value: t("info.email") },
              { icon: <Phone size={20} />, label: t("info.phoneLabel"), value: t("info.phone") },
              { icon: <MapPin size={20} />, label: t("info.locationLabel"), value: t("info.location") },
            ].map((item, i) => (
              <div key={i} className="glass-card p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/201030769960"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 glass-card p-5 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-500">{t("info.whatsapp")}</p>
                <p className="text-xs text-muted-foreground">+20 103 076 9960</p>
              </div>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
