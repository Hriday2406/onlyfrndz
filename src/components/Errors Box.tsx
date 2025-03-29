const Errors: React.FC<{ errors: string[] }> = (props) => {
  return (
    <ul className="mx-auto mb-2 w-full space-y-3 rounded-xl border-2 border-red-500 px-1 py-3 text-center text-xs font-medium shadow-md shadow-[#ff000099]">
      {props.errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default Errors;
