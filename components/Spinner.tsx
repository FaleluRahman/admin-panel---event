import { BarLoader, BeatLoader, BounceLoader, HashLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center"
        style={{
            minHeight: 'calc(100vh - 30rem)'
        }}
        >
           <span className="loading loading-spinner text-error"></span>
            <span className="text-xs text-gray-500 mt-3 italic">Loading...</span>
        </div>
    );
}

export default Spinner;