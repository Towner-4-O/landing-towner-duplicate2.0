"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import DriverSignup from "@/app/_components/layout/auth-driver/DriverSignup";
import VerifyNumber from "@/app/_components/layout/auth-rider/VerifyNumber";
import CompanyPhoneCheck from "./CompanyPhoneCheck";
import InactiveDriverJoin from "./InactiveDriverJoin";
import type { DriverValidationResult, SignupFlow } from "./types";

const CompanySignupClient = () => {
  const params = useParams();
  const businessId = params.id as string;

  const [flow, setFlow] = useState<SignupFlow>("phone-check");
  const [phone, setPhone] = useState("");
  const [driverPreview, setDriverPreview] =
    useState<DriverValidationResult | null>(null);
  const [verifiedOTP, setVerifiedOTP] = useState("");

  const resetToPhoneCheck = () => {
    setFlow("phone-check");
    setPhone("");
    setDriverPreview(null);
    setVerifiedOTP("");
  };

  const handleInactiveDriverFound = (
    phoneNumber: string,
    preview: DriverValidationResult,
  ) => {
    setPhone(phoneNumber);
    setDriverPreview(preview);
    setFlow("inactive-join");
  };

  const handleNewDriver = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setFlow("new-signup");
  };

  const handleVerificationSuccess = (
    verifiedPhone: string,
    otp: string,
  ) => {
    setPhone(verifiedPhone);
    setVerifiedOTP(otp);
    setFlow("signup-form");
  };

  if (flow === "phone-check") {
    return (
      <CompanyPhoneCheck
        businessId={businessId}
        onInactiveDriverFound={handleInactiveDriverFound}
        onNewDriver={handleNewDriver}
      />
    );
  }

  if (flow === "inactive-join" && driverPreview) {
    return (
      <InactiveDriverJoin
        businessId={businessId}
        phoneNumber={phone}
        driverPreview={driverPreview}
        onBack={resetToPhoneCheck}
      />
    );
  }

  if (flow === "new-signup") {
    return (
      <VerifyNumber
        color="#A8FF01"
        text="black"
        initialPhone={phone}
        autoSendOtp
        onVerificationSuccess={handleVerificationSuccess}
      />
    );
  }

  return (
    <DriverSignup
      verifiedPhone={phone}
      verifiedOTP={verifiedOTP}
      businessIdFromPath={businessId}
    />
  );
};

export default CompanySignupClient;
