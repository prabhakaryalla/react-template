import { json } from "stream/consumers";
import { useUserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { Typography } from "@mui/material";


const EditUser = () => {
    const { users, setUsers  } = useUserContext();
    const { id  } = useParams();
    const currentUser = users.find(x => x.id.toString() === id);

    return (
        currentUser ?  <UserForm user={currentUser} />: <Typography>No User found in the context to edit.</Typography>);
}

export default EditUser;