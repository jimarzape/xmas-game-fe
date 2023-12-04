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
import AddCategoryModal from "./modals/Add";
import {
  useDeleteCategoryMutation,
  useListCategoryMutation,
} from "../../store/category.slice";
import { useSelector } from "react-redux";
import EditCategoryModal from "./modals/Edit";
import { CatDataInt } from "../../interface";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Category = () => {
  const [dense, setDense] = React.useState(true);
  const [isOpenAdd, setIsOpenADD] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [reqList, resList] = useListCategoryMutation();
  const { categorylist } = useSelector((state: any) => state.category);
  const [categoryData, setCategoryData] = useState<CatDataInt>({
    name: "",
    id: 0,
  });
  const [reqDel, resDel] = useDeleteCategoryMutation();

  const closeAdd = () => {
    setIsOpenADD(false);
  };

  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  const editCat = (data: any) => {
    setCategoryData({
      name: data?.name,
      id: Number(data?.id),
    });
    setIsOpenEdit(true);
  };

  const delCat = (data: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${data?.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        reqDel({ id: data?.id })
          .then((res) => {
            Swal.fire("Deleted!", `${data?.name} has been deleted.`, "success");
            reqList({});
          })
          .catch((e) => {});
      }
    });
  };

  useEffect(() => {
    reqList({});
  }, []);

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
              <TableBody>
                {categorylist?.map((item: any) => {
                  return (
                    <TableRow key={item?.id}>
                      <TableCell>{item?.name}</TableCell>
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
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      {isOpenAdd && <AddCategoryModal isOpen={isOpenAdd} onClose={closeAdd} />}
      {isOpenEdit && (
        <EditCategoryModal
          isOpen={isOpenEdit}
          onClose={closeEdit}
          data={categoryData}
        />
      )}
    </Container>
  );
};

export default Category;
