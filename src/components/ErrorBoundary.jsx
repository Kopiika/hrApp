import { Component } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {this.state.error?.message}
          </Typography>
          <Button
            variant="contained"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
