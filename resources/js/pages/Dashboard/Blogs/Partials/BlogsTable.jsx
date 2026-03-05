import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DeleteBlogButton from './DeleteBlogButton';
import { PencilIcon } from 'lucide-react';

function formatDate(iso) {
    if (!iso) return '—';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch {
        return iso;
    }
}

export default function BlogsTable({ blogs, activeLocale, onEdit, onDeleteSuccess }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {blogs.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-muted-foreground text-center py-8">
                            No blogs yet. Create one to get started.
                        </TableCell>
                    </TableRow>
                ) : (
                    blogs.map((blog) => (
                        <TableRow key={blog.id}>
                            <TableCell className="font-medium">
                                {blog.title_active || blog.title?.[activeLocale] || 'Untitled'}
                            </TableCell>
                            <TableCell>
                                <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                                    {blog.status === 'published' ? 'Published' : 'Draft'}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatDate(blog.created_at)}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(blog)}
                                        aria-label="Edit"
                                    >
                                        <PencilIcon className="size-4" />
                                    </Button>
                                    <DeleteBlogButton blog={blog} onDeleted={onDeleteSuccess} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
