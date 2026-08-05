import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Droplet, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl gradient-hero">
              <Droplet className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="text-lg font-bold">
              Aqua<span className="text-primary">Pure</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium purified drinking water delivered to homes, offices and businesses since 2011.
          </p>
          <div className="mt-5 flex gap-2">
            {[FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About Us" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
              { to: "/cart", label: "Cart" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" /> +27 21 555 0198
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" /> orders@aquapure.demo
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" /> 14 Fountain Road, Cape Town
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h4>
          <p className="mt-4 text-sm text-muted-foreground">Get delivery specials and refill reminders.</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed! (demo)", { description: email });
              setEmail("");
            }}
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-10 w-full rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-primary"
            />
            <Button type="submit" className="rounded-full">
              Join
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AquaPure Water Co. — Demo store. All rights reserved.
      </div>
    </footer>
  );
}
