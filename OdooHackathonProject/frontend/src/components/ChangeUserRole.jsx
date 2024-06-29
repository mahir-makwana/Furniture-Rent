import { useState } from "react";
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import SummeryApi from "../common/Summery";
import { toast } from "react-toastify";
const ChangeUserRole = ({ name, email, role2, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role2);
  const handelChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };
  console.log(userRole);
  const updateUserRole = async () => {
    const dataResponse = await fetch(SummeryApi.updateUser.url, {
      method: SummeryApi.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const responseData = await dataResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    console.log("role updated", responseData);
  };
  return (
    <div className="fixed top-0 button-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role :</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handelChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full  bg-violet-500 hover:bg-violet-700 text-white"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
