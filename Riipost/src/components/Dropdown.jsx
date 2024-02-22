import useAuth from "../hooks/UseAuth";

const Dropdown = () => {
  const { token} = useAuth()

  const handleLogout = async () => {
    const response = await fetch("api/users/current", {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
    });
    const result = await response.json();

    console.log(result.data);
    window.localStorage.clear()
    window.location.reload()
  };


  return (
    <>
    {
      !token ? null :
        <div className=" w-56 right-0 absolute">
          <ul className="p-2 flex flex-col bg-black">
            <button className="border-white text-white border-2 p-1 rounded my-2">
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="border-white text-white border-2 p-1 rounded"
            >
              Logout
            </button>
          </ul>
        </div>
    }
    </>
    );
};

export default Dropdown;
