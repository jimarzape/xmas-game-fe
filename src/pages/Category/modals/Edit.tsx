import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CatEditInt, LoginInt } from "../../../interface";
import { Alert, Box, Divider, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useListCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../store/category.slice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditCategoryModal = (param: CatEditInt) => {
  const { isOpen, onClose } = param;

  const validationSchema = yup.object({
    name: yup.string().required("Category is required"),
  });

  const [errorMsg, setErrorMsg] = React.useState("");
  const [reqUpdate, resUpdate] = useUpdateCategoryMutation();
  const [reqList, resList] = useListCategoryMutation();

  const formik = useFormik({
    initialValues: {
      name: param.data.name,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = (data: any) => {
    reqUpdate({ data, id: param.data.id });
  };

  React.useEffect(() => {
    if (resUpdate.isError) {
      const error: any = resUpdate.error;
      setErrorMsg(error?.data?.error?.message);
    }
  }, [resUpdate.isError]);

  React.useEffect(() => {
    if (resUpdate.isSuccess) {
      reqList({});
      onClose();
    }
  }, [resUpdate.isSuccess]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Category
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
                label="Category Name"
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
            {resUpdate.isError && (
              <Box>
                <Alert severity="error">{errorMsg}</Alert>
              </Box>
            )}

            <Box gap="50" textAlign="right">
              <LoadingButton
                loading={resUpdate.isLoading}
                type="button"
                variant="outlined"
                sx={{ mt: 3, mb: 2, mr: 2 }}
                onClick={onClose}
              >
                Close
              </LoadingButton>
              <LoadingButton
                loading={resUpdate.isLoading}
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

export default EditCategoryModal;
