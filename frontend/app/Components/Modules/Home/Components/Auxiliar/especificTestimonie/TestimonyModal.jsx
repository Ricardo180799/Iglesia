"use client";
import TestimonyForm from "./TestimonyForm";

export default function TestimonyModal({ active, onClose }) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenedor */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <TestimonyForm onClose={onClose} />
      </div>
    </div>
  );
}