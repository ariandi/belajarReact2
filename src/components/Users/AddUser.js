import React, {useRef, useState} from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helper/Wrapper";

const Adduser = (props) => {

  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');

  const [error, setError] = useState({title: '', message: ''});

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };
  //
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

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
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  }

  const onConfirm = () => {
    setError({
      title: '',
      message: '',
    });
  }

  return (
    <Wrapper>
      { error.title && <ErrorModal onConfirm={onConfirm} title={error.title} message={error.message} /> }
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default Adduser;
