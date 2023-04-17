import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './service/api';
import { useQuery } from 'react-query';

function App() {
  const [input, setInput] = useState('');
  const { data: cep } = useQuery(
    ['cep', input],
    () => {
      return api.get(`${input}/json`);
    },
    {
      enabled: !!input,
      select: (data) => {
        return data.data;
      },
    }
  );

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch">
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {cep && Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;