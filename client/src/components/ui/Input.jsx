export default function Input(props) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-lg border border-slate-300 px-3 py-2",
        "focus:outline-none focus:ring-2 focus:ring-slate-400",
        props.className || "",
      ].join(" ")}
    />
  );
}
