function Input({ type = "text", label, placeholder = "digite o valor aqui", value, onChange, customStyled, divStyled, disabled }) {
  return (
    <div className={`flex flex-col w-full ${divStyled}`}>
      <label className="text-lime-500 block">{label}</label>
      <input
        className={`bg-slate-100 p-1 mt-1 mb-3 w-full h-8 rounded-xl border focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 ${customStyled}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
