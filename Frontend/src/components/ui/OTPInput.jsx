export default function OTPInput() {
  return (
    <div className="flex justify-between gap-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          maxLength={1}
          className="w-12 h-12 text-center text-lg rounded-lg
                     bg-white/10 outline-none"
        />
      ))}
    </div>
  );
}
