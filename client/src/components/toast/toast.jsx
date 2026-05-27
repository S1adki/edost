import React from "react";
import { useCart } from "../../context/CartContext";
import "./toast.css";

const Toast = () => {
  const { toast } = useCart();

  if (!toast) {
    return null;
  }

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        ✓
      </span>
      {toast}
    </div>
  );
};

export default Toast;
