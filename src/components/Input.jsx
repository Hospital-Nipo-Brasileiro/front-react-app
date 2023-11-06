function Input({type = "text", label,  placeholder = "digite o valor aqui", value, onChange}) {
  return(
    <>
        <label>{label}</label>
        <input 
            className="bg-slate-100 p-1 mt-5 w-full h-10 rounded-xl" 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange}
        />
    </>
  );
}

export default Input;