import React, {Component}from 'react';
import { connect } from "react-redux";
import { putTodo, deleteTodo, getTodo } from "../actions"
import {Field, reduxForm} from "redux-form"
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


class DetailTodo extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }
    componentDidMount(){
        const { id } = this.props.match.params
        if( id ) this.props.getTodo(id)
    }

    renderFieldBody(field){
        const { input, label, type, meta: {touched, error}} = field

        return (
        <div>
            <TextField id="standard-basic" label={label} {...input} type={type}></TextField>
            {touched && error && <span>{error}</span>}
        </div>
        )
    }
    renderFieldPriority(field){
        const { input, label, type, meta: {touched, error}} = field

        return (
        <div>
            <FormControl>
                <InputLabel id="demo-simple-select-label" type={label}></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...input} type={type}>
                <MenuItem value={"普通"}>普通</MenuItem>
                <MenuItem value={"重要"}>重要</MenuItem>
                <MenuItem value={"最重要"}>最重要</MenuItem>
                </Select>
            </FormControl>
            {touched && error && <span>{error}</span>}
        </div>
        )
    }
    renderFieldMileStone(field){
        const { input, label, type, meta: {touched, error}} = field

        return (
        <div>
            <TextField
                {...input}
                label={label}
                id="date"
                type={type}
                InputLabelProps={{
                shrink: true,
                }}
            />
            {touched && error && <span>{error}</span>}
        </div>
        )
    }

    async onSubmit(values){
        await this.props.putTodo(values)
        this.props.history.push("/todo")
    }

    async onDeleteClick(){
        const { id } = this.props.match.params
        await this.props.deleteTodo(id)
        this.props.history.push("/todo")
    }
    render(){
      const { handleSubmit, pristine, submitting, invalid } = this.props
        return (
        <React.Fragment>
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div><Field label="Body" name="body" type="text" component={this.renderFieldBody} /></div>
                <div><Field label="Priority" name="priority" type="text" component={this.renderFieldPriority} /> </div>
                <div><Field label="MileStone" name="milestone" type="date" component={this.renderFieldMileStone} /> </div>

                <div>
                    <Button variant="contained" type="submit" disabled={pristine || submitting || invalid}>Submit</Button>
                    <Button variant="contained" component={Link} to="/todo">Cancel</Button>
                    <Button variant="contained" component={Link} to="/todo" onClick={this.onDeleteClick}>Delete</Button>
                </div>              
            </form>
        </React.Fragment>
        );
  }
}
const validate = values => {
    const errors = {}

    if (!values.body) errors.body = "Enter a title, please."
    if (!values.priority) errors.priority = "Enter a priority, please."
    if (!values.milestone) errors.milestone = "Enter a milestone, please."

    return errors
}

const mapStateToProps = (state, ownProps) => {
    const todo = state.todo[ownProps.match.params.id]
    return { initialValues: todo, state }
}
const mapDispatchToProps = { putTodo, deleteTodo, getTodo };

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ validate, form: 'todoUpdateForm', enableReinitialize: true})(DetailTodo));
