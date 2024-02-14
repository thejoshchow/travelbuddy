import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex flex-column align-items-center mt-5">
                <h1>Sorry, an error occured</h1>
                <div>
                    <button className="btn" onClick={() => navigate(-1)}>
                        Go back
                    </button>
                </div>
            </div>
        </>
    );
};

export default Error;
