import { Link } from '@inertiajs/react';
import TransText from '@/components/TransText';

/**
 * Single blog card: image, date, title, description, "Lire l'article" link.
 * Uses project semantic colors (alpha, foreground, muted-foreground).
 *
 * @param {{ blog: { id: number, title: string, description: string, image_url: string, published_at: string, url: string } }} props
 */
export default function BlogCard({ blog }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl bg-cl-white transition hover:-translate-y-0.5">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {blog.image_url && (
                    <img
                        src={blog.image_url}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                )}
                {blog.category && (
                    <span className="absolute top-3 left-3 rounded-full bg-cl-white px-3 py-1 text-[10px] font-semibold tracking-wider text-cl-black uppercase">
                        {blog.category}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5">
                {(blog.published_at || blog.author) && (
                    <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
                        {blog.published_at}
                        {blog.author ? ` • ${blog.author}` : ''}
                    </p>
                )}
                <h2 className="mt-3 line-clamp-3 text-[1.7rem] leading-tight font-semibold text-cl-black">
                    {blog.title}
                </h2>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {blog.description}
                </p>
                <Link
                    href={blog.url}
                    className="mt-5 inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-cl-black uppercase hover:text-alpha"
                >
                    <TransText
                        fr="LIRE L'ARTICLE"
                        ar="اقرأ المقال"
                        nl="LEES HET ARTIKEL"
                    />
                    <svg
                        className="h-3.5 w-3.5 text-alpha"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
