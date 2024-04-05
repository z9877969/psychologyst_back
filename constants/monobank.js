const DELIVERY_METHOD_LIST = {
  PICKUP: 'pickup', // самовивіз
  COURIER: 'courier', // кур'єр
  NP: 'np_brnm', // Нова Пошта
};

const PAYMENT_METHOD_LIST = {
  CARD: 'card', // карта
  PAYMENT_ON_DELIVERY: 'payment_on_delivery', // оплата при доставці
  PART_PURCHASE: 'part_purchase', // Покупка частинами
  PAYMENT_NUMBER: 'payments_number', // Кількість платежів покупки частинами (обов'язково для payment_methods=["part_purchase"])  мінімум 3 частини, іначе ПЧ не відображаеться
};

module.exports = {
  DELIVERY_METHOD_LIST,
  PAYMENT_METHOD_LIST,
};
