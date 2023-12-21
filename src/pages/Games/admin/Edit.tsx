import React, { useEffect, useState } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useUpdateGameMutation } from "../../../store/game.slice";
import YouTubeVideoPlayer from "./YouTubeVideoPlayer";
import extractYouTubeID from "../../../utils/ytIdExtractor";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditGame = () => {
  const params = useParams();
  const [ytId, setYtId] = useState<string | null>(null);
  const [reqUpdate, resUpdate] = useUpdateGameMutation();
  const navigate = useNavigate();
  const { gameData } = useSelector((state: any) => state.games);

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    participants: yup.number().min(1).required("Participant is required"),
    teams: yup.number().min(1).required("Team is required"),
    link: yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      title: gameData?.title || "",
      participants: gameData?.participants || 0,
      teams: gameData?.teams || 0,
      link: gameData?.link || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = async (data: any) => {
    reqUpdate({ data, id: params.gameId });
  };

  const linkChange = (link: any) => {
    const id = extractYouTubeID(link);
    setYtId(id);
  };

  useEffect(() => {
    if (gameData?.link) {
      const id = extractYouTubeID(gameData.link);
      setYtId(id);
    }
  }, [gameData]);

  useEffect(() => {
    if (resUpdate.isSuccess) {
      navigate("/settings/games");
    }
  }, [resUpdate.isSuccess]);

  return (
    <Container style={{ width: "70%", margin: "auto" }}>
      <Container
        style={{
          height: "80vh",
        }}
        className="container-game"
      >
        <Box sx={{ textAlign: "left", p: 4 }} width="100%">
          <Typography variant="h5" component="h5">
            Add new game
          </Typography>
        </Box>

        <Box
          sx={{ textAlign: "center", p: 4 }}
          width="100%"
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Grid container spacing={2} justifyContent="center" sx={{ gap: 5 }}>
            <Grid item xs={6} md={6}>
              <Container>
                <Box mb="32px">
                  <TextField
                    label="Title"
                    required
                    type="text"
                    id="title"
                    name="title"
                    fullWidth
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    // helperText={formik.touched.title && formik.errors.title}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box mb="32px">
                  <TextField
                    label="Number of teams"
                    required
                    type="number"
                    id="teams"
                    name="teams"
                    fullWidth
                    value={formik.values.teams}
                    onBlur={formik.handleBlur}
                    error={formik.touched.teams && Boolean(formik.errors.teams)}
                    // helperText={formik.touched.teams && formik.errors.teams}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box mb="32px">
                  <TextField
                    label="Number of participant per team"
                    required
                    type="number"
                    id="participants"
                    name="participants"
                    fullWidth
                    value={formik.values.participants}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.participants &&
                      Boolean(formik.errors.participants)
                    }
                    // helperText={
                    //   formik.touched.title && formik.errors.participants
                    // }
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box mb="32px">
                  <TextField
                    label="Video YT URL"
                    type="lnk"
                    id="link"
                    name="link"
                    fullWidth
                    value={formik.values.link}
                    onBlur={formik.handleBlur}
                    error={formik.touched.link && Boolean(formik.errors.link)}
                    // helperText={formik.touched.link && formik.errors.link}
                    onChange={(e) => {
                      formik.handleChange(e); // Formik handles the change
                      linkChange(e.target.value); // Your custom function, ensure it's defined and in scope
                    }}
                  />
                </Box>
              </Container>
            </Grid>
            <Grid>
              <Container>
                <Box>{ytId && <YouTubeVideoPlayer videoId={ytId} />}</Box>
              </Container>
            </Grid>
          </Grid>
          <Box gap="50" textAlign="right">
            <LoadingButton
              disabled={resUpdate.isLoading}
              type="button"
              variant="outlined"
              sx={{ mt: 3, mb: 2, mr: 2 }}
              href="/settings/games"
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={resUpdate.isLoading}
              disabled={resUpdate.isLoading}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default EditGame;
