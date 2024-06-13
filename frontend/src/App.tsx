import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { UpdateModal } from './components/update-modal/update-modal';
function App() {
  
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<FoodData | null>(null); 
  const [foodData, setData] = useState<FoodData[]>([]);
  
  const handleOpenModal = (item?: FoodData) => {
    setItemToUpdate(item || null);
    setIsModalOpen(prev => !prev);
  }

  const handleUpdate = (id: number, updatedItem: FoodData) => {
    fetch(`http://localhost:8080/food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
    .then(() => {
      const newData = foodData.map(foodData => foodData.id === id ? updatedItem : foodData);
      setData(newData);
      window.location.reload()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleDelete = (id:number) => {
    fetch(`http://localhost:8080/food/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        const newData = foodData.filter(foodData => foodData.id !== id);
        setData(newData);
        window.location.reload()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


return (
  <div className="container">
    <h1 className='titulo'>Cardápio</h1>
    <div className="card-grid">
      {data?.map(foodData => 
        <Card
          price={foodData.price} 
          title={foodData.title} 
          image={foodData.image}
        >
          {isModalOpen && itemToUpdate && <UpdateModal item={itemToUpdate} closeModal={handleOpenModal} handleUpdate={handleUpdate}/>}
          {foodData.id !== undefined && <button className='botaoImg' onClick={() => handleDelete(foodData.id)}>Deletar</button>}
          {foodData.id !== undefined && <button className='botaoImg' onClick={() => handleOpenModal(foodData)}>Atualizar</button>}
        </Card>
      )}
    </div>
    {isModalOpen && !itemToUpdate && <CreateModal closeModal={handleOpenModal}/>}
    <button className="botaoNovo" onClick={() => handleOpenModal()}>Novo</button>
  </div>
)
}
export default App