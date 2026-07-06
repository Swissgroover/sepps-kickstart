import { useCallback, useRef, useState } from "react";
import { useBuilder } from "@/lib/builder/context";
import { Button } from "@/components/ui/button";
import { StepHeader } from "./Step1Template";
import { PhotoCropper } from "../parts/PhotoCropper";
import { Upload, RotateCcw, Crop } from "lucide-react";
import { cn } from "@/lib/utils";

export function Step2Photo() {
  const { state, dispatch } = useBuilder();
  const [cropOpen, setCropOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const readFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setPendingUrl(url);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const onFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;
    if (!files[0].type.startsWith("image/")) return;
    readFile(files[0]);
  };

  return (
    <div>
      <StepHeader
        title="Mängija foto"
        subtitle="Lohista pilt siia või vali arvutist. Pärast üleslaadimist saad seda kärpida ja positsioneerida."
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onFiles(e.dataTransfer.files);
        }}
        className={cn(
          "relative flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all",
          dragging
            ? "border-blue-400 bg-blue-500/10"
            : "border-white/15 bg-white/[0.02] hover:border-white/30",
        )}
      >
        {state.photo ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-white/20">
              <img
                src={state.photo.dataUrl}
                alt="Sinu mängija"
                className="h-full w-full object-cover"
                style={{
                  transform: `translate(${state.photo.offsetX}px, ${state.photo.offsetY}px) scale(${state.photo.scale})`,
                }}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                onClick={() => {
                  setPendingUrl(state.photo!.dataUrl);
                  setCropOpen(true);
                }}
              >
                <Crop className="h-4 w-4" /> Kohanda uuesti
              </Button>
              <Button
                variant="ghost"
                onClick={() => inputRef.current?.click()}
                className="text-white/80 hover:text-white"
              >
                <Upload className="h-4 w-4" /> Vali uus pilt
              </Button>
              <Button
                variant="ghost"
                onClick={() => dispatch({ type: "setPhoto", photo: null })}
                className="text-white/60 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" /> Eemalda
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-white/50" />
            <p className="text-white/80">
              Lohista pilt siia või{" "}
              <button
                type="button"
                className="text-blue-400 underline underline-offset-4 hover:text-blue-300"
                onClick={() => inputRef.current?.click()}
              >
                vali arvutist
              </button>
            </p>
            <p className="text-xs text-white/40">JPG, PNG · soovitatav 800×800 või suurem</p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      <PhotoCropper
        open={cropOpen}
        imageDataUrl={pendingUrl}
        initial={state.photo ?? undefined}
        onCancel={() => {
          setCropOpen(false);
          setPendingUrl(null);
        }}
        onConfirm={(t) => {
          if (!pendingUrl) return;
          dispatch({
            type: "setPhoto",
            photo: { dataUrl: pendingUrl, ...t },
          });
          dispatch({ type: "complete", step: 2 });
          setCropOpen(false);
          setPendingUrl(null);
        }}
      />
    </div>
  );
}