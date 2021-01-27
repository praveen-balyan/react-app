import { Formik } from 'formik';

const Form = ({ fromSubmitHandler, intervalSet }) => {
    return (
        <div className="container">
            <Formik
                initialValues={{ matrix: 3, time: 1, limit: 3 }}
                validate={values => {
                    const errors = {};
                    if (!values.matrix) {
                        errors.matrix = 'Required';
                    } else if (!/^[0-9]{1,}$/i.test(values.matrix)) {
                        errors.matrix = 'Invalid matrix';
                    } else if (values.matrix < 2 || values.matrix > 9) {
                        errors.matrix = 'Matrix value should be between 1 to 9';
                    }

                    if (!values.time) {
                        errors.time = 'Required';
                    } else if (!/^[0-9]{1,}$/i.test(values.time)) {
                        errors.time = 'Invalid time';
                    }
                    if (!values.limit) {
                        errors.limit = 'Required';
                    } else if (!/^[0-9]{1,}$/i.test(values.limit)) {
                        errors.limit = 'Invalid limit';
                    } else if (values.limit < 1 || values.limit > parseInt(values.matrix * values.matrix)) {
                        errors.limit = 'Limit value should be greater than 1 or less than matrix box count.';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        if(intervalSet){
                            clearInterval(intervalSet);
                        }
                        fromSubmitHandler(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label>Matrix</label>
                                <input name="matrix" type="text" className="form-control" value={values.matrix} onChange={handleChange} onBlur={handleBlur} />
                                <small className="text-danger"> {errors.matrix && touched.matrix ? errors.matrix : ''} </small>

                            </div>
                            <div className="form-group col-md-3">
                                <label>Time</label>
                                <input name="time" type="text" className="form-control" value={values.time} onChange={handleChange} onBlur={handleBlur} />
                                <small className="text-danger">{errors.time && touched.time ? errors.time : ''}</small>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Limit</label>
                                <input name="limit" type="text" className="form-control" value={values.limit} onChange={handleChange} onBlur={handleBlur} />
                                <small className="text-danger"> {errors.limit && touched.limit ? errors.limit : ''} </small>
                            </div>
                            <div className="form-group col-md-3">
                                <br />
                                <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>Submit</button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Form;