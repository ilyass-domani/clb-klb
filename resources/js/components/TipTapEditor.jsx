import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3 } from 'lucide-react';

/**
 * TipTap editor with toolbar: Bold, Italic, H2, H3, Bullet list, Ordered list.
 * Controlled via value/onChange (HTML string). Title/Slug stay plain Input elsewhere.
 */
function Toolbar({ editor }) {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/40 px-2 py-1">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                    'rounded p-1.5 hover:bg-muted',
                    editor.isActive('bold') && 'bg-muted'
                )}
                title="Bold"
                aria-label="Bold"
            >
                <Bold className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                    'rounded p-1.5 hover:bg-muted',
                    editor.isActive('italic') && 'bg-muted'
                )}
                title="Italic"
                aria-label="Italic"
            >
                <Italic className="size-4" />
            </button>
            <span className="mx-1 h-4 w-px bg-border" aria-hidden />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={cn(
                    'rounded p-1.5 hover:bg-muted',
                    editor.isActive('heading', { level: 2 }) && 'bg-muted'
                )}
                title="Heading 2"
                aria-label="Heading 2"
            >
                <Heading2 className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={cn(
                    'rounded p-1.5 hover:bg-muted',
                    editor.isActive('heading', { level: 3 }) && 'bg-muted'
                )}
                title="Heading 3"
                aria-label="Heading 3"
            >
                <Heading3 className="size-4" />
            </button>
            <span className="mx-1 h-4 w-px bg-border" aria-hidden />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(
                    'rounded p-1.5 hover:bg-muted',
                    editor.isActive('bulletList') && 'bg-muted'
                )}
                title="Bullet list"
                aria-label="Bullet list"
            >
                <List className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(
                    'rounded p-1.5 hover:bg-muted',
                    editor.isActive('orderedList') && 'bg-muted'
                )}
                title="Ordered list"
                aria-label="Ordered list"
            >
                <ListOrdered className="size-4" />
            </button>
        </div>
    );
}

export default function TipTapEditor({ value = '', onChange, placeholder, className, minHeight = '120px' }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
            }),
            Placeholder.configure({ placeholder: placeholder || 'Write content…' }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[80px] px-3 py-2 text-sm',
            },
        },
        onUpdate: ({ editor: ed }) => {
            onChange?.(ed.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;
        const current = editor.getHTML();
        if (value !== current) {
            editor.commands.setContent(value ?? '', false);
        }
    }, [value, editor]);

    if (!editor) {
        return (
            <textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder || 'Write content…'}
                className={cn(
                    'flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    className
                )}
                style={{ minHeight }}
            />
        );
    }

    return (
        <div
            className={cn(
                'rounded-md border border-input bg-background text-sm shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 [&_.ProseMirror]:min-h-[80px]',
                className
            )}
            style={{ minHeight }}
        >
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
