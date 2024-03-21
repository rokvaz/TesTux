import { useState, useEffect } from 'react';

export default function MySQLWriteTest() {
  const [formData, setFormData] = useState({
    pavadinimas: '',
  });

  const [formDataKlausimai, setFormDataKlausimai] = useState({
    tekstas: '',
    testo_id: ''
  });

  const [formDataAtsakymai, setFormDataAtsakymai] = useState({
    tekstas: '',
    klausimo_id: '',
    teisignas: ''
  });

  const [formDataRezultatai, setFormDataRezultatai] = useState({
    zaidejo_vardas: '',
    data: '',
    taskai: '',
    testo_id: ''
  });

  const [responseData, setResponseData] = useState(null);
  const [responseDataKlausimai, setResponseDataKlausimai] = useState(null);
  const [responseDataAtsakymai, setResponseDataAtsakymai] = useState(null);
  const [responseDataRezultatai, setResponseDataRezultatai] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeKlausimai = (e) => {
    const { name, value } = e.target;
    setFormDataKlausimai(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeAtsakymai = (e) => {
    const { name, value } = e.target;
    setFormDataAtsakymai(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeRezultatai = (e) => {
    const { name, value } = e.target;
    setFormDataRezultatai(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('api/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Data successfully written to the database');
        const dataResponse = await fetch(`api/read?pavadinimas=${formData.pavadinimas}`);
        if (dataResponse.ok) {
          const data = await dataResponse.json();
          setResponseData(data);
        }
      } else {
        throw new Error('Failed to write data to the database');
      }
    } catch (error) {
      console.error('Error writing data to the database:', error);
    }
  };

  const handleSubmitKlausimai = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/writek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataKlausimai)
      });
      if (response.ok) {
        console.log('Data successfully written to the database');
        const dataResponse = await fetch(`api/readk?tekstas=${formDataKlausimai.tekstas}`);
        if (dataResponse.ok) {
          const data = await dataResponse.json();
          console.log('Response data from API:', data);
          setResponseDataKlausimai(data);
        }
        setFormDataKlausimai({ tekstas: '', testo_id: '' });
      } else {
        throw new Error('Failed to write data to the database');
      }
    } catch (error) {
      console.error('Error writing data to the database:', error);
    }
  };

  const handleSubmitAtsakymai = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/writea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataAtsakymai)
      });
      if (response.ok) {
        const dataResponse = await fetch(`api/reada`);
        if (dataResponse.ok) {
          const data = await dataResponse.json();
          setResponseDataAtsakymai(data);
        }
        console.log('Data successfully written to the database');
        setFormDataAtsakymai({ tekstas: '', klausimo_id: '', teisignas: '' });
      } else {
        throw new Error('Failed to write data to the database');
      }
    } catch (error) {
      console.error('Error writing data to the database:', error);
    }
  };

  
  const handleSubmitRezultatai = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/writepl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataRezultatai)
      });
      if (response.ok) {
        const dataResponse = await fetch(`api/reada`);
        if (dataResponse.ok) {
          const data = await dataResponse.json();
          setResponseDataRezultatai(data);
        }
        console.log('Data successfully written to the database');
        setFormDataRezultatai({ zaidejo_vardas: '', data: '', taskai: '', testo_id: ''});
      } else {
        throw new Error('Failed to write data to the database');
      }
    } catch (error) {
      console.error('Error writing data to the database:', error);
    }
  };

  return (
    <div>
      <h1>Duomenu ivedimas</h1>
      <h2>Klausimyno sukurimas</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pavadinimas:
          <input type="text" name="pavadinimas" value={formData.pavadinimas} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {responseData && (
        <div>
          <pre></pre><p>Klausimynas sukurtas su id:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}


      <form onSubmit={handleSubmitKlausimai}>
        <h2>Klausimu irasymas</h2>
        <label>
          Tekstas:
          <input type="text" name="tekstas" value={formDataKlausimai.tekstas} onChange={handleChangeKlausimai} />
        </label>
        <label>
          Testo ID:
          <input type="text" name="testo_id" value={formDataKlausimai.testo_id} onChange={handleChangeKlausimai} />
        </label>
        <button type="submit">Submit Klausimai</button>
      {responseDataKlausimai !== null && (
      <div>
        <p>Klausimas sukurtas su id: {responseDataKlausimai.id}</p>
        
      </div>
      )}
      </form>


      <form onSubmit={handleSubmitAtsakymai}>
      <h2>Atsakymu irasymas (silent)</h2>
        <label>
          Tekstas:
          <input type="text" name="tekstas" value={formDataAtsakymai.tekstas} onChange={handleChangeAtsakymai} />
        </label>
        <label>
          Klausimo ID:
          <input type="text" name="klausimo_id" value={formDataAtsakymai.klausimo_id} onChange={handleChangeAtsakymai} />
        </label>
        <label>
          Teisignas (1 or 0):
          <input type="text" name="teisignas" value={formDataAtsakymai.teisignas} onChange={handleChangeAtsakymai} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {responseDataAtsakymai !== null && (
        <div>
          <p>Ivesta</p>
        </div>
      )}

      <form onSubmit={handleSubmitRezultatai}>
      <h2>Rezultatų įrašymas (silent)</h2>
      <label>
        Žaidėjo vardas:
        <input type="text" name="zaidejo_vardas" value={formDataRezultatai.zaidejo_vardas} onChange={handleChangeRezultatai} />
      </label>
      <label>
        Data:
        <input type="text" name="data" value={formDataRezultatai.data} onChange={handleChangeRezultatai} />
      </label>
      <label>
        Taškai:
        <input type="text" name="taskai" value={formDataRezultatai.taskai} onChange={handleChangeRezultatai} />
      </label>
      <label>
        Testo ID:
        <input type="text" name="testo_id" value={formDataRezultatai.testo_id} onChange={handleChangeRezultatai} />
      </label>
      <button type="submit">Submit</button>
    </form>
    {responseDataRezultatai !== null && (
      <div>
        <p>Įvesta</p>
      </div>
    )}

    </div>
    

    
  );
}
