const Spinner = ({isLoading}) => {
    return (
        <div className={isLoading ? "spinner-border" : "d-none"} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;