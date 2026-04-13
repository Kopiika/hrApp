import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import { useYearsWorked } from "../hooks/useYearsWorked";
import { useNavigate } from "react-router-dom";

const AVATAR_PALETTE = [
  "#3b82f6", "#8b5cf6", "#0891b2", "#059669",
  "#d97706", "#dc2626", "#db2777", "#475569",
];

const getAvatarColor = (name = "") =>
  AVATAR_PALETTE[(name.charCodeAt(0) ?? 0) % AVATAR_PALETTE.length];

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const SummaryPersonCard = ({ employee }) => {
  const { totalYears, reminder } = useYearsWorked(employee.startDate);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
          transform: "translateY(-2px)",
        },
      }}
      elevation={0}
    >
      <CardContent sx={{ p: 2.5, flex: 1 }}>
        {/* Avatar + name + title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: getAvatarColor(employee.name),
              width: 44,
              height: 44,
              fontSize: "0.875rem",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {getInitials(employee.name)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              fontWeight={600}
              noWrap
              sx={{ fontSize: "0.9375rem", color: "text.primary" }}
            >
              {employee.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap display="block">
              {employee.title}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Info rows */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BusinessOutlinedIcon sx={{ fontSize: 14, color: "text.secondary", flexShrink: 0 }} />
            <Typography variant="caption" color="text.secondary">
              {employee.department}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 14, color: "text.secondary", flexShrink: 0 }} />
            <Typography variant="caption" color="text.secondary">
              {employee.location}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkHistoryOutlinedIcon sx={{ fontSize: 14, color: "text.secondary", flexShrink: 0 }} />
            <Typography variant="caption" color="text.secondary">
              {totalYears} {totalYears === 1 ? "year" : "years"} of service
            </Typography>
          </Box>
        </Box>

        {reminder && (
          <Chip
            label={reminder}
            size="small"
            variant="outlined"
            color={reminder.includes("🎉") ? "success" : "warning"}
            sx={{
              mt: 2,
              width: "100%",
              height: "auto",
              "& .MuiChip-label": { whiteSpace: "normal", py: 0.75, fontSize: "0.75rem" },
            }}
          />
        )}
      </CardContent>

      <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
        <Button
          size="small"
          variant="outlined"
          fullWidth
          onClick={() => navigate(`/employees/${employee.id}`)}
          sx={{ fontSize: "0.8rem" }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

SummaryPersonCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    department: PropTypes.string,
    location: PropTypes.string,
    animal: PropTypes.string,
    startDate: PropTypes.string,
  }).isRequired,
};

export default SummaryPersonCard;
