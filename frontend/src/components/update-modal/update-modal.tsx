// UpdateModal.tsx
import { useEffect, useState } from 'react';
import { FoodData } from '../../interface/FoodData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface UpdateModalProps {
  item: FoodData;
  closeModal: () => void;
  handleUpdate: (id: number, updatedItem: FoodData) => void; 
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function UpdateModal({ item, closeModal, handleUpdate }: UpdateModalProps){
    const [title, setTitle] = useState(item.title);
    const [price, setPrice] = useState(item.price);
    const [image, setImage] = useState(item.image);

    const submit = () => {
        if (item.id !== undefined) {
          handleUpdate(item.id, { id: item.id, title, image, price });
        } else {
          console.error('Erro: item.id é undefined');
        }
    }

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Atualizar Item</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    Atualizar
                </button>
            </div>
        </div>
    )
}
