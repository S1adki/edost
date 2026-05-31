import React, { useEffect, useState } from "react";
import { useDelivery } from "../../context/DeliveryContext";
import "./address-modal.css";

const savedAddresses = [
  "Москва, улица Воздвиженка, 3/5",
  "Москва, Тверская, 12",
  "Москва, Ленинский проспект, 45",
  "Москва, Арбат, 28",
];

const AddressModal = () => {
  const { address, setAddress, isAddressModalOpen, closeAddressModal } = useDelivery();
  const [input, setInput] = useState(address);

  useEffect(() => {
    if (isAddressModalOpen) {
      setInput(address);
    }
  }, [isAddressModalOpen, address]);

  if (!isAddressModalOpen) {
    return null;
  }

  const handleSave = () => {
    const trimmed = input.trim();
    if (trimmed.length >= 5) {
      setAddress(trimmed);
      closeAddressModal();
    }
  };

  return (
    <div
      className="address-modal__overlay"
      onClick={closeAddressModal}
      role="presentation"
    >
      <div
        className="address-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="address-modal-title"
        aria-modal="true"
      >
        <header className="address-modal__header">
          <h2 id="address-modal-title" className="address-modal__title">
            Адрес доставки
          </h2>
          <button
            className="address-modal__close"
            type="button"
            aria-label="Закрыть"
            onClick={closeAddressModal}
          >
            ×
          </button>
        </header>

        <input
          className="address-modal__input"
          type="text"
          placeholder="Введите адрес"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && handleSave()}
        />

        <p className="address-modal__hint">Сохранённые адреса</p>
        <ul className="address-modal__list">
          {savedAddresses.map((item) => (
            <li key={item}>
              <button
                className={`address-modal__option${
                  input === item ? " address-modal__option--active" : ""
                }`}
                type="button"
                onClick={() => setInput(item)}
              >
                <span aria-hidden="true">⌂</span>
                {item}
              </button>
            </li>
          ))}
        </ul>

        <button className="address-modal__save" type="button" onClick={handleSave}>
          Сохранить адрес
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
