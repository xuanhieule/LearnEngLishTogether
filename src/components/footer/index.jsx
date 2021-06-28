import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
// import logo from "../header/logo/logoCap2.gif";
Footer.propTypes = {};


const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `2px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  font_title:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "20px",
  },
  font_item:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",}
}));

const footers = [
  {
    title: "Learn English Together",
    description: ["Giới thiệu", "Đội ngũ", "Địa chỉ"],
  },
  {
    title: "Chính sách",
    description: [
      "Điểu khoản sử dụng",
      "Chính sách bảo mật",
      "Chính sách cookies",
    ],
  },
  {
    title: "Hỗ trợ",
    description: ["Cài đặt", "Trợ giúp", "Ngôn ngữ", "Báo cáo"],
  },
  {
    title: "Liên hệ",
    description: ["Liên hệ chúng tôi", "Đóng góp ý kiến"],
  },
];

function Footer(props) {
  const classes = useStyles();
  return (
    <div component="footer" className={classes.footer}>
      <Container>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={2} key={footer.title}>
              <Typography variant="h3" color="textPrimary" gutterBottom className={classes.font_title}>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary" className={classes.font_item}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

      </Container>
    </div>
  );
}

export default Footer;
