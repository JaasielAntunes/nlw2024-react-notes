import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  noteCreated: (content: string) => void;
}

export function NewNoteCard({ noteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsReacording] = useState(false);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handleContentChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);

    if (e.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();

    if (content === "") {
      alert("Insira algum conteúdo para salvar esta nota!");
      return;
    }

    noteCreated(content);
    setContent("");
    setShouldShowOnboarding(true);
    toast.success("Nota criada com sucesso!");
  }

  function handleStartRecording() {
    setIsReacording(true);
  }

  function handleStopRecording() {
    setIsReacording(false);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col gap-3 text-left bg-slate-700 p-5 hover:ring-2 hover:ring-violet-600 focus-visible:ring-2 focus-visible:ring-violet-700 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto de forma
          automática.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-full h-[45vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute hover:bg-red-500 transition-colors duration-300 ease-in-out right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Você pode começar{" "}
                  <button type="button" onClick={handleStartRecording} className="font-medium text-violet-400 hover:underline">
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-violet-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-violet-600 py-4 text-center text-sm text-white outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}