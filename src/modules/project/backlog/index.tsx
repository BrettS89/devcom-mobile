import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faBug } from '@fortawesome/free-solid-svg-icons'

import { projectSelector, ActionTypes } from '../../../redux';
import { useStyles } from './styles';
import { getRows } from './utilities';

const Backlog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const project = useSelector(projectSelector);
  const [page, setPage] = React.useState(0);
  const rows = getRows(window.innerHeight);

  const onPageChange = (e: any, newPage: number) => {
    setPage(newPage);

    if (newPage > page) {
      dispatch({
        type: ActionTypes.FETCH_MORE_TICKETS,
        payload: rows,
      });
    }
  };

  const renderTable = () => {
    const firstTicket = rows * page;
    const lastTicket = firstTicket + rows;
    const tickets = project.backlog.data.slice(firstTicket, lastTicket);

    return (
      <TableContainer>
        <Table size='medium'>
          <TableBody>
            {tickets.map(ticket => {
              return (
                <TableRow key={ticket._id}>
                  <TableCell align="left" className={classes.status}>
                    <FontAwesomeIcon icon={faBookmark} style={{ fontSize: 20, color: '#505999' }} />
                  </TableCell>
                  <TableCell align="left" className={classes.name}><Typography>{ticket.name}</Typography></TableCell>
                  <TableCell align="left"><Typography>Test</Typography></TableCell>
                  <TableCell align="left"><Typography>Test</Typography></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter style={{ width: 500, borderBottom: 'hidden' }}>
            <TablePagination
              count={project.backlog.count}
              page={page}
              rowsPerPage={rows}
              rowsPerPageOptions={[]}
              onPageChange={onPageChange}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className={classes.container}>
      <Typography className={`bold ${classes.pageTitle}`} variant='h5'>
        Backlog
      </Typography>
      {renderTable()}
    </div>
  );
};

export default Backlog;
