// bg-stone-500 text-white py-2 px-4 rounded-md border-2 border-transparent hover:border-stone-900

export const Button = ({ clickFunc, classNames, innerText }) => {
  return (
    <button onClick={clickFunc} className={classNames}>
      {innerText}
    </button>
  );
};
