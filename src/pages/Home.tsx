import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

// import { toast } from "react-toastify";
import * as Action from "@/store/actions/action";
// import * as Type from "@/store/typings/type";

const index = () => {
  const dispatch = useDispatch<Dispatch<Action.Action>>();
  // const state = useSelector((state: Type.IStore) => state.test);

  const word = `%c
  ██████╗  ██╗███╗   ██╗ ██████╗       ██╗██████╗ 
  ██╔════╝ ██║████╗  ██║██╔═══██╗     ██╔╝╚════██╗
  ██║  ███╗██║██╔██╗ ██║██║   ██║    ██╔╝  █████╔╝
  ██║   ██║██║██║╚██╗██║██║   ██║    ╚██╗  ╚═══██╗
  ╚██████╔╝██║██║ ╚████║╚██████╔╝     ╚██╗██████╔╝
   ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝       ╚═╝╚═════╝\n\nPlease like and follow me on github: https://github.com/Sirichai44
`;
  useEffect(() => {
    console.log(word, "font-family:monospace;color:#1976d2;font-size:12px;");
    dispatch({ type: "TEST_HELLO_SAGA", payload: "Hello World" });
    dispatch({ type: "TEST_ACTION", payload: "Hello World" });
  }, []);
  return (
    <div className="flex items-center justify-center w-full h-screen min-h-full">
      <div className="w-5/6 border border-red-500 h-4/6">Hello</div>
    </div>
  );
};

export default index;
