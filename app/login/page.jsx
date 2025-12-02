"use client";

import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#e6e6e6",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "1400px",
          display: "flex",
          bgcolor: "white",
          borderRadius: "40px",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#b3b3b3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: "#b3b3b3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
            }}
          >
            <img
              src="/mock_EGM_Logo.png"
              alt="Logo"
              style={{
                width: "60%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: "40%",
            minWidth: "380px",
            bgcolor: "#4d4d4d",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
            borderRadius: "0 40px 40px 0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 4,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Welcome
          </Typography>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "& input": { color: "white" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            InputLabelProps={{ style: { color: "white" } }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "& input": { color: "white" },
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              color: "white",
            }}
          >
            <FormControlLabel
              control={<Checkbox sx={{ color: "white" }} />}
              label="Remember me"
              sx={{ color: "white" }}
            />

            <Link
              href="#"
              underline="hover"
              sx={{ color: "white", fontSize: "0.9rem" }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#333",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: "30px",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
