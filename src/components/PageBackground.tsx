interface PageBackgroundProps {
  children: React.ReactNode;
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900 to-zinc-900" />
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>
      {children}
    </div>
  );
}
