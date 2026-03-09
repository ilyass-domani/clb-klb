export default function VisionCard({ icon, subtitle, description }) {
    return (
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-6 flex justify-center text-alpha">{icon}</div>
            <h3 className="text-center text-lg font-bold tracking-wide text-foreground uppercase">
                {subtitle}
            </h3>
            <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                {description}
            </p>
        </div>
    );
}
