import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PeopleEditInt, peopleDataInt } from "../../interface";
import {
  useDeletePeopleMutation,
  useListPeopleMutation,
} from "../../store/people.slice";
import AddPeopleModal from "./modals/Add";
import { useListFamilyMutation } from "../../store/family.slice";
import { useListCategoryMutation } from "../../store/category.slice";
import EditPeopleModal from "./modals/Edit";

const People = () => {
  const [dense, setDense] = React.useState(true);
  const [isOpenAdd, setIsOpenADD] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [reqList, resList] = useListPeopleMutation();
  const [reqFamList, resFamList] = useListFamilyMutation();
  const [reqCategoryList, resCategoryList] = useListCategoryMutation();
  const { peopleList } = useSelector((state: any) => state.people);
  const [peopleData, setPeopleData] = useState<peopleDataInt>({
    id: 0,
    first_name: "",
    last_name: "",
    family: null,
    category: null,
    gender: "",
    age: 0,
    avatar: "",
  });
  const [reqDel, resDel] = useDeletePeopleMutation();

  const closeAdd = () => {
    setIsOpenADD(false);
  };

  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  const editCat = (data: peopleDataInt) => {
    setPeopleData(data);
    setIsOpenEdit(true);
  };

  const delCat = (data: peopleDataInt) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${data?.first_name} ${data?.last_name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        reqDel({ id: data?.id })
          .then((res) => {
            Swal.fire(
              "Deleted!",
              `${data?.first_name} ${data?.last_name} has been deleted.`,
              "success"
            );
            reqList({});
          })
          .catch((e) => {});
      }
    });
  };

  useEffect(() => {
    const load = async () => {
      await reqList({});
      await reqFamList({});
      await reqCategoryList({});
    };
    load();
  }, []);

  return (
    <Container>
      <Box width="100%" mt="50px">
        <Box width="100%"></Box>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Family</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="Add Category"
                      onClick={() => setIsOpenADD(true)}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              {peopleList?.map((item: peopleDataInt) => {
                return (
                  <TableRow key={item?.id}>
                    <TableCell padding="none" align="center">
                      <img
                        src={item?.avatar}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {item?.first_name} {item?.last_name}
                      </Typography>
                      <Typography>
                        {item?.age} - {item?.gender}
                      </Typography>
                    </TableCell>
                    <TableCell>{item?.family?.name}</TableCell>
                    <TableCell>{item?.category?.name}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        aria-label="delete"
                        onClick={() => delCat(item)}
                      >
                        <Delete fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        onClick={() => editCat(item)}
                      >
                        <Edit fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      {isOpenAdd && <AddPeopleModal isOpen={isOpenAdd} onClose={closeAdd} />}
      {isOpenEdit && (
        <EditPeopleModal
          isOpen={isOpenEdit}
          onClose={closeEdit}
          data={peopleData}
        />
      )}
    </Container>
  );
};

export default People;
