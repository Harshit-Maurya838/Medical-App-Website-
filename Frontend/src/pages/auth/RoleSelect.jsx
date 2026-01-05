import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import {
  User,
  Stethoscope,
  Users,
  Shield,
  Check,
  ArrowRight,
  Heart,
} from "lucide-react";

const ROLES = [
  {
    id: "patient",
    title: "Patient",
    description:
      "Book appointments, consult doctors, and manage your health records",
    icon: User,
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Manage consultations, view patient records, and provide care",
    icon: Stethoscope,
  },
  {
    id: "ngo",
    title: "NGO / Organization",
    description:
      "Support patients, manage cases, and coordinate healthcare assistance",
    icon: Users,
  },
  {
    id: "admin",
    title: "Administrator",
    description:
      "Manage the platform, monitor analytics, and oversee operations",
    icon: Shield,
  },
];

export default function RoleSelect({ onNext }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const selectedRoleData = ROLES.find((r) => r.id === selectedRole);

  const handleContinue = () => {
    if (!selectedRole) {
      showError("Please select a role to continue");
      return;
    }
    onNext(selectedRole);
  };

  return (
    <AuthLayout>
      <div className="relative w-full max-w-5xl flex flex-col items-center m-8">
        <h1 className="text-2xl font-semibold mb-1">Choose Your Role</h1>
        <p className="text-white/60 mb-10 text-center">
          Select how you’ll be using HealthConnect
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative glass rounded-2xl p-6
                  transition-all duration-300
                  ${isSelected ? "ring-2 ring-cyan-400" : "hover:bg-white/20"}`}
              >
                {isSelected && (
                  <span
                    className="absolute top-4 right-4
                               flex items-center gap-1
                               bg-cyan-400 text-black
                               text-xs px-2 py-1 rounded-full"
                  >
                    <Check size={12} />
                    Selected
                  </span>
                )}

                <div className="flex flex-col items-center justify-center gap-3 mb-3">
                  <div
                    className="w-16 h-16 mx-auto mb-2 rounded-full
                        bg-linear-to-br from-[#2B7FFF] via-[#AD46FF] to-[#00B8DB]
                        flex items-center justify-center"
                  >
                    <Icon size={25} />
                  </div>

                  <h3 className="font-semibold">{role.title}</h3>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-white/60 text-center">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        <button
          disabled={!selectedRole}
          onClick={handleContinue}
          className={`mt-10 px-10 py-3 rounded-xl
            font-medium flex items-center gap-2 transition cursor-pointer
            ${
              selectedRole
                ? "bg-linear-to-r from-cyan-400 to-blue-500 hover:scale-[1.02]"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
        >
          {selectedRole
            ? `Continue as ${selectedRoleData.title}`
            : "Select a role to continue"}
          {selectedRole && <ArrowRight size={16} />}
        </button>

        <p className="text-xs text-white/40 mt-4">
          You can change your role later in account settings
        </p>
      </div>
    </AuthLayout>
  );
}
