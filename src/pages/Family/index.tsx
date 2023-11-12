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
import { useSelector } from "react-redux";
import { FamDataInt } from "../../interface";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useDeleteFamilyMutation,
  useListFamilyMutation,
} from "../../store/family.slice";
import AddFamilyModal from "./modals/Add";
import EditFamilyModal from "./modals/Edit";

const FamilyGroup = () => {
  const [dense, setDense] = React.useState(true);
  const [isOpenAdd, setIsOpenADD] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [reqList, resList] = useListFamilyMutation();
  const { familyList } = useSelector((state: any) => state.family);
  const [familyData, setFamilyData] = useState<FamDataInt>({
    name: "",
    id: 0,
  });
  const [reqDel, resDel] = useDeleteFamilyMutation();

  const closeAdd = () => {
    setIsOpenADD(false);
  };

  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  const editCat = (data: any) => {
    setFamilyData({
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
    <Container>
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
                  <TableCell>Family</TableCell>
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
                {familyList?.map((item: FamDataInt) => {
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
      {isOpenAdd && <AddFamilyModal isOpen={isOpenAdd} onClose={closeAdd} />}
      {isOpenEdit && (
        <EditFamilyModal
          isOpen={isOpenEdit}
          onClose={closeEdit}
          data={familyData}
        />
      )}
    </Container>
  );
};

export default FamilyGroup;
