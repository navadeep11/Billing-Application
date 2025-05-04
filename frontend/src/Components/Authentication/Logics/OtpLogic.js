import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOtpVerifyMutation, useResendOtpMutation } from "../../../App/Services/AuthenticationApi";

const OtpLogic = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Mutations
  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Timer countdown
  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
  }, [isResendDisabled, timer]);

  // Handle OTP input change
  const handleChange = (otpValue) => {
    setOtp(otpValue);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      await resendOtp({ email }).unwrap();
      setIsResendDisabled(true);
      setTimer(60);
      setErrorMessage("");
      setSuccessMessage("A new OTP has been sent to your email.");
    } catch (error) {
      setErrorMessage(error.data?.message || "Failed to resend OTP. Try again.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      await otpVerify({ email, otp }).unwrap();
      setSuccessMessage("OTP verified successfully!");
      setErrorMessage("");

      // Redirect to sign-in page after 2 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return {
    otp,
    email,
    isResendDisabled,
    timer,
    errorMessage,
    successMessage,
    handleChange,
    handleResendOtp,
    handleVerifyOtp,
    isLoading,
    isResending,
  };
};

export default OtpLogic;
