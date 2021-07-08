import React, {useState} from 'react';
import Adduser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";


const App = () => {
  const [userList, setUserList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUserList((prevUserList) => {
      return [...prevUserList, {name: uName, age: uAge, id: Math.random().toString()}];
    });
  };

  return (
    <div>
      <Adduser onAddUser={addUserHandler} />
      <UsersList users={userList} />
    </div>
  );
}

export default App;
