export function handleClickOutside(e) {
  if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    setOpen(false);
  }
}
document.addEventListener("mousedown", handleClickOutside);
return () => document.removeEventListener("mousedown", handleClickOutside);
