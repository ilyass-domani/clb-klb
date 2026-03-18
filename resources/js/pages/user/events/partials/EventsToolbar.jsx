import { useTrans } from '@/hooks/use-trans';

const statusTabs = [
      { 
        id: 'all', 
        label: { fr: 'all', ar: 'all', nl: 'all' } 
    },
    {
        id: 'upcoming',
        label: { fr: 'À venir', ar: 'القادمة', nl: 'Aankomend' },
    },
    { 
        id: 'past', 
        label: { fr: 'Passés', ar: 'الماضية', nl: 'Afgelopen' } 
    },
];

const typeFilters = [
    { id: 'all', label: { fr: 'Tous', ar: 'الكل', nl: 'Alle' } },
    {
        id: 'conference',
        label: { fr: 'Conférence', ar: 'مؤتمر', nl: 'Conferentie' },
    },
    { id: 'gala', label: { fr: 'Gala', ar: 'حفل', nl: 'Gala' } },
    {
        id: 'networking',
        label: { fr: 'Networking', ar: 'تواصل', nl: 'Networking' },
    },
];

export function EventsToolbar({
    statusFilter,
    onStatusChange,
    categoryFilter,
    onCategoryChange,
}) {
    const { t } = useTrans();
    return (
        <section className="bg-background">
            <div className="container flex flex-col gap-4 py-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-6">
                    {statusTabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onStatusChange?.(tab.id)}
                            className={`pb-1 text-sm font-medium transition ${
                                statusFilter === tab.id
                                    ? 'border-b-2 border-cl-black text-cl-black'
                                    : 'text-cl-beta hover:text-cl-black'
                            }`}
                        >
                            {t(tab.label)}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {typeFilters.map((filter) => (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() => onCategoryChange?.(filter.id)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                categoryFilter === filter.id
                                    ? 'bg-alpha text-cl-white'
                                    : 'border border-border bg-cl-white text-cl-black hover:border-alpha/40'
                            }`}
                        >
                            {t(filter.label)}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default EventsToolbar;
