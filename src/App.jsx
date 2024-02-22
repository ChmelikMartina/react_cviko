import { useState } from "react";
import rawData from "./FishData.json";
import FishList from "./components/FishList/FishList";
import Toggler from "./components/Toggler/Toggler";
import FishForm from "./components/FishForm/FishForm";
import AquariumForm from "./components/AquariumForm/AquariumForm";

function App() {
  const [listOfFish, setListOfFish] = useState(rawData.fish);
  const [activeTab, setActiveTab] = useState(1);
  const [valid, setValid] = useState(false);
  const [newFish, setNewFish] = useState({
    id:
      listOfFish.length > 0
        ? Math.max(...listOfFish.map((fish) => fish.id)) + 1
        : 1,
    name: "",
    kind: "small",
  });

  const handleDelete = (idToDelete) => {
    setListOfFish(listOfFish.filter((fish) => fish.id !== idToDelete));
  };

  const handleChoose = (source) => {
    switch (source) {
      case "list-of-fish": {
        setActiveTab(1);
        break;
      }
      case "aquarium": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  const validateData = (fish) => {
    if (fish.name.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (e) => {
    const updatedFish = {
      ...newFish,
      [e.target.name]: e.target.value,
      [e.target.id]: e.target.value,
    };
    validateData(updatedFish);
    setNewFish(updatedFish);
  };

  const handleAdd = () => {
    setListOfFish((listOfFish) => {
      return [...listOfFish, newFish];
    });
    const newFishId = newFish.id + 1;
    const updatedFish = {
      id: newFishId,
      name: "",
      kind: "small",
    };
    setNewFish(updatedFish);
    validateData(updatedFish);
  };

  return (
    <div className="App">
      <Toggler active={activeTab} onChoose={handleChoose} />
      {activeTab === 1 && (
        <>
          <FishList data={listOfFish} onDelete={handleDelete} />
          <FishForm
            data={newFish}
            validation={valid}
            onChange={handleChange}
            onAdd={handleAdd}
          ></FishForm>
        </>
      )}
      {activeTab === 2 && (
        <>
          <h3>Create new aquarium</h3>
          <AquariumForm data={listOfFish} />
        </>
      )}
    </div>
  );
}

export default App;
