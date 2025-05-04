import React from "react";
import "../Css/Otp.css";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import OtpInput from "react-otp-input";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimerIcon from "@mui/icons-material/Timer";
import useOtpLogic from "../Logics/OtpLogic.js";

const Otp = () => {
  

  const {
    otp,
    isResendDisabled,
    timer,
    errorMessage,
    successMessage,
    handleChange,
    handleResendOtp,
    handleVerifyOtp,
    email
  } = useOtpLogic();

  return (
    <Container className="otp-container">
      <Box className="otp-box">
        <IconButton color="primary" className="icon">
          <EmailIcon className="email-icon" />
        </IconButton>

        <Typography variant="h5" className="title">
          OTP Verification
        </Typography>

        <Typography variant="body2" className="subtitle">
          A One-Time Password (OTP) has been sent to <strong>{email}</strong>. 
          Please enter the OTP to verify your account.
        </Typography>

        <Typography variant="caption" className="timer-text">
          <TimerIcon fontSize="small" className="timer-icon" />
          Valid for 5 minutes only
        </Typography>

        {errorMessage && <Alert severity="error" className="alert-message">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" className="alert-message">{successMessage}</Alert>}

        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          renderSeparator={<span>-</span>}
          isInputNum
          inputStyle="otp-input"
          renderInput={(props) => <input {...props} />}
        />

        <Box className="button-container">
          <Button
            fullWidth
            variant="contained"
            startIcon={<CheckCircleIcon />}
            onClick={handleVerifyOtp}
          >
            Verify
          </Button>
          <Button
            fullWidth
            variant="outlined"
            disabled={isResendDisabled}
            onClick={handleResendOtp}
          >
            {isResendDisabled ? `Resend in ${timer}s` : "Resend"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Otp;
