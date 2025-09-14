import { useRef, useState } from "react";

  export default function UploadDropzone({ file, setFile }) {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);

    const onSelect = (f) => {
      if (!f) return;
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onSelect(f);
    };

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
      if (e.type === "dragleave") setDragActive(false);
    };

    return (
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 mt-4 transition-colors ${dragActive ? "border-brand-500 bg-brand-50" : "border-gray-300 bg-white"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onSelect(e.target.files?.[0])}
        />
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-3xl">🖼️</div>
          <div className="text-sm text-gray-600">
            Drag and drop an image here, or{" "}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-brand-700 font-medium hover:underline"
            >
              click to upload
            </button>
          </div>
          {preview && (
            <div className="mt-4 w-full max-w-[480px]">
              <img src={preview} alt="Preview" className="w-full rounded-md" />
            </div>
          )}
        </div>
      </div>
    );
  }