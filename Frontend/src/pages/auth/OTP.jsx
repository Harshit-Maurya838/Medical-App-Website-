import AuthLayout from "../../components/layout/AuthLayout";
import { Smartphone, ArrowLeft, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { showError, showSuccess } from "../../utils/toast";

export default function OTP({ onVerified, onBack, identifier }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    if (!isComplete) {
      showError("Please enter the complete OTP");
      return;
    }

    showSuccess("OTP verified successfully");
    onVerified();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <AuthLayout>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 px-4 py-2 rounded-full
                   bg-white/10 backdrop-blur-md
                   flex items-center gap-2 text-sm
                   hover:bg-white/20 transition"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* OTP Card */}
      <div className="glass rounded-2xl p-4 md:p-8 w-full max-w-sm text-center">
        <div
          className="w-14 h-14 mx-auto mb-4 rounded-full
                        bg-linear-to-br from-[#2B7FFF] via-[#AD46FF] to-[#00B8DB]
                        flex items-center justify-center shadow-lg shadow-blue-500/20"
        >
          <Smartphone size={22} />
        </div>

        <h2 className="text-lg font-semibold mb-1">Enter Verification Code</h2>

        <p className="text-sm text-white/60 mb-2">
          We&apos;ve sent a 6-digit code to your{" "}
          {identifier.method === "phone" ? "phone" : "email"}.
        </p>

        <p className="text-sm text-cyan-300 mb-6">
          {identifier.method === "phone" ? identifier.value : identifier.value}
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 md:w-11 md:h-12 text-center text-lg rounded-xl
                         bg-white/10 outline-none
                         focus:ring-2 focus:ring-white/40
                         transition"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          disabled={!isComplete}
          onClick={handleVerify}
          className={`w-full py-3 rounded-xl font-medium
            flex items-center justify-center gap-2 transition
            ${
              isComplete
                ? "bg-linear-to-r from-cyan-400 to-blue-500 cursor-pointer"
                : "bg-white/10 cursor-not-allowed text-white/50"
            }`}
        >
          Verify Code <ShieldCheck size={16} />
        </button>

        {/* Resend */}
        <p className="text-xs text-white/60 mt-4">
          Resend code in <span className="text-cyan-300">27s</span>
        </p>
      </div>

      <p className="absolute bottom-6 text-xs text-white/60">
        Didn&apos;t receive the code?{" "}
        <span className="text-cyan-300 cursor-pointer">Contact Support</span>
      </p>
    </AuthLayout>
  );
}
