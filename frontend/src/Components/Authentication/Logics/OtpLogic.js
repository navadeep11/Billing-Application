import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OtpLogic = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate=useNavigate();
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (otpValue) => setOtp(otpValue);

  // Timer countdown
  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
  }, [isResendDisabled, timer]);

  // Resend OTP
  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setTimer(60);
    setErrorMessage("");
    setSuccessMessage("A new OTP has been sent to your email.");
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setSuccessMessage("OTP Verified Successfully!");
      setTimeout(() => navigate("/signIn"), 2000);
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
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
  };
};

export default OtpLogic;
