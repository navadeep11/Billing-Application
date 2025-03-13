import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import { AccountCircle, Email, Lock, Person, Login } from "@mui/icons-material";
import { validationSchema } from "../Logics/SignUpLogic.js";
import "../Css/SignUp.css";
import { useSignUpMutation } from "../../../App/Services/AuthenticationApi.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await signUp(values).unwrap();
      console.log("Response", response);

      if (response.success) {
        alert("Sign Up Successful!");
        navigate(`/otp:${values.email}`);
        resetForm();
      }
    } catch (error) {
      console.error("Error", error);
      alert(error?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-wrapper">
      <Card className="signup-card">
        <CardContent>
          <div className="avatar">
            <AccountCircle fontSize="large" color="primary" />
          </div>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            Create your account
          </Typography>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="signup-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Login />}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" align="center" className="signin-link">
            Already have an account? <a href="/signin">Sign In</a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
