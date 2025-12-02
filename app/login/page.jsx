"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      setLoading(false);
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }

    setLoading(false);
  };

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

          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
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
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ color: "white" }}
                />
              }
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
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "white",
                color: "#333",
                fontWeight: "bold",
                py: 1.5,
                borderRadius: "30px",
                "&:hover": { bgcolor: "#f0f0f0" },
                "&:disabled": { bgcolor: "rgba(255,255,255,0.5)" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
