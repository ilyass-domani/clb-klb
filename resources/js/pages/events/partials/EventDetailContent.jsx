export default function EventDetailContent({ event }) {
    return (
        <section className="bg-background py-12 lg:py-20">
            <div className="mx-auto max-w-5xl px-4 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <div>
                        <h2 className="text-xl font-bold text-cl-black">
                            À propos de l&apos;événement
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-cl-beta">
                            {event.description}
                        </p>

                        {event.agenda && event.agenda.length > 0 && (
                            <div className="mt-10">
                                <h3 className="text-sm font-bold uppercase tracking-wide text-cl-black">
                                    Programme
                                </h3>
                                <ul className="mt-4 space-y-3 text-sm text-cl-beta">
                                    {event.agenda.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full bg-alpha" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-6 rounded-2xl bg-cl-blue-light/40 p-6 text-sm text-cl-black">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wide text-cl-beta">
                                Informations pratiques
                            </h3>
                            <dl className="mt-4 space-y-3">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-xs text-cl-beta">Date</dt>
                                    <dd className="text-xs font-semibold text-cl-black">
                                        {event.dateLabel}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-xs text-cl-beta">Heure</dt>
                                    <dd className="text-xs font-semibold text-cl-black">
                                        {event.time}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-xs text-cl-beta">Lieu</dt>
                                    <dd className="text-right text-xs font-semibold text-cl-black">
                                        {event.location}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-xs text-cl-beta">Ville</dt>
                                    <dd className="text-xs font-semibold text-cl-black">
                                        {event.city}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-xs text-cl-beta">Tarif</dt>
                                    <dd className="text-xs font-bold text-alpha">{event.price}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="border-t border-border pt-5">
                            <h3 className="text-xs font-bold uppercase tracking-wide text-cl-beta">
                                Partagez l&apos;événement
                            </h3>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="rounded-full border border-border bg-cl-white px-4 py-2 text-xs font-semibold text-cl-black transition hover:border-alpha hover:text-alpha"
                                >
                                    LinkedIn
                                </button>
                                <button
                                    type="button"
                                    className="rounded-full border border-border bg-cl-white px-4 py-2 text-xs font-semibold text-cl-black transition hover:border-alpha hover:text-alpha"
                                >
                                    Facebook
                                </button>
                                <button
                                    type="button"
                                    className="rounded-full border border-border bg-cl-white px-4 py-2 text-xs font-semibold text-cl-black transition hover:border-alpha hover:text-alpha"
                                >
                                    Copier le lien
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
