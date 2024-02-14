const SuccessAlert = ({ isSuccess, message }) => {
    return (
        <div
            className={isSuccess ? "alert alert-danger" : "d-none"}
            role="alert"
        >
            {message}
        </div>
    );
};

export default SuccessAlert;
