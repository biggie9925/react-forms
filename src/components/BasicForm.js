import useInput from "../hooks/use-input"

const isNotEmpty = value => value.trim() !== '';
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);


const BasicForm = () => {

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameFieldReset,
  } = useInput(isNotEmpty)

  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: phoneFieldReset,
  } = useInput(isNotEmpty)

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailFieldReset,
  } = useInput(isEmail)

  let formIsValid = false

  if (nameIsValid && phoneIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!")
    console.log(enteredName, enteredPhone, enteredEmail)

    nameFieldReset()
    phoneFieldReset()
    emailFieldReset()

  }

  const nameClasses = nameHasError ? 'form-control invalid' : 'form-control'
  const phoneClasses = phoneHasError ? 'form-control invalid' : 'form-control'
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control'


  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={nameClasses}>
          <label htmlFor='name'>Name</label>
          <input 
          type='text' id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
           />
          {nameHasError && <p className="error-text">Name cannot be blank.</p>}
        </div>
        <div className={phoneClasses}>
          <label htmlFor='phone'>Phone</label>
          <input 
          type='text' id='phone' 
          value={enteredPhone}
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          />
          {phoneHasError && <p className="error-text">Phone cannot be blank.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input 
        type='email' id='email'
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        />
        {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
