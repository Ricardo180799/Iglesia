export function Section({ title, subtitle, children }) {
return (
<section className="py-16">
{(title || subtitle) && (
<div className="mb-10 text-center">
{title && <h2 className="text-8xl font-bold">{title}</h2>}
{subtitle && <p className="text-gray-600 mt-2 text-2xl">{subtitle}</p>}
</div>
)}
{children}
</section>
);
}