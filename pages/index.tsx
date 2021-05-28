import {FormEvent, useState } from 'react';
import styles from '../styles/Home.module.css'
import {Input} from '../src/components/InputMask'
import {Header} from '../src/components/Header'
export default function Home() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [pessoas, setPessoas] = useState<TipoPessoa[]>([])
  type TipoPessoa = {
    nome: String;
    cpf: String;
    empresa: String;
  }
  function testarCPF(strCPF:String) {
    let soma:number;
      let resto:number;
      soma = 0;
    if (strCPF == "00000000000"
        ||strCPF == "11111111111"
        ||strCPF == "22222222222"
        ||strCPF == "33333333333"
        ||strCPF == "44444444444"
        ||strCPF == "55555555555"
        ||strCPF == "66666666666"
        ||strCPF == "77777777777"
        ||strCPF == "88888888888"
        ||strCPF == "99999999999"){ 
      return false;
    }
    for (let i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
     
      if ((resto == 10) || (resto == 11))  resto = 0;
      if (resto != parseInt(strCPF.substring(9, 10)) ) return false;
     
    soma = 0;
      for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      resto = (soma * 10) % 11;
     
      if ((resto == 10) || (resto == 11))  resto = 0;
      if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }

  function handleDelete(cpf:String){
    setPessoas([...pessoas.filter(pessoa=>pessoa.cpf!==cpf)]);
    return true;
  }

  function onHandleSubmit(e: FormEvent) {
    e.preventDefault()
    const pessoa: TipoPessoa = {
      nome,
      cpf,
      empresa
    }

    let cpfteste=cpf.replaceAll(".","")
    cpfteste=cpfteste.replace("-","")
    const cpfValido=testarCPF(cpfteste)
    
    if(!cpfValido){
      window.alert("CPF Invalido !!!")
    }else{
      const cpfExistente=pessoas.filter(pessoaFiltro=>pessoaFiltro.cpf===cpf)
      if(cpfExistente.length >0){
        window.alert("CPF já cadastrado,Por favor mude o valor")
      }else{
       if(!nome){
         window.alert("Por favor digite um nome")
       }else if(!empresa){
         window.alert("Por favor selecione uma empresa")
         
       }else{
        setPessoas([...pessoas, pessoa])
        setCpf('')
        setNome('')
        setEmpresa('')
       }
      }
     
    }
    
  }
  return (
    <>
    <Header/>
    <div className={styles.container}>
      <form onSubmit={onHandleSubmit} >
        <label >Nome:</label>
        <input
         type="text"
         value={nome} 
         placeholder="Por favor digite o nome da pessoa"
         onChange={e => setNome(e.target.value)} 
        />
        <label >CPF:</label>
        <span>
          <Input  value={cpf} onChange={e => setCpf(e.target.value)} />
          <button type="button" onClick={()=>setCpf('')}>
            Limpar
          </button>
          </span>
        <label>Empresa:</label>

        <select
         value={empresa}
         onChange={e => setEmpresa(e.target.value)}
        >
          <option  value=""disabled>SELECIONE UMA EMPRESA</option>  
          <option value="Empresa 1">Empresa 1</option>
          <option value="Empresa 2">Empresa 2</option>
          <option value="Empresa 3">Empresa 3</option>
          <option value="Empresa 4">Empresa 4</option>
          <option value="Empresa 5">Empresa 5</option>
          <option value="Empresa 6">Empresa 6</option>
        </select>
        <button type="submit" >
          Enviar
        </button>

        {pessoas.length>0&&(
          <div>
          <h1>Listagem de pessoas Cadastradas</h1>
          <table >
            <thead>
              <tr>
                <th>Nome </th>
                <th>CPF </th>
                <th >Empresa </th>   
                <th>Opções</th> 
              </tr>
            </thead>
            <tbody>
            {pessoas.map((pessoa, index) => {
              return (
                
                 <tr key={index}>
                   <td>{pessoa.nome}</td>
                   <td>{pessoa.cpf}</td>
                   <td>{pessoa.empresa}</td>
                   <td className={styles.botao}>
                     <button  type="button"onClick={()=>{handleDelete(pessoa.cpf)}} >
                       Remover pessoa
                    </button></td>
                 </tr>
                
              )
            })}
            </tbody>
          </table>
        </div>
        )}
      </form>


    </div>
    </>
  )
}
