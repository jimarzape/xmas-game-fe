import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { LoginInt, ModalInt } from "../../../interface";
import { Alert, Box, Divider, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useCreateFamilyMutation,
  useListFamilyMutation,
} from "../../../store/family.slice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddFamilyModal = (param: ModalInt) => {
  const { isOpen, onClose } = param;

  const validationSchema = yup.object({
    name: yup.string().required("Family Group is required"),
  });

  const [errorMsg, setErrorMsg] = React.useState("");
  const [reqCreate, resCreate] = useCreateFamilyMutation();
  const [reqList, resList] = useListFamilyMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = (data: any) => {
    reqCreate(data);
  };

  React.useEffect(() => {
    if (resCreate.isError) {
      const error: any = resCreate.error;
      setErrorMsg(error?.data?.error?.message);
    }
  }, [resCreate.isError]);

  React.useEffect(() => {
    if (resCreate.isSuccess) {
      reqList({});
      onClose();
    }
  }, [resCreate.isSuccess]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Family Group
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
                label="Family Group"
                required
                type="text"
                id="name"
                name="name"
                fullWidth
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onChange={formik.handleChange}
              />
            </Box>

            <Divider />
            {resCreate.isError && (
              <Box>
                <Alert severity="error">{errorMsg}</Alert>
              </Box>
            )}

            <Box gap="50" textAlign="right">
              <LoadingButton
                loading={resCreate.isLoading}
                type="button"
                variant="outlined"
                sx={{ mt: 3, mb: 2, mr: 2 }}
                onClick={onClose}
              >
                Close
              </LoadingButton>
              <LoadingButton
                loading={resCreate.isLoading}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default AddFamilyModal;
