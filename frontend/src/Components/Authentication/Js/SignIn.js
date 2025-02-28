import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Email, Lock, Login } from "@mui/icons-material"; 
import { ValidationSchema } from "../Logics/SignInLogic.js";
import "../Css/SignIn.css"

const SignIn = () => {
  return (
    <div className="signin-wrapper">
      <Card className="signin-card">
        <CardContent>
          <div className="avatar">
            <AccountCircle fontSize="large" color="primary" />
          </div>
          <Typography variant="h5" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            Welcome back! Please log in to your account
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={ValidationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Login Data", values);
              alert("Sign In Successful!");
              resetForm();
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
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
                <div className="signin-button">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Login />} 
                >
                  Sign In
                </Button>
                </div>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" align="center" className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
