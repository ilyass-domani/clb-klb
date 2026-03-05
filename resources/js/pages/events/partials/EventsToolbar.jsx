const statusTabs = [
    { id: 'upcoming', label: 'À venir', active: true },
    { id: 'past', label: 'Passés', active: false },
];

const typeFilters = [
    { id: 'all', label: 'Tous', active: true },
    { id: 'conference', label: 'Conférence', active: false },
    { id: 'gala', label: 'Gala', active: false },
    { id: 'networking', label: 'Networking', active: false },
];

export default function EventsToolbar() {
    return (
        <section className="bg-background">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="flex items-center gap-6">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`pb-1 text-sm font-medium transition ${
                                tab.active
                                    ? 'border-b-2 border-cl-black text-cl-black'
                                    : 'text-cl-beta hover:text-cl-black'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {typeFilters.map((filter) => (
                        <button
                            key={filter.id}
                            type="button"
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                filter.active
                                    ? 'bg-alpha text-cl-white'
                                    : 'border border-border bg-cl-white text-cl-black hover:border-alpha/40'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
