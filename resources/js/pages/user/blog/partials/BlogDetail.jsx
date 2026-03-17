/**
 * Renders a single blog post: back link, date, title, image, and full body (TipTap HTML in prose).
 * Uses current locale translation (passed from server); static labels use TransText.
 *
 * @param {{ blog: { title: string, body?: string, image_url?: string, published_at?: string, category?: string, author?: string, url?: string } }} props
 */
export default function BlogDetail({ blog }) {
    if (!blog) return null;

    const hasMeta = Boolean(blog.category || blog.published_at || blog.author);

    return (
        <article className="container min-h-[calc(100vh-237px)] py-10 text-center sm:py-14">
            <div className="">
                {hasMeta && (
                    <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-xs tracking-widest uppercase sm:text-sm">
                        {blog.category && (
                            <span className="font-semibold text-alpha">
                                {blog.category}
                            </span>
                        )}
                        {blog.category && blog.published_at && (
                            <span className="text-muted-foreground">•</span>
                        )}
                        {blog.published_at && (
                            <span className="text-muted-foreground">
                                {blog.published_at}
                            </span>
                        )}
                        {(blog.category || blog.published_at) && blog.author && (
                            <span className="text-muted-foreground">•</span>
                        )}
                        {blog.author && (
                            <span className="text-muted-foreground">
                                BY {blog.author}
                            </span>
                        )}
                    </div>
                )}
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                    {blog.title}
                </h1>
            </div>
            {blog.image_url && (
                <div className="relative mt-6 aspect-16/7 w-full overflow-hidden rounded-lg bg-muted">
                    <img
                        src={blog.image_url}
                        alt={blog.title || 'Blog image'}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            {blog.body && (
                <div
                    className="prose prose-foreground mt-6 max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.body }}
                />
            )}
        </article>
    );
}
