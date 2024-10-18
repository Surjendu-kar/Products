import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  styled,
} from "@mui/material";

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

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<StyledListItemProps>(({ theme, isActive }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  transition: "0.3s",
  backgroundColor: isActive ? "#e0f7fa" : "transparent",
  color: isActive ? "#1F8CD0" : "inherit",
  "&:hover": {
    backgroundColor: isActive ? "#e0f7fa" : "#f5f5f5",
    color: isActive ? "#1F8CD0" : "inherit",
    cursor: "pointer",
  },
}));

type MenuItem = {
  text: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { text: "Home", path: "home" },
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

  // Check if the current route matches the menu item
  const isActive = (path: string): boolean => {
    return location.pathname === `/${path}`;
  };

  // Handle navigation when list item is clicked
  const handleNavigation = (path: string): void => {
    navigate(`/${path}`);
  };

  return (
    <SidebarContainer>
      <Box>
        <LogoContainer>
          <Avatar src="/logo.png" alt="Logo" />
          <Box ml={2}>Lemon Inc.</Box>
        </LogoContainer>

        <List component="nav">
          {menuItems.map((item, index) => (
            <StyledListItem
              key={index}
              onClick={() => handleNavigation(item.path)}
              isActive={isActive(item.path)}
            >
              <BoxIcon />
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </Box>

      <ProfileContainer>
        <Avatar src="https://i.pravatar.cc/300" alt="Andy Samberg" />
        <Box ml={2}>
          <div>Andy Samberg</div>
          <div style={{ fontSize: "12px", color: "gray" }}>
            andy.samberg@gmail.com
          </div>
        </Box>
      </ProfileContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
