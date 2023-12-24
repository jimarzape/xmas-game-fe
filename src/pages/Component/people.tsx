import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  peoples,
  useListPeopleMutation,
  useRaffleListPeopleMutation,
} from "../../store/people.slice";
import { categoryDataInt } from "../../interface";
import { useEffect } from "react";
import { useListCategoryMutation } from "../../store/category.slice";

const PeopleCategory = () => {
  const { peopleBtnPage, peopleList } = useSelector(
    (state: any) => state.people
  );
  const { categorylist } = useSelector((state: any) => state.category);

  const dispatch = useDispatch();
  const [reqCategoryList, resCategoryList] = useListCategoryMutation();
  const [reqList, resList] = useRaffleListPeopleMutation();

  const handleCategoryChange = async (id: number) => {
    const param = {
      ...peopleBtnPage,
      category_id: id,
      game: true,
      take: 200,
    };

    await dispatch(peoples({ peopleBtnPage: param }));
    // setPeopleParam(param);
    await load(param);
  };

  const load = async (param: any) => {
    await reqList(param).then((res: any) => {
      const data = res?.data?.data;
      dispatch(peoples({ peopleList: data }));
    });
  };

  const handleGenderChange = async (gender: string) => {
    const param = {
      ...peopleBtnPage,
      gender: gender != "All" ? gender : "",
      take: 100,
    };

    await dispatch(peoples({ peopleBtnPage: param }));
    await load(param);
  };

  useEffect(() => {
    reqCategoryList({});
  }, []);

  return (
    <Container>
      <FormControl fullWidth style={{ marginBottom: "32px" }}>
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
          {categorylist?.map((item: categoryDataInt, key: number) => {
            return (
              <MenuItem value={item.id} key={`category-${item.id}`}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: "32px" }}>
        <InputLabel id="category-select">Gender</InputLabel>
        <Select
          labelId="gender-select"
          id="gender"
          name="gender"
          onChange={(e: SelectChangeEvent) => {
            handleGenderChange(e.target.value);
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ textAlign: "center" }}>
        <Typography>Available participants : {peopleList?.length}</Typography>
      </FormControl>
    </Container>
  );
};
export default PeopleCategory;
