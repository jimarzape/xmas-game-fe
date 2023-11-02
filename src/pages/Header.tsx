import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Icon, Link, ListItemIcon } from "@mui/material";
import {
  LoginOutlined,
  LogoutOutlined,
  PeopleAltOutlined,
  CategoryOutlined,
  FamilyRestroomOutlined,
} from "@mui/icons-material";
import LoginModal from "./modals/login";
import getCookie from "../utils/getCookie";
import eraseCookie from "../utils/eraseCookie";
import { useLogOutAuthMutation } from "../store/auth.slice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// const pages = ["Home", "Roulette", "Games", "Memories"];
const pages = [
  { label: "Home", url: "/" },
  { label: "Roulette", url: "" },
  { label: "Games", url: "" },
  { label: "Memories", url: "" },
];

const settings = [
  { label: "People", url: "/", icon: PeopleAltOutlined },
  { label: "Category", url: "", icon: CategoryOutlined },
  { label: "Family", url: "", icon: FamilyRestroomOutlined },
];

const Header = () => {
  const userCookie = getCookie("user");
  const [reqLogout, resLogout] = useLogOutAuthMutation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [openLogin, setOpenLogin] = React.useState(false);

  const closeModal = () => {
    setOpenLogin(false);
  };

  const logOut = () => {
    // console.log("logout");
    // eraseCookie("user");
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "You are about to logout.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        reqLogout({})
          .then((res) => {
            Swal.fire("Logout!", "You are now logout.", "success");
          })
          .catch((e) => {});
      }
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ZAPE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page?.label} onClick={handleCloseNavMenu}>
                  <Link href={page.url}>{page?.label}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ZAPE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, key) => (
              <Button
                key={page?.label}
                href={page?.url}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Zape" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userCookie &&
                userCookie != "" &&
                settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <Icon component={setting.icon} />
                    </ListItemIcon>
                    <Link
                      textAlign="center"
                      href={setting.url}
                      underline="none"
                      variant="inherit"
                    >
                      {setting.label}
                    </Link>
                  </MenuItem>
                ))}
              {userCookie && (
                <MenuItem key={"login-key"} onClick={logOut}>
                  <ListItemIcon>
                    <Icon component={LogoutOutlined} />
                  </ListItemIcon>
                  <Link textAlign="center" underline="none" variant="inherit">
                    Logout
                  </Link>
                </MenuItem>
              )}

              {!userCookie && userCookie == "" && (
                <MenuItem
                  key={"login-key"}
                  onClick={() => {
                    setOpenLogin(true);
                  }}
                >
                  <ListItemIcon>
                    <Icon component={LoginOutlined} />
                  </ListItemIcon>
                  <Link textAlign="center" underline="none" variant="inherit">
                    Login
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {openLogin && <LoginModal isOpen={openLogin} onClose={closeModal} />}
    </AppBar>
  );
};
export default Header;
