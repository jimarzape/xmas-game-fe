import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  PeopleEditInt,
  categoryDataInt,
  familyDataInt,
  peopleDataInt,
} from "../../interface";
import {
  peoples,
  useDeletePeopleMutation,
  useListPeopleMutation,
  useSetExcludedMutation,
} from "../../store/people.slice";
import AddPeopleModal from "./modals/Add";
import { useListFamilyMutation } from "../../store/family.slice";
import { useListCategoryMutation } from "../../store/category.slice";
import EditPeopleModal from "./modals/Edit";
import calculatePageCount from "../../utils/calculatePageCount";

const People = () => {
  const disptach = useDispatch();
  const [dense, setDense] = React.useState(true);
  const [isOpenAdd, setIsOpenADD] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [reqList, resList] = useListPeopleMutation();
  const [reqFamList, resFamList] = useListFamilyMutation();
  const [reqCategoryList, resCategoryList] = useListCategoryMutation();
  const [reqExclude, resExclude] = useSetExcludedMutation();
  const { peopleList, peoplePage, peopleBtnPage } = useSelector(
    (state: any) => state.people
  );
  const { categorylist } = useSelector((state: any) => state.category);
  const { familyList } = useSelector((state: any) => state.family);

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
          .then(async (res) => {
            Swal.fire(
              "Deleted!",
              `${data?.first_name} ${data?.last_name} has been deleted.`,
              "success"
            );
            await submitApi(peopleBtnPage);
          })
          .catch((e) => {});
      }
    });
  };

  useEffect(() => {
    const load = async () => {
      await submitApi(peopleBtnPage);
      await reqFamList({});
      await reqCategoryList({});
    };
    load();
  }, []);

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // setCurrentPage(value);
    const param = {
      ...peopleBtnPage,
      page: value,
    };
    await submitApi(param);
  };

  const handleFamilyChange = async (id: number) => {
    const param = {
      ...peopleBtnPage,
      family_id: id,
    };
    await submitApi(param);
  };

  const handleCategoryChange = async (id: number) => {
    const param = {
      ...peopleBtnPage,
      category_id: id,
    };
    await submitApi(param);
  };

  const handleGenderChange = async (value: string) => {
    const param = {
      ...peopleBtnPage,
      gender: value,
    };
    await submitApi(param);
  };

  const submitApi = async (param: any) => {
    await disptach(peoples({ peopleBtnPage: param }));
    reqList(param);
  };

  const excludeChange = async (id: number, checked: boolean, key: number) => {
    const list = [...peopleList];
    list[key] = {
      ...list[key],
      exclude: checked,
    };
    disptach(peoples({ peopleList: list }));
    const data = {
      exclude: checked,
    };
    await reqExclude({ data, id });
  };

  return (
    <Container style={{ width: "80%", margin: "auto", marginBottom: "5em" }}>
      <Box width="100%" mt="50px">
        <Box width="100%" mb="32px">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {/* <TextField
                label="Search"
                type="search"
                id="search"
                name="search"
              /> */}
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="family-select">Family Group</InputLabel>
                <Select
                  labelId="family-select"
                  id="family_id"
                  name="family_id"
                  onChange={(e: SelectChangeEvent) => {
                    handleFamilyChange(Number(e.target.value));
                  }}
                >
                  <MenuItem value="0">All</MenuItem>
                  {familyList?.map((item: familyDataInt) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="category-select">Category Group</InputLabel>
                <Select
                  labelId="category-select"
                  id="category_id"
                  name="category_id"
                  onChange={(e: SelectChangeEvent) => {
                    handleCategoryChange(Number(e.target.value));
                  }}
                >
                  <MenuItem value="0">All</MenuItem>
                  {categorylist?.map((item: categoryDataInt) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="gender-select">Gender</InputLabel>
                <Select
                  labelId="gender-select"
                  id="gender"
                  name="gender"
                  onChange={(e: SelectChangeEvent) => {
                    handleGenderChange(e.target.value);
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
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
                  <TableCell>Excluded to Game</TableCell>
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
                {peopleList?.map((item: peopleDataInt, key: number) => {
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
                      <TableCell>
                        <Checkbox
                          // checked={checked}
                          onChange={() =>
                            excludeChange(item.id, !Boolean(item.exclude), key)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                          defaultChecked={item?.exclude}
                        />
                      </TableCell>
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

            <Pagination
              count={calculatePageCount(
                Number(peoplePage.count),
                Number(peopleBtnPage.take)
              )}
              page={peoplePage.currentPage}
              onChange={handlePageChange}
            />
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
