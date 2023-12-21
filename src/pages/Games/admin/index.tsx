import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddGameModal from "./Add";
import {
  setGames,
  useDelGameMutation,
  useListGameMutation,
} from "../../../store/game.slice";
import { Link, useNavigate } from "react-router-dom";

const GameAdmin = () => {
  const [dense, setDense] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reqList, resList] = useListGameMutation();
  const [reqDel, resDel] = useDelGameMutation();
  const { gamelist } = useSelector((state: any) => state.games);

  const delAdmin = (data: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${data?.title}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        reqDel({ id: data.id });
      }
    });
  };

  const editGame = async (data: any) => {
    await dispatch(setGames({ gameData: data }));
    navigate(`/settings/games/edit/${data.id}`);
  };

  useEffect(() => {
    reqList({});
  }, [resDel.isSuccess]);

  return (
    <Container style={{ width: "80%", margin: "auto", marginBottom: "5em" }}>
      <Box width="100%" mt="50px">
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Game Name</TableCell>
                  <TableCell>Teams / Participants</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="Add Category"
                      href="/settings/games/add"
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gamelist.map((item: any) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{`${item.teams} / ${item.participants}`}</TableCell>
                      <TableCell>
                        <Link to={item.link} target="_blank">
                          {item.link}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          aria-label="delete"
                          onClick={() => delAdmin(item)}
                        >
                          <Delete fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          size="small"
                          aria-label="edit"
                          onClick={() => editGame(item)}
                        >
                          <Edit fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default GameAdmin;
