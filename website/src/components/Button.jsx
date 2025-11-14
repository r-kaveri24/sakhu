export default function Button({ href, children, onClick, type = 'button', className = '' }) {
  const base = 'px-4 py-2 rounded-md bg-white text-black text-sm hover:bg-[#2E3192] hover:text-white';
  const classes = `${base} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}