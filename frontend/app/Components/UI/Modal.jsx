export function Modal({ open, onClose, children }) {
if (!open) return null;


return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
<div className="bg-white rounded-2xl p-6 max-w-lg w-full relative">
<button
onClick={onClose}
className="absolute top-3 right-3 text-gray-500"
>
✕
</button>
{children}
</div>
</div>
);
}