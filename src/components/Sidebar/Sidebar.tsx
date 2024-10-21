import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, List, ListItem, Avatar, styled, Typography } from "@mui/material";

interface StyledListItemProps {
  isActive: boolean;
}

const SidebarContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #e0e0e0",
}));

const LogoContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
}));

const ProfileContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid #e0e0e0",
  paddingTop: "16px",
  marginTop: "auto",
}));

const BoxIcon = styled(Box)(() => ({
  width: "20px",
  height: "20px",
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  marginRight: "10px",
  border: "1px solid grey",
}));

const Items = styled(Typography)(() => ({
  fontSize: "14px",
}));

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<StyledListItemProps>(({ theme, isActive }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  transition: "0.3s",
  backgroundColor: isActive ? "#ECF7FF" : "transparent",
  color: isActive ? "#1F8CD0" : "inherit",
  "&:hover": {
    backgroundColor: isActive ? "#ECF7FF" : "#f5f5f5",
    color: isActive ? "#1F8CD0" : "inherit",
    cursor: "pointer",
  },
}));

type MenuItem = {
  text: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { text: "Home", path: "" },
  { text: "Stores", path: "stores" },
  { text: "Products", path: "products" },
  { text: "Catalogue", path: "catalogue" },
  { text: "Promotions", path: "promotions" },
  { text: "Reports", path: "reports" },
  { text: "Docs", path: "docs" },
  { text: "Settings", path: "settings" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === `/${path}`;
  };

  const handleNavigation = (path: string): void => {
    navigate(`/${path}`);
  };

  return (
    <SidebarContainer>
      <Box>
        <LogoContainer>
          <Avatar src="/logo.png" alt="Logo" />
          <Typography ml={2}>Lemon Inc.</Typography>
        </LogoContainer>

        <List component="nav" sx={{ borderTop: "1px solid #e0e0e0" }}>
          {menuItems.map((item, index) => (
            <StyledListItem
              key={index}
              onClick={() => handleNavigation(item.path)}
              isActive={isActive(item.path)}
            >
              <BoxIcon />
              <Items>{item.text}</Items>
            </StyledListItem>
          ))}
        </List>
      </Box>

      <ProfileContainer>
        <Avatar src="https://i.pravatar.cc/300" alt="Andy Samberg" />
        <Box ml={2}>
          <Items>Andy Samberg</Items>
          <Items sx={{ color: "gray" }}>andy.samberg@gmail.com</Items>
        </Box>
      </ProfileContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
