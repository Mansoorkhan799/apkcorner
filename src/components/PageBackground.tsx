interface PageBackgroundProps {
  children: React.ReactNode;
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-zinc-900" />
      {children}
    </div>
  );
}
