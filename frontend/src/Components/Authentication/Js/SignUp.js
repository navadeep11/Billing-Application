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
import { AccountCircle, Email, Lock, Person, Login  } from "@mui/icons-material";
import {validationSchema} from "../Logics/SignUpLogic.js";
import "../Css/SignUp.css"

const SignUp = () => {
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
              onSubmit={(values, { resetForm }) => {
                console.log("Form Data", values);
                alert("Sign Up Successful!");
                resetForm();
              }}
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
                  >
                    Sign Up
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