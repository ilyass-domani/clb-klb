const DEFAULT_BACKGROUND_IMAGE =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80';

/**
 * Reusable page hero: full-width dark section with optional background image,
 * subtitle and title. Use at the top of every non-home page (À propos, Contact, etc.).
 */
export default function PageHero({
    subtitle,
    title,
    backgroundImage = DEFAULT_BACKGROUND_IMAGE,
}) {
    return (
        <section className="relative flex min-h-[45vh] items-center justify-center bg-foreground px-4 pt-28 pb-20">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-foreground/85" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
                {subtitle && (
                    <p className="text-sm font-medium tracking-wider text-cl-white/80 uppercase">
                        {subtitle}
                    </p>
                )}
                <h1
                    className={`text-4xl font-bold tracking-tight text-cl-white uppercase sm:text-5xl lg:text-6xl ${subtitle ? 'mt-3' : ''}`}
                >
                    {title}
                </h1>
            </div>
        </section>
    );
}
