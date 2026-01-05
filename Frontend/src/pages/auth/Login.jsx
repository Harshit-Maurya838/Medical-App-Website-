import AuthLayout from "../../components/layout/AuthLayout";
import {
  Phone,
  Mail,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { showError } from "../../utils/toast";
import { isValidEmail, isValidPhone } from "../../utils/validators";

export default function Login({ onNext, onBack }) {
  const [method, setMethod] = useState("phone");
  const [identifier, setIdentifier] = useState("");

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setIdentifier("");
  };

  const handleContinue = () => {
    if (method === "phone" && !isValidPhone(identifier)) {
      showError("Please enter a valid phone number");
      return;
    }

    if (method === "email" && !isValidEmail(identifier)) {
      showError("Please enter a valid email address");
      return;
    }

    onNext({ method, value: identifier });
  };

  return (
    <AuthLayout>
      <div className="glass rounded-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 m-4">
        {/* Left Section */}
        <div className="relative p-10 flex flex-col">
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, rgba(28,57,142,0.7), rgba(89,22,139,0.6), rgba(16,78,100,0.7)),
                url('/auth/images/doctor.jpg') center / cover
              `,
            }}
          />

          <div className="relative flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold leading-tight">
              Your Health,
              <br />
              <span className="text-[#53EAFD]">Our Priority</span>
            </h2>

            <p className="text-sm text-white/80 mt-4 max-w-sm">
              Access world-class healthcare from the comfort of your home.
              Connect with top doctors, manage appointments, and track your
              health journey — all in one place.
            </p>
          </div>

          <div className="relative flex gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="w-5 h-5 text-cyan-200" />
              <div>
                <p className="font-medium">Secure</p>
                <p className="text-xs text-white/70">256-bit Encryption</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <HeartHandshake className="w-5 h-5 text-cyan-200" />
              <div>
                <p className="font-medium">Trusted</p>
                <p className="text-xs text-white/70">10K+ Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-1">Welcome Back</h2>
          <p className="text-sm text-white/60 mb-6">
            Sign in to continue to HealthConnect
          </p>
          <div className="relative mb-6 bg-white/10 rounded-xl p-1 flex">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-lg
                bg-linear-to-r from-[#2B7FFF] to-[#00B8DB]
                transition-all duration-300
                ${method === "phone" ? "left-1" : "left-1/2"}`}
            />

            <button
              onClick={() => handleMethodChange("phone")}
              className="relative z-10 flex-1 py-2 flex items-center justify-center gap-2 text-sm"
            >
              <Phone size={16} /> Phone
            </button>

            <button
              onClick={() => handleMethodChange("email")}
              className="relative z-10 flex-1 py-2 flex items-center justify-center gap-2 text-sm"
            >
              <Mail size={16} /> Email
            </button>
          </div>
          <div className="mb-6">
            <label className="text-xs text-white/60 mb-1 block">
              {method === "phone" ? "Phone Number" : "Email Address"}
            </label>

            <div
              className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-3
                         focus-within:ring-2 focus-within:ring-white/40"
            >
              {method === "phone" ? (
                <Phone size={16} className="text-white/60" />
              ) : (
                <Mail size={16} className="text-white/60" />
              )}

              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  method === "phone" ? "+1 (555) 123-4567" : "you@example.com"
                }
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>
          <button
            disabled={!identifier}
            onClick={handleContinue}
            className={`w-full py-3 rounded-xl
              bg-linear-to-r from-[#2B7FFF] to-[#00B8DB]
              font-medium flex items-center justify-center gap-2
              transition
              ${
                !identifier
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-[1.02]"
              }`}
          >
            Continue <ArrowRight size={16} />
          </button>
          <p className="text-xs text-white/50 text-center mt-4">
            By continuing, you agree to our{" "}
            <span className="text-[#53EAFD] underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#53EAFD] underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
          <div className="flex items-center my-4 gap-2 text-white/40 text-xs">
            {" "}
            <div className="flex-1 h-px bg-white/10" /> or{" "}
            <div className="flex-1 h-px bg-white/10" />{" "}
          </div>{" "}
          <p className="text-sm text-center text-white/70">
            {" "}
            Don&apos;t have an account?{" "}
            <span
              onClick={() => onNext({ goToSignup: true })}
              className="text-cyan-300 cursor-pointer"
            >
              Sign up
            </span>{" "}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
