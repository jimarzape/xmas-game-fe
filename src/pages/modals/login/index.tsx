import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { LoginInt } from "../../../interface";
import { Alert, Box, Divider, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLoginAuthMutation } from "../../../store/auth.slice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const LoginModal = (param: LoginInt) => {
  const { isOpen, onClose } = param;

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const [reqLogin, resLogin] = useLoginAuthMutation();
  const [errorMsg, setErrorMsg] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = (data: any) => {
    reqLogin(data);
  };

  React.useEffect(() => {
    if (resLogin.isError) {
      const error: any = resLogin.error;
      setErrorMsg(error?.data?.error?.message);
    }
  }, [resLogin.isError]);

  React.useEffect(() => {
    if (resLogin.isSuccess) {
      onClose();
    }
  }, [resLogin.isSuccess]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          textAlign="center"
        >
          Login
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box
            component="form"
            noValidate
            columnGap="2"
            width="400px"
            onSubmit={formik.handleSubmit}
          >
            <Box mb="32px">
              <TextField
                label="Email"
                required
                autoComplete="email"
                type="email"
                id="email"
                name="email"
                fullWidth
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
            </Box>
            <Box mb="32px">
              <TextField
                label="Passowrd"
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                fullWidth
                value={formik.values.password}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
              />
            </Box>
            <Divider />
            {resLogin.isError && (
              <Box>
                <Alert severity="error">{errorMsg}</Alert>
              </Box>
            )}

            <Box>
              <LoadingButton
                loading={resLogin.isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus variant="contained" onClick={onClose}>
            Login
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default LoginModal;
