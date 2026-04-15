export const profileTabs = ["Мои данные", "Мои заказы"];

export const initialProfileForm = {
  fullName: "",
  gender: "male",
  birthDate: "",
  phone: "",
  email: "",
  address: "",
};

export const genderOptions = [
  { value: "male", label: "М" },
  { value: "female", label: "Ж" },
];

export const profileOrders = [
  {
    id: "ED-2401",
    title: "Вкусно - и точка",
    date: "14 апреля 2026",
    status: "Доставлен",
    items: "Гранд де люкс, Флэт Уайт, Картофель фри",
    total: "603 ₽",
  },
  {
    id: "ED-2317",
    title: "Братья Караваевы",
    date: "11 апреля 2026",
    status: "Доставлен",
    items: "Сырники, салат, латте",
    total: "890 ₽",
  },
  {
    id: "ED-2284",
    title: "Вкусвилл",
    date: "8 апреля 2026",
    status: "Доставлен",
    items: "Готовая еда, напитки, десерт",
    total: "1 240 ₽",
  },
];
