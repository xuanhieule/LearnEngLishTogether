import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  tableVocabulary:{
    height:"575px"
  },
  table: {
    minWidth: 650,
  },
  fontText1:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
    fontWeight:"700"
  },
  fontText:{
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: "16px",
    fontWeight:"600"
  },
  content:{
    overflow: "scroll",
    overflowX: "hidden",
    
  }
});

function createData(vocabulary,wordClass ,pronounce, means) {
  return { vocabulary, wordClass, pronounce, means };
}

const rows = [
  // createData('department','N' ,"dəˈpärtmənt", 'Phòng ban'),
  // createData('encouragement', 'N', "inˈkərijmənt", 'Sự khuyến khích'),
  // createData('advertisement','N', "'advərˌtīzmənt", 'Quảng cáo'),
  
];
var insertRows = (data) =>{
  

}
function unique(arr) {
  return Array.from(new Set(arr)) 
}

export default function Vocabulary(props) {
  const classes = useStyles();
  var vocabulary = props.vocabularys;
  console.log("VNNNNNNN: ", vocabulary);
  for (var i = 0; i < vocabulary.length; i++) {
    if (rows.length === vocabulary.length) {
      break;
    }
    rows.push(createData(vocabulary[i].vocabulary, vocabulary[i].type ,vocabulary[i].pronounce, vocabulary[i].means));
  }

  return (
    <TableContainer className={classes.tableVocabulary} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className={classes.fontText1}>Từ vựng</TableCell>
            <TableCell className={classes.fontText1}  align="center">Từ loại &nbsp;</TableCell>
            <TableCell className={classes.fontText1}  align="center">Phát âm &nbsp;(US)</TableCell>
            <TableCell className={classes.fontText1} align="center">Nghĩa tiếng việt</TableCell>

          </TableRow>
        </TableHead>
        <TableBody className={classes.content}>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={classes.fontText} component="th" scope="row">
                {row.vocabulary}
              </TableCell>
              <TableCell className={classes.fontText} align="center">{row.wordClass}</TableCell>
              <TableCell className={classes.fontText} align="center">{row.pronounce}</TableCell>
              <TableCell className={classes.fontText} align="center">{row.means}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
