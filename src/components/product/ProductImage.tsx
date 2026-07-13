import { useEffect, useRef, useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
};

function ProductImageInner({ src, alt }: ProductImageProps) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      try {
        const canvas = canvasRef.current ?? document.createElement("canvas");
        canvasRef.current = canvas;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const isBackground = (r: number, g: number, b: number, a: number) =>
          a === 0 || (r > 245 && g > 245 && b > 245);

        const rowHasContent = (y: number) => {
          for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            if (!isBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) return true;
          }
          return false;
        };
        const colHasContent = (x: number) => {
          for (let y = 0; y < canvas.height; y++) {
            const i = (y * canvas.width + x) * 4;
            if (!isBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) return true;
          }
          return false;
        };

        let top = 0;
        let bottom = canvas.height - 1;
        let left = 0;
        let right = canvas.width - 1;

        while (top < bottom && !rowHasContent(top)) top++;
        while (bottom > top && !rowHasContent(bottom)) bottom--;
        while (left < right && !colHasContent(left)) left++;
        while (right > left && !colHasContent(right)) right--;

        const trimmedWidth = right - left + 1;
        const trimmedHeight = bottom - top + 1;
        const areaRatio = (trimmedWidth * trimmedHeight) / (canvas.width * canvas.height);

        // Nothing meaningful to trim (already tight) — keep original.
        if (areaRatio > 0.92 || trimmedWidth <= 0 || trimmedHeight <= 0) return;

        const padding = Math.round(Math.max(trimmedWidth, trimmedHeight) * 0.06);
        const cropX = Math.max(0, left - padding);
        const cropY = Math.max(0, top - padding);
        const cropW = Math.min(canvas.width - cropX, trimmedWidth + padding * 2);
        const cropH = Math.min(canvas.height - cropY, trimmedHeight + padding * 2);

        const outCanvas = document.createElement("canvas");
        outCanvas.width = cropW;
        outCanvas.height = cropH;
        const outCtx = outCanvas.getContext("2d");
        if (!outCtx) return;
        outCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        if (!cancelled) setDisplaySrc(outCanvas.toDataURL("image/png"));
      } catch {
        if (!cancelled) setDisplaySrc(src);
      }
    };

    img.onerror = () => {
      if (!cancelled) setDisplaySrc(src);
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={displaySrc}
        alt={alt}
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
}

function ProductImage(props: ProductImageProps) {
  return <ProductImageInner key={props.src} {...props} />;
}

export default ProductImage;