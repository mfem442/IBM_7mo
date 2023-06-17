import { useEffect, useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/ibm-building.jpg";

require('dotenv').config();
import axios from 'axios';

function Login() {
  const BASE_URL = process.env.BASE_URL || "";
  const navigate = useNavigate();


  // api call
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  })

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMsg: "",
  })

  const handleChange = (fieldName) => (event) => {
    setValues({...values, [fieldName]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    axios.post(`${BASE_URL}/api/user/signin`, {
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        alert("¡Login Exitoso!");
        navigate("/dashboard");
      })
    }).catch(error => {
        alert("Error con el Login");
        setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
    })

      setValues({
        email: "",
        password: "",
        showPassword: false,
      })
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" value={values.email} onChange={handleChange('email')} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" value={values.password} onChange={handleChange('password')} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" type="submit" disabled={errors.email || errors.password} fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
