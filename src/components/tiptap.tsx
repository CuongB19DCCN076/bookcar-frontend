"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "./toolbar"
import Heading from "@tiptap/extension-heading"
const Tiptap = ({
    description,
    onChange
}: {
    description: string,
    onChange: (richText: string) => void
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2]
                },
            })
        ],
        content: description,
        editorProps: {
            attributes: {
                class:
                    "p-3 rounded-md border min-h-[150px] border-input bg-background disabled:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })
    return (
        <div className="flex flex-col justify-stretch min-h-[250px] w-full">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap