const DEFAULT_BACKGROUND_IMAGE =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80';

/**
 * Reusable page hero: full-width dark section with optional background image,
 * subtitle and title. Use at the top of every non-home page (À propos, Contact, etc.).
 *
 * @param {string} [subtitle] - Optional small uppercase text above the title
 * @param {string} title - Main heading
 * @param {string} [backgroundImage] - Optional image URL (defaults to shared stock image)
 */
export default function PageHero({ subtitle, title, backgroundImage = DEFAULT_BACKGROUND_IMAGE }) {
    return (
        <section className="relative flex min-h-[50vh] items-center justify-center bg-cl-black px-4 pt-24 pb-16">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-cl-black/70" />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {subtitle && (
                    <p className="text-sm font-medium uppercase tracking-wider text-cl-white/80">
                        {subtitle}
                    </p>
                )}
                <h1
                    className={`text-4xl font-bold uppercase tracking-tight text-cl-white sm:text-5xl lg:text-6xl ${subtitle ? 'mt-3' : ''}`}
                >
                    {title}
                </h1>
            </div>
        </section>
    );
}
