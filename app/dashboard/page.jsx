"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { productAPI, requestAPI } from "@/utils/api";

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [requestViewDialogOpen, setRequestViewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProducts();
    fetchRequests();
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (currentTab === 1 && requests.length === 0 && !requestsLoading) {
      fetchRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productAPI.getAll();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      setRequestsLoading(true);
      setError("");
      const data = await requestAPI.getAll();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load requests");
      console.error("Error fetching requests:", err);
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      const product = await productAPI.getById(id);
      setSelectedProduct(product);
      setViewDialogOpen(true);
    } catch (err) {
      setError(err.message || "Failed to load product details");
    }
  };

  const handleViewRequest = async (id) => {
    try {
      const request = await requestAPI.getById(id);
      setSelectedRequest(request);
      setRequestViewDialogOpen(true);
    } catch (err) {
      setError(err.message || "Failed to load request details");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      category: product.category || "",
      image: product.image || "",
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await productAPI.delete(productToDelete.id);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (err) {
      setError(err.message || "Failed to delete product");
      setDeleteDialogOpen(false);
    }
  };

  const handleFormChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = "Valid price is required";
    }
    if (formData.description && formData.description.length > 500) {
      errors.description = "Description must be 500 characters or less";
    }
    if (formData.category && formData.category.length > 100) {
      errors.category = "Category must be 100 characters or less";
    }
    if (formData.image && formData.image.length > 500) {
      errors.image = "Image path must be 500 characters or less";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const updateData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        ...(formData.description && { description: formData.description.trim() }),
        ...(formData.category && { category: formData.category.trim() }),
        ...(formData.image && { image: formData.image.trim() }),
      };

      await productAPI.update(selectedProduct.id, updateData);
      await fetchProducts();
      setEditDialogOpen(false);
      setSelectedProduct(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (err) {
      setError(err.message || "Failed to update product");
    }
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleAddSave = async () => {
    if (!validateForm()) return;

    try {
      const newProduct = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        ...(formData.description && { description: formData.description.trim() }),
        ...(formData.category && { category: formData.category.trim() }),
        ...(formData.image && { image: formData.image.trim() }),
      };

      await productAPI.create(newProduct);
      await fetchProducts();
      setEditDialogOpen(false);
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (err) {
      setError(err.message || "Failed to create product");
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="static" sx={{ bgcolor: "#4d4d4d" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              label={user?.role || "User"}
              color="secondary"
              size="small"
            />
            <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
              <Avatar sx={{ bgcolor: "#b3b3b3", width: 32, height: 32 }}>
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
            <Tab label="Products" />
            <Tab label="Requests" />
          </Tabs>
        </Box>

        {currentTab === 0 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddNew}
                sx={{ bgcolor: "#4d4d4d", "&:hover": { bgcolor: "#333" } }}
              >
                Add Product
              </Button>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#e0e0e0" }}>
                      <TableCell><strong>Image</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Price</strong></TableCell>
                      <TableCell><strong>Category</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                      <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No products found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow key={product.id} hover>
                          <TableCell>
                            {product.image ? (
                              <Box
                                component="img"
                                src={`${process.env.NEXT_PUBLIC_URL || ""}/${product.image}`}
                                alt={product.name}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 1,
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  bgcolor: "#e0e0e0",
                                  borderRadius: 1,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  No Image
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>${parseFloat(product.price || 0).toFixed(2)}</TableCell>
                          <TableCell>{product.category || "-"}</TableCell>
                          <TableCell>
                            {product.description
                              ? product.description.length > 50
                                ? `${product.description.substring(0, 50)}...`
                                : product.description
                              : "-"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleView(product.id)}
                              color="primary"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(product)}
                              color="warning"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(product)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        {currentTab === 1 && (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            {requestsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#e0e0e0" }}>
                      <TableCell><strong>Product</strong></TableCell>
                      <TableCell><strong>Buyer Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Phone</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell><strong>Quantity</strong></TableCell>
                      <TableCell><strong>Created</strong></TableCell>
                      <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No requests found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      requests.map((request) => (
                        <TableRow key={request.id} hover>
                          <TableCell>
                            {request.product ? (
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {request.product.name || "N/A"}
                                </Typography>
                                {request.product.image && (
                                  <Box
                                    component="img"
                                    src={`${process.env.NEXT_PUBLIC_URL || ""}/${request.product.image}`}
                                    alt={request.product.name}
                                    sx={{
                                      width: 50,
                                      height: 50,
                                      objectFit: "cover",
                                      borderRadius: 1,
                                      mt: 1,
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                )}
                              </Box>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>{request.name_buyer}</TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{request.phone_number}</TableCell>
                          <TableCell>
                            <Chip
                              label={request.role}
                              size="small"
                              color={
                                request.role === "admin"
                                  ? "error"
                                  : request.role === "staff"
                                  ? "warning"
                                  : "default"
                              }
                            />
                          </TableCell>
                          <TableCell>{request.quantity}</TableCell>
                          <TableCell>
                            {new Date(request.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleViewRequest(request.id)}
                              color="primary"
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Container>

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ pt: 2 }}>
              {selectedProduct.image && (
                <Box
                  component="img"
                  src={`${process.env.NEXT_PUBLIC_URL || ""}/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  sx={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                    mb: 2,
                    borderRadius: 1,
                  }}
                />
              )}
              <Typography variant="h6" gutterBottom>
                {selectedProduct.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Price:</strong> ${parseFloat(selectedProduct.price || 0).toFixed(2)}
              </Typography>
              {selectedProduct.category && (
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>Category:</strong> {selectedProduct.category}
                </Typography>
              )}
              {selectedProduct.description && (
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>Description:</strong> {selectedProduct.description}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                <strong>ID:</strong> {selectedProduct.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Created:</strong>{" "}
                {new Date(selectedProduct.created_at).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Updated:</strong>{" "}
                {new Date(selectedProduct.last_updated).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit/Create Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Name *"
              value={formData.name}
              onChange={handleFormChange("name")}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              fullWidth
              label="Price *"
              type="number"
              value={formData.price}
              onChange={handleFormChange("price")}
              error={!!formErrors.price}
              helperText={formErrors.price}
              inputProps={{ step: "0.01", min: "0" }}
            />
            <TextField
              fullWidth
              label="Category"
              value={formData.category}
              onChange={handleFormChange("category")}
              error={!!formErrors.category}
              helperText={formErrors.category || "Max 100 characters"}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleFormChange("description")}
              error={!!formErrors.description}
              helperText={formErrors.description || "Max 500 characters"}
            />
            <TextField
              fullWidth
              label="Image Path"
              value={formData.image}
              onChange={handleFormChange("image")}
              error={!!formErrors.image}
              helperText={formErrors.image || "Max 500 characters"}
              placeholder="e.g., product.png"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={selectedProduct ? handleSave : handleAddSave}
            variant="contained"
            sx={{ bgcolor: "#4d4d4d", "&:hover": { bgcolor: "#333" } }}
          >
            {selectedProduct ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{productToDelete?.name}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request View Dialog */}
      <Dialog
        open={requestViewDialogOpen}
        onClose={() => setRequestViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Quote Request Information
              </Typography>

              {selectedRequest.product && (
                <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Product Details
                  </Typography>
                  {selectedRequest.product.image && (
                    <Box
                      component="img"
                      src={`${process.env.NEXT_PUBLIC_URL || ""}/${selectedRequest.product.image}`}
                      alt={selectedRequest.product.name}
                      sx={{
                        width: "100%",
                        maxHeight: 200,
                        objectFit: "contain",
                        mb: 2,
                        borderRadius: 1,
                      }}
                    />
                  )}
                  <Typography variant="body1" gutterBottom>
                    <strong>Product Name:</strong> {selectedRequest.product.name}
                  </Typography>
                  {selectedRequest.product.price && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Price:</strong> $
                      {parseFloat(selectedRequest.product.price).toFixed(2)}
                    </Typography>
                  )}
                  {selectedRequest.product.category && (
                    <Typography variant="body1" gutterBottom>
                      <strong>Category:</strong> {selectedRequest.product.category}
                    </Typography>
                  )}
                </Box>
              )}

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                Buyer Information
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Name:</strong> {selectedRequest.name_buyer}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Email:</strong> {selectedRequest.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Phone:</strong> {selectedRequest.phone_number}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Role:</strong>{" "}
                <Chip
                  label={selectedRequest.role}
                  size="small"
                  color={
                    selectedRequest.role === "admin"
                      ? "error"
                      : selectedRequest.role === "staff"
                      ? "warning"
                      : "default"
                  }
                />
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                Request Details
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Quantity:</strong> {selectedRequest.quantity}
              </Typography>
              {selectedRequest.note && (
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>Note:</strong> {selectedRequest.note}
                </Typography>
              )}

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                Timestamps
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Request ID:</strong> {selectedRequest.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Created:</strong>{" "}
                {new Date(selectedRequest.created_at).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedRequest.last_updated).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

