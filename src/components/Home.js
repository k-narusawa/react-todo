import React, {Component}from 'react';
import { connect } from "react-redux";
import { readAllTodo } from "../actions"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from"lodash"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";


class Home extends Component {
  componentDidMount(){
    this.props.readAllTodo()
  }
  renderTodo(){
    return (
      _.map(this.props.todo, (todo) => (
        <TableRow key={todo.id}>
          <TableCell><Link to={`todo/${todo.id}`}>{todo.body}</Link></TableCell>
          <TableCell align="right">{todo.priority}</TableCell>
          <TableCell align="right">{todo.milestone}</TableCell>
        </TableRow>
      ))
    )
  }
  render(){
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Body</TableCell>
                <TableCell align="right">priority</TableCell>
                <TableCell align="right">milestone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderTodo()}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab color="primary" aria-label="add" component={Link} to="/new">
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ todo: state.todo });
const mapDispatchToProps = { readAllTodo };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
