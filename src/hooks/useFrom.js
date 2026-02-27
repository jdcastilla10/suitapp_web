import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {},formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( {} );

    useEffect(() => {
        createValidators()
    }, [formState])
    
    
    /* `const isFormValid` is a boolean value that is computed using the `useMemo` hook. It checks if
    all the form fields have valid values based on the `formValidation` state. If any of the form
    fields have an error message (i.e., not null), then `isFormValid` is set to `false`. Otherwise,
    it is set to `true`. The `useMemo` hook ensures that this computation is only done when the
    `formValidation` state changes. */
    const isFormValid= useMemo(()=>{
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false
        }
        return true
    },[formValidation])

    /**
     * This is a function that updates the state of a form based on user input.
     */
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    /**
     * This function creates validators for form fields based on predefined validation rules and
     * updates the form validation state accordingly.
     */
    const createValidators =()=>{
        const formCheckedValues={}

        for (const formField of Object.keys(formValidations)) {
            const [fn,errorMessage]=formValidations[formField]

            formCheckedValues[`${formField}Valid`] = fn (formState[formField]) ? null : errorMessage
        }

        setFormValidation( formCheckedValues )

    }

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}