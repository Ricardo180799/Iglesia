export function Textarea({ label, className = "", ...props }) {
return (
<div className="flex flex-col gap-1">
{label && <label className="text-sm font-medium">{label}</label>}
<textarea
className={`border rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
{...props}
/>
</div>
);
}