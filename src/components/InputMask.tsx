import InputMask from 'react-input-mask';
export function Input({value,onChange}){
    return(
        <InputMask 
         mask="999.999.999-99"
         value={value} 
         onChange={onChange}
         type="text"
         placeholder="Por favor digite o CPF da pessoa"
        />
    )
}