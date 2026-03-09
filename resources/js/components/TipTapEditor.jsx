import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import History from '@tiptap/extension-history';

import {
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Heading2,
    Heading3,
} from 'lucide-react';

function Toolbar({ editor }) {
    const state = useEditorState({
        editor,
        selector: (ctx) => {
            const e = ctx.editor;
            if (!e) return null;
            return {
                bold: e.isActive('bold'),
                italic: e.isActive('italic'),
                underline: e.isActive('underline'),
                h2: e.isActive('heading', { level: 2 }),
                h3: e.isActive('heading', { level: 3 }),
                bulletList: e.isActive('bulletList'),
                orderedList: e.isActive('orderedList'),
            };
        },
    });

    if (!editor || !state) return null;

    const btnClass = (active) =>
        cn(
            'rounded p-1.5 transition-colors hover:bg-muted',
            active && 'bg-primary/15 text-primary ring-1 ring-primary/30',
        );

    return (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/40 px-2 py-1.5">
            <button
                type="button"
                className={btnClass(state.bold)}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Bold"
                aria-label="Bold"
            >
                <BoldIcon className="size-4" />
            </button>

            <button
                type="button"
                className={btnClass(state.italic)}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic"
                aria-label="Italic"
            >
                <ItalicIcon className="size-4" />
            </button>

            <button
                type="button"
                className={btnClass(state.underline)}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                title="Underline"
                aria-label="Underline"
            >
                <UnderlineIcon className="size-4" />
            </button>

            <span className="mx-1 h-4 w-px bg-border" aria-hidden />

            <button
                type="button"
                className={btnClass(state.h2)}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Heading 2"
                aria-label="Heading 2"
            >
                <Heading2 className="size-4" />
            </button>

            <button
                type="button"
                className={btnClass(state.h3)}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                title="Heading 3"
                aria-label="Heading 3"
            >
                <Heading3 className="size-4" />
            </button>

            <span className="mx-1 h-4 w-px bg-border" aria-hidden />

            <button
                type="button"
                className={btnClass(state.bulletList)}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Bullet list"
                aria-label="Bullet list"
            >
                <List className="size-4" />
            </button>

            <button
                type="button"
                className={btnClass(state.orderedList)}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Ordered list"
                aria-label="Ordered list"
            >
                <ListOrdered className="size-4" />
            </button>
        </div>
    );
}

export default function TipTapEditor({
    content,
    value,
    onChange,
    placeholder,
    className,
    minHeight = '140px',
}) {
    const initialContent = content ?? value ?? '';

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            Document,
            Paragraph,
            Text,
            Heading.configure({ levels: [2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            Bold,
            Italic,
            Underline,
            History,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'tiptap-content focus:outline-none px-3 py-2 text-sm',
            },
        },
        onUpdate: ({ editor: ed }) => {
            onChange?.(ed.getHTML());
        },
    });

    const externalContent = content ?? value ?? '';
    useEffect(() => {
        if (!editor) return;
        const current = editor.getHTML();
        if (externalContent !== current) {
            editor.commands.setContent(externalContent, false);
        }
    }, [externalContent, editor]);

    return (
        <div
            className={cn(
                'rounded-md border border-input bg-background text-sm shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                className,
            )}
        >
            <Toolbar editor={editor} />
            <div style={{ minHeight }}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
