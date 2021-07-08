import React, {useState} from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const Adduser = (props) => {

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState({title: '', message: ''});

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Bad request',
        message: 'username and age field is mandatory'
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Bad request',
        message: 'Age cannot < 1'
      })
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername('');
    setEnteredAge('');
  }

  const onConfirm = () => {
    setError({
      title: '',
      message: '',
    });
  }

  return (
    <div>
      { error.title && <ErrorModal onConfirm={onConfirm} title={error.title} message={error.message} /> }
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}/>
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}/>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default Adduser;
