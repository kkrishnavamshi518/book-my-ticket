import React from "react";
const LANGUAGE_TYPES = [
  { lang: "ENGLISH", formats: ["2D", "3D", "4DX 3D"] }, { lang: "TELUGU", formats: ["2D", "3D"] }, { lang: "HINDI", formats: ["2D", "3D"] }
];
export default function LanguageFormatModal({ movieTitle, open, onClose, onSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/50 pt-16">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">{movieTitle}</p>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold">Select language and format</h2>
          </div>
          <button onClick={onClose} 
                  className="text-base sm:text-lg text-gray-500 hover:text-gray-700 leading-none">
                    <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {LANGUAGE_TYPES.map((row) => (
            <div key={row.lang}>
              <div className="px-5 py-2 text-[11px] sm:text-xs font-semibold text-gray-500 bg-gray-50">{row.lang}</div>
              <div className="px-5 py-3 flex gap-3 flex-wrap">
                {row.formats.map((fmt) => (
                  <button key={fmt} onClick={() => onSelect({ lang: row.lang, format: fmt })}
                    className="px-5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-rose-300 
                               text-xs sm:text-sm md:text-base text-rose-500  hover:bg-rose-50  cursor-pointer">{fmt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}