export default function EventDetailHero({ event }) {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${event.imageUrl || 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1600&q=80'})`,
                    }}
                />
                <div className="absolute inset-0 bg-cl-black/60" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-16 lg:flex lg:items-end lg:gap-10 lg:px-8 lg:py-24">
                <div className="max-w-2xl flex-1">
                    <span className="inline-flex items-center rounded-full bg-alpha px-4 py-1 text-xs font-semibold tracking-wide text-cl-white uppercase">
                        {event.category}
                    </span>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-cl-white italic lg:text-4xl">
                        {event.title}
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-cl-white/80 lg:text-base">
                        {event.description}
                    </p>
                </div>

                <div className="mx-auto mt-8 rounded-2xl bg-cl-white p-6 shadow-xl lg:mt-0">
                    <div className="space-y-4 text-sm text-cl-black">
                        <div>
                            <p className="text-xs font-semibold tracking-wide text-cl-beta uppercase">
                                Date & heure
                            </p>
                            <span className="text-sm leading-none font-bold">
                                {new Date(event.date).toLocaleString(
                                    'default',
                                    {
                                        month: 'short',
                                        day : '2-digit',
                                        year : 'numeric'
                                    },
                                )}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wide text-cl-beta uppercase">
                                Lieu
                            </p>
                            <p className="mt-1 font-semibold">
                                {event.location}
                            </p>
                            <p className="text-xs text-cl-beta">{event.city}</p>
                        </div>
                        <div className="border-t border-border pt-4">
                            <p className="text-sm font-bold text-alpha">
                                {event.price}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="w-full rounded-full bg-alpha px-5 py-3 text-sm font-semibold tracking-wide text-cl-white uppercase transition hover:bg-alpha/90"
                        >
                            book
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
