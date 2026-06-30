'use client';

import { TREATMENTS, Treatment } from '../types';

const CATEGORIES = Array.from(new Set(TREATMENTS.map((t) => t.category)));

export default function TreatmentStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: Treatment | null;
  onSelect: (t: Treatment) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1a5f7a] mb-1">Select a Treatment</h2>
      <p className="text-gray-500 text-sm mb-6">Choose the service you need and we&apos;ll find the right time for you.</p>

      {CATEGORIES.map((cat) => (
        <div key={cat} className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{cat}</h3>
          <div className="grid gap-2">
            {TREATMENTS.filter((t) => t.category === cat).map((t) => (
              <button
                key={t.id}
                onClick={() => onSelect(t)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selected?.id === t.id
                    ? 'border-[#1a5f7a] bg-[#e8f4fd]'
                    : 'border-gray-100 bg-white hover:border-[#1a5f7a]/40 hover:bg-[#f5fbff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{t.description}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-4 flex-shrink-0">
                    {t.duration} min
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className="px-8 py-3 bg-[#1a5f7a] text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#155068] transition-colors"
        >
          Next: Choose Date & Time →
        </button>
      </div>
    </div>
  );
}
