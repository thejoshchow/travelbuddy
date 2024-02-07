   
const SuccessAlert = ({isSuccess, message}) => {
    return (
        <div className={isSuccess ? 'alert alert-success' : 'd-none'} role="alert">
            {message}
        </div>
    )
}

export default SuccessAlert;