const Input = ({ label, isTextArea, ...props }) => {
    return <>
        <div className="mb-3">
            <label htmlFor="" className="form-label">{ label }</label>
            { !isTextArea && <input { ...props } className="form-control" /> }
            { isTextArea && <textarea { ...props } className="form-control" rows='5' /> }
        </div>

    </>
}

export default Input;

