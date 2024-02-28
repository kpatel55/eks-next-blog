import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

type FormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const router = useRouter();
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      company: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async () => {
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          companyName: formik.values.company,
          email: formik.values.email,
          message: formik.values.message,
        }),
      };
      fetch("/api/contact", params).then((res) => res.json());
      router.push("/");
    },
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      <Container maxWidth="sm" sx={{ bgcolor: "background.paper", pb: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" color="primary.dark">
              Contact me
            </Typography>
            <Typography variant="h6" color="primary.dark" py="1rem">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Typography>
          </Box>
          <Box
            width="100%"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              color="secondary"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.firstName && formik.errors.firstName}
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              sx={{ width: "45%" }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              variant="outlined"
              color="secondary"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.lastName && formik.errors.lastName}
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              sx={{ width: "45%" }}
            />
          </Box>
          <TextField
            fullWidth
            label="Company"
            name="company"
            variant="outlined"
            color="secondary"
            margin="normal"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.company && formik.errors.company}
            error={Boolean(formik.touched.company && formik.errors.company)}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            color="secondary"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message"
            name="message"
            variant="outlined"
            color="secondary"
            margin="normal"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Box sx={{ pt: 3 }}>
            <Button
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
              sx={{
                bgcolor: "rgb(71 71 71)",
                py: "1rem",
                "&:hover": {
                  bgcolor: "rgb(0, 0, 0)",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};
