import InputMask from 'react-input-mask';
export function Input({value,onChange,placeholder,id}){
    return(
        <InputMask 
         id={id}
         mask="999.999.999-99"
         value={value} 
         onChange={onChange}
         type="text"
         placeholder={placeholder}
        />
    )
}