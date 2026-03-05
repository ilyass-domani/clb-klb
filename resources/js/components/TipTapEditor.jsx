import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * TipTap rich text editor using StarterKit. Controlled via value/onChange (HTML string).
 */
export default function TipTapEditor({ value = '', onChange, placeholder, className, minHeight = '120px' }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: placeholder || 'Write content…' }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[80px] px-3 py-2',
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

    if (!editor) return null;

    return (
        <div
            className={cn(
                'rounded-md border border-input bg-background text-sm shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                className
            )}
            style={{ minHeight }}
        >
            <EditorContent editor={editor} />
        </div>
    );
}
