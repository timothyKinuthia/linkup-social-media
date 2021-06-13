import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import ShowModal from "./ShowModal";
import Toast from "./Toast";

const Notify = () => {
    const { notify } = useSelector((state) => ({ ...state }));
    
    const dispatch = useDispatch();

  return (
    <div>
      {notify.loading && <Loading />}
      {notify.success && (
        <Toast msg={{ title: "Success", body: notify.success }} handleShow={() => dispatch({type: "NOTIFY", payload: {}})} bgColor="bg-green-500" />
      )}
      {notify.error && (
        <Toast msg={{title: 'Error', body: notify.error}} handleShow={() => dispatch({type: "NOTIFY", payload: {}})} bgColor="bg-red-700" />
      )}

      {notify.showResult && <ShowModal/>}
    </div>
  );
};

export default Notify;
