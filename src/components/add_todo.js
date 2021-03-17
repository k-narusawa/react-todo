import React, {Component}from 'react';
import { connect } from "react-redux";
import { postTodo } from "../actions"
import {Field, reduxForm} from "redux-form"
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


class AddTodo extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    renderFieldBody(field){
        const { input, label, type, meta: {touched, error}} = field

        return (
            <TextField 
            id="standard-basic" 
            helperText={label} 
            {...input} 
            type={type} 
            error={touched && error} 
            fullWidth={true}/>
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
        await this.props.postTodo(values)
        this.props.history.push("/")
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
                    <Button variant="contained" component={Link} to="todo">Cancel</Button>
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { postTodo };

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ validate, form: 'todoNewForm'})(AddTodo));
