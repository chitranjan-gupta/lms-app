export interface ActivityType {
  name: string;
  date: string;
  price: string;
  cardId: number;
}

export interface DataType {
  cardId: number;
  name: string;
  number: string;
  exp: string;
  cvv: string;
  type: string;
  backgroundColor: string;
  activity: ActivityType[];
}

const data: DataType[] = [
  {
    cardId: 1,
    name: "Hello",
    number: "1234 5678 9101 1121",
    exp: "12/29",
    cvv: "123",
    type: "mastercard",
    backgroundColor: "#6d85a4",
    activity: [
      {
        name: "Netflix",
        date: "20 Min agp",
        price: "-$22.99",
        cardId: 1,
      },
      {
        name: "Spotify",
        date: "1 Hour ago",
        price: "-$10.99",
        cardId: 1,
      },
      {
        name: "Apple Music",
        date: "6 Hour ago",
        price: "-$10.99",
        cardId: 1,
      },
      {
        name: "Paypal",
        date: "1 Day ago",
        price: "+$1200",
        cardId: 1,
      },
      {
        name: "Youtube Premium",
        date: "1 Day ago",
        price: "-$10.99",
        cardId: 1,
      },
      {
        name: "Apple TV",
        date: "2 Day ago",
        price: "-$50.99",
        cardId: 1,
      },
      {
        name: "Steam",
        date: "2 Day ago",
        price: "-$50.99",
        cardId: 1,
      },
    ],
  },
  {
    cardId: 2,
    name: "Hello",
    number: "1234 5678 9101 1121",
    exp: "12/29",
    cvv: "123",
    type: "visa",
    backgroundColor: "#86b4ee",
    activity: [
      {
        name: "Paypal",
        date: "5 Min agp",
        price: "+$700",
        cardId: 2,
      },
      {
        name: "Steam",
        date: "40 min ago",
        price: "-$50.99",
        cardId: 2,
      },
    ],
  },
  {
    cardId: 3,
    name: "Hello",
    number: "1234 5678 9101 1121",
    exp: "12/29",
    cvv: "123",
    type: "visa",
    backgroundColor: "#795de7",
    activity: [
      {
        name: "Apple TV",
        date: "25 Min ago",
        price: "-$50.99",
        cardId: 3,
      },
      {
        name: "Paypal",
        date: "3 Hour agp",
        price: "+$900",
        cardId: 3,
      },
      {
        name: "Spotify",
        date: "10 Hour ago",
        price: "-$10.99",
        cardId: 3,
      },
    ],
  },
];

export { data };
