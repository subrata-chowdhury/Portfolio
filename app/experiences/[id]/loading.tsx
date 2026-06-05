export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full z-20 backdrop-blur-md bg-white/50 dark:bg-black/50 flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-l-blue-500 border-t-blue-500 animate-[spin_1s_linear_infinite]"></div>
        {/* Inner Ring */}
        <div className="absolute w-24 h-24 rounded-full border-[6px] border-transparent border-l-orange-500 border-t-orange-500 animate-[spin_1s_linear_infinite_reverse]"></div>
      </div>
      <p className="mt-8 text-gray-900 dark:text-gray-100 font-bold tracking-wide">
        Fetching Latest Details...
      </p>
    </div>
  );
}
