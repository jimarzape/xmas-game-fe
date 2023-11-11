import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { categoryDataInt, familyDataInt, ModalInt } from "../../../interface";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import Profile from "../../../assets/images/profile.jpeg";
import "../../../assets/css/image-profile.css";
import { CloudUpload } from "@mui/icons-material";
import {
  useCreatePeopleMutation,
  useListPeopleMutation,
} from "../../../store/people.slice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "unset",
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPeopleModal = (param: ModalInt) => {
  const { isOpen, onClose } = param;

  const [errorMsg, setErrorMsg] = React.useState("");
  const [reqCreate, resCreate] = useCreatePeopleMutation();
  const [reqList, resList] = useListPeopleMutation();
  const { familyList } = useSelector((state: any) => state.family);
  const { categorylist } = useSelector((state: any) => state.category);
  const [profileSrc, setProfileSrc] = React.useState<string | null>(Profile);

  const convertToBase64 = (
    file: File,
    callback: (result: string | null) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (Profile) {
      fetch(Profile)
        .then((res) => res.blob())
        .then((blob) => {
          convertToBase64(blob as File, (base64String) => {
            setProfileSrc(base64String);
          });
        })
        .catch((error) => {
          console.error("Error converting default image to base64:", error);
        });
    }
  }, [Profile]);

  const validationSchema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    age: yup.number().required("Age is required"),
    gender: yup.string().required("Gender is required"),
    family_id: yup.number().required("Family group is required"),
    category_id: yup.number().required("Category is required"),
    avatar: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      age: 0,
      gender: "Male",
      category_id: 0,
      family_id: 0,
      avatar: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = (data: any) => {
    const formData = { ...data, avatar: profileSrc };
    reqCreate(formData);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (result && typeof result === "string") {
          setProfileSrc(result);
          formik.setFieldValue("avatar", result); // Update the formik value for avatar
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Person
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
            onSubmit={formik.handleSubmit}
            width="800px"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box mb="32px">
                  <TextField
                    label="First Name"
                    required
                    type="text"
                    id="first_name"
                    name="first_name"
                    fullWidth
                    value={formik.values.first_name}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
                    }
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box mb="32px">
                  <TextField
                    label="Last Name"
                    required
                    type="text"
                    id="last_name"
                    name="last_name"
                    fullWidth
                    value={formik.values.last_name}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box mb="32px">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Age"
                        type="number"
                        id="age"
                        name="age"
                        value={formik.values.age}
                        onBlur={formik.handleBlur}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={
                          formik.touched.last_name && formik.errors.age
                        }
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="gender-select">Gender</InputLabel>
                        <Select
                          labelId="gender-select"
                          id="gender"
                          name="gender"
                          value={formik.values.gender}
                          onBlur={formik.handleBlur}
                          onChange={(e: SelectChangeEvent) => {
                            formik.setFieldValue("gender", e.target.value);
                          }}
                          required
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box mb="32px">
                  <FormControl fullWidth>
                    <InputLabel id="family-select">Family Group</InputLabel>
                    <Select
                      labelId="family-select"
                      id="family_id"
                      name="family_id"
                      value={formik.values.family_id.toString()}
                      onBlur={formik.handleBlur}
                      onChange={(e: SelectChangeEvent) => {
                        formik.setFieldValue(
                          "family_id",
                          Number(e.target.value)
                        );
                      }}
                      required
                    >
                      {familyList?.map((item: familyDataInt) => {
                        return <MenuItem value={item.id}>{item.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box mb="32px">
                  <FormControl fullWidth>
                    <InputLabel id="category-select">Category Group</InputLabel>
                    <Select
                      labelId="category-select"
                      id="category_id"
                      name="category_id"
                      value={formik.values.category_id.toString()}
                      onBlur={formik.handleBlur}
                      onChange={(e: SelectChangeEvent) => {
                        formik.setFieldValue(
                          "category_id",
                          Number(e.target.value)
                        );
                      }}
                      required
                    >
                      {categorylist?.map((item: categoryDataInt) => {
                        return <MenuItem value={item.id}>{item.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Box mb="32px">
                  {profileSrc && typeof profileSrc === "string" && (
                    <img src={profileSrc} className="image-profile" />
                  )}
                </Box>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
            </Grid>

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

export default AddPeopleModal;
