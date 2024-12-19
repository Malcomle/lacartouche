import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Modal,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const blogPosts = [
  {
    id: 1,
    image: "images/blog1.png",
  },
  {
    id: 2,
    image: "images/blog2.png",
  },
];

const BlogPage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {t("blogPage.title")}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        {t("blogPage.subtitle")}
      </Typography>

      <Grid container spacing={6}>
        {blogPosts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                alt={t(`blogPage.posts.${post.id.toString()}.title`)}
                height="200"
                image={post.image}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }} gutterBottom>
                  {t(`blogPage.posts.${post.id}.title`)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#000" }} gutterBottom>
                  {t(`blogPage.posts.${post.id}.description`)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#5c3a21",
                    ":hover": {
                      backgroundColor: "#8b5e34",
                    },
                  }}
                  onClick={() => handleOpen(post)}
                >
                  {t("blogPage.readMore")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modale pour afficher les détails */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {selectedPost && (
            <>
              <Typography
                id="modal-title"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {t(`blogPage.posts.${selectedPost.id}.title`)}
              </Typography>
              <Typography
                id="modal-description"
                variant="body1"
                sx={{ color: "#000", marginBottom: 2 }}
              >
                {t(`blogPage.posts.${selectedPost.id}.fullText`)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5c3a21",
                  ":hover": { backgroundColor: "#8b5e34" },
                }}
                onClick={handleClose}
              >
                {t("blogPage.close")}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BlogPage;