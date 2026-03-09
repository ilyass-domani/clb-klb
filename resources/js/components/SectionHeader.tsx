import TransText from './TransText';

export function SectionHeader({
    label,
    title,
    nosplitter= false,
}: {
    label: { fr: string; ar: string; nl: string };
    title: { fr: string; ar: string; nl: string };
    nosplitter?: boolean;
}) {
    return (
        <>
            <TransText
                {...label}
                as="p"
                className="text-center text-xs font-medium tracking-wider text-alpha uppercase"
            />
            <TransText
                {...title}
                as="h2"
                className="mt-2 text-center text-3xl font-bold text-foreground lg:text-4xl"
            />
            {!nosplitter && (
                <hr className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-alpha" />
            )}
        </>
    );
}

export default SectionHeader;
