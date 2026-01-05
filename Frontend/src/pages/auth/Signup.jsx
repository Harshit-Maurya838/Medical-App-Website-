import AuthLayout from "../../components/layout/AuthLayout";
import { Phone, Mail, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { showError } from "../../utils/toast";
import {
  isValidEmail,
  isValidPhone,
  isValidName,
} from "../../utils/validators";

export default function Signup({ onNext, onBack }) {
  const [method, setMethod] = useState("phone");
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setIdentifier("");
  };

  const handleContinue = () => {
    if (!isValidName(fullName)) {
      showError("Please enter your full name");
      return;
    }

    if (method === "phone" && !isValidPhone(identifier)) {
      showError("Please enter a valid phone number");
      return;
    }

    if (method === "email" && !isValidEmail(identifier)) {
      showError("Please enter a valid email address");
      return;
    }

    onNext({
      name: fullName,
      method,
      value: identifier,
    });
  };

  return (
    <AuthLayout>
      <div className="glass rounded-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-semibold mb-1">Create Account</h2>
        <p className="text-sm text-white/60 mb-6">
          Sign up to get started with HealthConnect
        </p>

        <div className="mb-4">
          <label className="text-xs text-white/60 mb-1 block">Full Name</label>
          <div
            className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-3
                          focus-within:ring-2 focus-within:ring-white/40"
          >
            <User size={16} className="text-white/60" />
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        <div className="relative mb-4 bg-white/10 rounded-xl p-1 flex">
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
          disabled={!fullName || !identifier}
          onClick={handleContinue}
          className={`w-full py-3 rounded-xl
            bg-linear-to-r from-[#2B7FFF] to-[#00B8DB]
            font-medium flex items-center justify-center gap-2 transition
            ${
              !fullName || !identifier
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-[1.02]"
            }`}
        >
          Continue <ArrowRight size={16} />
        </button>

        <p className="text-xs text-white/50 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={onBack}
            className="text-[#53EAFD] underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </AuthLayout>
  );
}
