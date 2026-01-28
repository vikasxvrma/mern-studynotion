const Loader = () => {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          h-10 w-10 sm:h-12 sm:w-12
          rounded-full
          border-[3px] sm:border-4
          border-yellow-25
          border-t-transparent
          animate-spin
          shadow-[0_0_20px_rgba(255,214,0,0.6)]
        "
      />
    </div>
  );
};

export default Loader;
