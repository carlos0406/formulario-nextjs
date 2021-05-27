import { useState } from 'react';
import styles from '../styles/Home.module.css'


export default function Home () {
  const [nome,setNome]= useState('')
  const [cpf,setCpf]= useState('')
  const [empresa,setEmpresa]= useState('')
  const [cadastros,setCadastrados]=useState('')
  return (
    <div className={styles.container}>
      <form >
      <label htmlFor="">Nome</label>
      <input type="text" />
      <label htmlFor="">CPF</label>
      <input type="text" />
      <label htmlFor="">Empresa</label>
      <input type="text" />
      <button>
        Enviar
      </button>
      </form>
    </div>
  )
}
