import { useState } from 'react';
import BanList from './components/BanList';
import './App.css';

function App() {
  const [dog, setDog] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchDog = async () => {
    const response = await fetch('https://api.thedogapi.com/v1/images/search?has_breeds=1');
    const data = await response.json();

    if (!data || data.length === 0 || !data[0].breeds || data[0].breeds.length === 0) {
      fetchDog();
      return;
    }

    const result = data[0];
    const name = result.breeds[0].name;
    const temperament = result.breeds[0].temperament;
    const origin = result.breeds[0].origin;
    const image = result.url;

    if (banList.includes(name) || banList.includes(temperament) || banList.includes(origin)) {
      fetchDog();
      return;
    }

    setDog({ name, temperament, origin, image });
  };

  const addToBan = (value) => {
    if (!banList.includes(value)) {
      setBanList([...banList, value]);
    }
  };

  const removeFromBan = (value) => {
    setBanList(banList.filter((item) => item !== value));
  };

  return (
    <div className="app">
      <h1>Dog Discoverer 🐶</h1>
      <button onClick={fetchDog}>Discover a Dog!</button>

      {dog && (
        <div className="dog-card">
          <img src={dog.image} alt="dog" />
          <p className="clickable" onClick={() => addToBan(dog.name)}>Breed: {dog.name}</p>
          <p className="clickable" onClick={() => addToBan(dog.temperament)}>Temperament: {dog.temperament}</p>
          <p className="clickable" onClick={() => addToBan(dog.origin)}>Origin: {dog.origin}</p>
          <p>Click an attribute to ban it!</p>
        </div>
      )}

      <BanList banList={banList} removeFromBan={removeFromBan} />
    </div>
  );
}

export default App;