import AuthLayout from "../../components/layout/AuthLayout";
import { Check } from "lucide-react";

export default function Success({ role = "Patient" }) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center">

        <div className="w-16 h-16 rounded-full
                        bg-white/20 backdrop-blur-md
                        flex items-center justify-center mb-6
                        shadow-lg">
          <Check className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          Welcome to HealthConnect!
        </h1>

        <p className="text-white/70 mb-8">
          Your account as <span className="font-medium">{role}</span> is ready.
        </p>

        <button
          className="px-8 py-3 rounded-xl
                     bg-linear-to-r from-cyan-400 to-blue-500
                     font-medium shadow-lg
                     hover:scale-[1.03] transition cursor-pointer"
        >
          Go to Dashboard
        </button>
      </div>
    </AuthLayout>
  );
}
