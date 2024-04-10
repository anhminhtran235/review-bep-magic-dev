interface DFood {
  _id: string;
  name: string;
  image_url?: string;
  price: number;
  category: string;
  description?: string;
  is_displayed: boolean;
  nutritional_value: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

interface DOrderItem {
  food: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface DCart {
  _id: string;
  orders: [
    {
      food_id: string;
      quantity: number;
    }
  ];
  grand_total: number;
  phone_number: string;
  delivery_address: string;
  is_resolved: boolean;
}

interface DBlog {
  _id: string;
  title: string;
  banner_url?: string;
  paragraphs: [string];
}

interface DUser {
  _id: string;
  username: string;
  password: string;
  role: string;
  notification_token?: string;
}
