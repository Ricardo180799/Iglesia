export function Button({
children,
variant = "primary",
size = "md",
className = "",
...props
}) {
const variants = {
primary: "bg-blue-600 text-white hover:bg-blue-700",
secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
outline: "border border-gray-300 hover:bg-gray-100",
danger: "bg-red-600 text-white hover:bg-red-700",
other:"bg-gray-200 text-blue-600 hover:bg-gray-300"
};


const sizes = {
sm: "px-3 py-1 text-sm",
md: "px-4 py-2",
lg: "px-6 py-3 text-lg",
};


return (
<button
className={`rounded-xl font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
{...props}
>
{children}
</button>
);
}