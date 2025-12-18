export default function Button({ className = "", ...props }) {
  return (
    <button
      {...props}
      className={[
        "rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-60",
        className,
      ].join(" ")}
    />
  );
}
