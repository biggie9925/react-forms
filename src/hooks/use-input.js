import { useReducer } from "react"


const initialInputState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {

  if (action.type === 'INPUT') {
    return {
      value: action.value, 
      isTouched: state.isTouched
    }
  }

  if (action.type === 'BLUR') {
    return {
      isTouched: true,
      value: state.value,
    }
  }

  if (action.type === 'RESET') {
    return {
      isTouched: false,
      value: '',
    }
  }

  return inputStateReducer
}

const useInput = (validateValue) => {

  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  //const [enteredValue, setEnteredValue] = useState('') -> using state
  //const [isTouched, setIsTouched] = useState(false) -> using state


  const valueIsValid = validateValue(inputState.value)
  //const valueIsValid = validateValue(enteredValue) -> using state
  const hasError = (!valueIsValid && inputState.isTouched) || (!inputState.value && inputState.isTouched);
  //const hasError = (!valueIsValid && isTouched) || (!enteredValue && isTouched); -> using state

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})

    //setEnteredValue(event.target.value) -> using state
  }

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'})

    ///setIsTouched(true); -> using state
  }

  const reset = (event) => {
    dispatch({type: 'RESET'})

    //setEnteredValue('') -> using state
    //setIsTouched(false)
  }

  return {
    value: inputState.value,
    //value: enteredValue, -> using state
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useInput