import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-16 sm:py-20 ${className}`}>
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          )}
          {title && <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </motion.div>
      )}
      {children}
    </section>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-primary-foreground sm:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-3 max-w-2xl text-primary-foreground/85"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="h-52 w-full animate-pulse bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
        <div className="h-9 w-full animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}
