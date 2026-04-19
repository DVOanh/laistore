import { useEffect } from "react";

function UserAdmin(){
    useEffect(() => {
                    document.title = "Quản lý người dùng";
                }, []);
    return (
        <h1>User</h1>
    )
}

export default UserAdmin;