import { useState } from "react";
import { Globe, Check, ChevronRight } from "lucide-react";
import AuthLayout from "../../components/layout/AuthLayout";

const LANGUAGES = [
  { code: "en", name: "English", native: "English", flag: "/auth/flags/us.png" },
  { code: "es", name: "Spanish", native: "Español", flag: "/auth/flags/es.png" },
  { code: "fr", name: "French", native: "Français", flag: "/auth/flags/fr.png" },
  { code: "de", name: "German", native: "Deutsch", flag: "/auth/flags/de.png" },
  { code: "zh", name: "Chinese", native: "中文", flag: "/auth/flags/cn.png" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "/auth/flags/sa.png" },
  { code: "hi", name: "Hindi", native: "हिंदी", flag: "/auth/flags/in.png" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "/auth/flags/pt.png" },
  { code: "ru", name: "Russian", native: "Русский", flag: "/auth/flags/ru.png" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "/auth/flags/jp.png" },
  { code: "ko", name: "Korean", native: "한국어", flag: "/auth/flags/kr.png" },
  { code: "it", name: "Italian", native: "Italiano", flag: "/auth/flags/it.png" },
];

export default function Language({ onNext }) {
  const [selected, setSelected] = useState("en");

  return (
    <AuthLayout>
      <div className="relative w-full max-w-5xl flex flex-col items-center">

        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl
                          flex items-center justify-center shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-1">
          Welcome to HealthConnect
        </h1>
        <p className="text-white/70 mb-10">
          Select your preferred language
        </p>

        {/* Language Grid */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {LANGUAGES.map((lang) => {
            const isActive = selected === lang.code;

            return (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`relative glass rounded-xl px-4 py-3
                  flex items-center gap-3 transition-all
                  ${isActive ? "ring-2 ring-cyan-300" : "hover:bg-white/20"}`}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-8 h-8 rounded"
                />

                <div className="text-left">
                  <p className="text-sm font-medium">{lang.name}</p>
                  <p className="text-xs text-white/60">{lang.native}</p>
                </div>

                {isActive && (
                  <span className="absolute top-2 right-2 bg-cyan-400
                                   text-black rounded-full p-1">
                    <Check size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-white/50 mt-8">
          You can change this anytime in settings
        </p>

        <button
        onClick={() => onNext(selected)}
          className="absolute right-0 bottom-0 translate-x-16 translate-y-6
                     w-12 h-12 rounded-full bg-cyan-400
                     flex items-center justify-center
                     shadow-lg hover:scale-105 transition"
        >
          <ChevronRight className="text-black" />
        </button>
      </div>
    </AuthLayout>
  );
}
