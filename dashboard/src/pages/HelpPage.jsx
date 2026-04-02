import {
  Box,
  Grid,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Link,
  Divider, // Added missing Divider import
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ForumIcon from "@mui/icons-material/Forum";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I interpret the analytics dashboard?",
      answer:
        "The dashboard shows key metrics including user engagement, revenue, conversion rates, and traffic patterns. Each metric includes comparisons to previous periods to help track progress over time. You can hover over any chart for detailed information.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "Data is updated in real-time for active metrics, while historical reports are refreshed every 24 hours. You can see the last update timestamp on each chart. For critical metrics, data refreshes every 5 minutes.",
    },
    {
      question: "Can I export reports?",
      answer:
        "Yes! You can export any report as PDF, CSV, or Excel format by clicking the 'Export' button in the top right corner of each report section. You can also schedule automated email reports.",
    },
    {
      question: "What do the different metrics mean?",
      answer:
        "• User Engagement: Percentage of active users interacting with features\n• Retention Rate: Users returning after their first visit\n• Conversion Rate: Percentage of users completing desired actions\n• Bounce Rate: Users who leave without interaction\n• Customer Lifetime Value (CLV): Total revenue from a customer over time",
    },
    {
      question: "How do I set up custom alerts?",
      answer:
        "Navigate to Settings > Notifications to configure custom alerts. You can set thresholds for any metric and choose to receive alerts via email, SMS, or in-app notifications.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Yes! Our mobile app is available for both iOS and Android. Download it from the App Store or Google Play Store to access your dashboard on the go.",
    },
  ];

  const tutorials = [
    {
      title: "Getting Started with Analytics",
      duration: "10 min",
      icon: <SchoolIcon />,
    },
    {
      title: "Understanding Your Dashboard",
      duration: "15 min",
      icon: <VideoLibraryIcon />,
    },
    {
      title: "Creating Custom Reports",
      duration: "20 min",
      icon: <ArticleIcon />,
    },
    {
      title: "Setting Up Alerts",
      duration: "8 min",
      icon: <HelpOutlineIcon />,
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Help & Documentation
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 4, bgcolor: "#f5f5f5" }}>
        <TextField
          fullWidth
          placeholder="Search for help articles, tutorials, and FAQs..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "white", borderRadius: 1 }}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* FAQ Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Frequently Asked Questions
            </Typography>

            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{ mb: 1, "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Right Sidebar - Quick Links */}
        <Grid item xs={12} md={4}>
          {/* Video Tutorials */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SchoolIcon sx={{ color: "#667eea" }} /> Video Tutorials
            </Typography>
            {tutorials.map((tutorial, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 1,
                  "&:hover": { bgcolor: "#f5f5f5", borderRadius: 1 },
                }}
              >
                <Box sx={{ color: "#667eea" }}>{tutorial.icon}</Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {tutorial.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tutorial.duration}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Watch
                </Button>
              </Box>
            ))}
          </Paper>

          {/* Contact Support */}
          <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
            <ContactSupportIcon
              sx={{ fontSize: 48, color: "#667eea", mb: 1 }}
            />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Need More Help?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Our support team is available 24/7
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#667eea", "&:hover": { bgcolor: "#764ba2" } }}
            >
              Contact Support
            </Button>
          </Paper>

          {/* Community Forum */}
          <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
            <ForumIcon sx={{ fontSize: 48, color: "#4caf50", mb: 1 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Community Forum
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Connect with other users and share insights
            </Typography>
            <Button variant="outlined" fullWidth>
              Join Discussion
            </Button>
          </Paper>

          {/* Quick Stats */}
          <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#f5f5f5" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#667eea" }}
            >
              95%
            </Typography>
            <Typography variant="body2">Customer Satisfaction</Typography>
            <Divider sx={{ my: 2 }} />{" "}
            {/* This now works with Divider imported */}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#667eea" }}
            >
              24/7
            </Typography>
            <Typography variant="body2">Support Available</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
