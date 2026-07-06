import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  imageDataUrl: string | null;
  initial?: { offsetX: number; offsetY: number; scale: number };
  onCancel: () => void;
  onConfirm: (transform: { offsetX: number; offsetY: number; scale: number }) => void;
}

export function PhotoCropper({ open, imageDataUrl, initial, onCancel, onConfirm }: Props) {
  const [scale, setScale] = useState(initial?.scale ?? 1);
  const [offset, setOffset] = useState({ x: initial?.offsetX ?? 0, y: initial?.offsetY ?? 0 });
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    if (open) {
      setScale(initial?.scale ?? 1);
      setOffset({ x: initial?.offsetX ?? 0, y: initial?.offsetY ?? 0 });
    }
  }, [open, initial]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + (e.clientX - dragRef.current.x),
      y: dragRef.current.oy + (e.clientY - dragRef.current.y),
    });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 12 : 4;
    if (e.key === "ArrowLeft") setOffset((o) => ({ ...o, x: o.x - step }));
    if (e.key === "ArrowRight") setOffset((o) => ({ ...o, x: o.x + step }));
    if (e.key === "ArrowUp") setOffset((o) => ({ ...o, y: o.y - step }));
    if (e.key === "ArrowDown") setOffset((o) => ({ ...o, y: o.y + step }));
    if (e.key === "+" || e.key === "=") setScale((s) => Math.min(3, s + 0.1));
    if (e.key === "-") setScale((s) => Math.max(1, s - 0.1));
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-md border-white/10 bg-slate-950/95 text-white">
        <DialogHeader>
          <DialogTitle>Kohanda fotot</DialogTitle>
        </DialogHeader>

        <div
          className="relative mx-auto aspect-square w-full max-w-[320px] cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-black/50 active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="application"
          aria-label="Foto positsioneerimine — lohista, nooleklahvid, + / − zoomiks"
        >
          {imageDataUrl && (
            
            <img
              src={imageDataUrl}
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 select-none object-cover"
              style={{
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
                transformOrigin: "center center",
              }}
              draggable={false}
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <Label className="text-xs uppercase tracking-widest text-white/60">Zoom</Label>
            <Slider
              min={1}
              max={3}
              step={0.05}
              value={[scale]}
              onValueChange={(v) => setScale(v[0]!)}
              className="mt-2"
              aria-label="Zoom"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
            disabled
            title="Peagi tulekul"
          >
            <Sparkles className="h-4 w-4" />
            Eemalda taust (AI) · peagi tulekul
          </Button>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel} className="text-white/70 hover:text-white">
            Tühista
          </Button>
          <Button
            onClick={() => onConfirm({ offsetX: offset.x, offsetY: offset.y, scale })}
            className="bg-blue-500 hover:bg-blue-400"
          >
            Kinnita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}