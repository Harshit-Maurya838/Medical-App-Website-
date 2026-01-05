import { useState } from "react";

import Language from "./Language";
import Login from "./Login";
import Signup from "./Signup";
import OTP from "./OTP";
import RoleSelect from "./RoleSelect";
import Success from "./Success";

export default function AuthFlow() {
  const [step, setStep] = useState("language");
  const [authData, setAuthData] = useState({});

  const next = (nextStep, data = {}) => {
    setAuthData((prev) => ({ ...prev, ...data }));
    setStep(nextStep);
  };

  switch (step) {
    case "language":
      return <Language onNext={() => next("login")} />;

    case "login":
      return (
        <Login
          onNext={(data) =>
            data?.goToSignup
              ? setStep("signup")
              : next("otp", { identifier: data })
          }
        />
      );

    case "signup":
      return (
        <Signup
          onBack={() => setStep("login")}
          onNext={(data) => next("otp", { identifier: data })}
        />
      );

    case "otp":
      return (
        <OTP
          identifier={authData.identifier}
          onVerified={() => next("role")}
          onBack={() => setStep("login")}
        />
      );

    case "role":
      return (
        <RoleSelect
          onNext={(role) => next("success", { role })}
        />
      );

    case "success":
      return <Success role={authData.role} />;

    default:
      return null;
  }
}
