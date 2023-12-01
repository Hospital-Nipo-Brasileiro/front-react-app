function Input({ type = "text", label, placeholder = "digite o valor aqui", value, onChange }) {
  return (
    <div className="relative">
      <label className="text-orange-500 block">{label}</label>
      <input
        className="bg-slate-100 p-1 mt-1 mb-3 w-full h-8 rounded-xl border focus:outline-none focus:ring-1 focus:ring-orange-600 focus:border-orange-600"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
