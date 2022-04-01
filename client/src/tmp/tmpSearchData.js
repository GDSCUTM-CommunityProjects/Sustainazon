const generateSearchData = () => {
  const tmpData = [];
  for (let i = 0; i < 5; i++) {
    tmpData.push({
      id: i,
      itemName: "Faux Leather Backpack",
      price: 65.99,
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Faux Leather Backpack",
      tag: "Handmade Bags",
      rating: Math.random() * (5 - 0 + 1) + 0,
      numReviews: Math.floor(Math.random() * (50 - 0 + 1) + 0),
      points: Math.floor(Math.random() * (100 - 0 + 20) + 0),
    });
  }
  return tmpData;
};

const generateOrderData = () => {
  const tmpData = [];
  for (let i = 0; i < 3; i++) {
    tmpData.push({
      id: i,
      itemName: "Faux Leather Backpack",
      price: 65.99,
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Faux Leather Backpack",
      tag: "Handmade Bags",
      orderDate: "February 25th, 2022",
      status:
        Math.floor(Math.random() * (1 - 0 + 1) + 0) % 2 === 0
          ? "Shipping"
          : "Delivered",
      lastUpdated: "February 26th, 2022",
      points: Math.floor(Math.random() * (100 - 0 + 20) + 0),
      quantity: Math.floor(Math.random() * (3 - 1 + 3) + 1),
    });
  }
  return tmpData;
};

const generateAccountInformation = () => {
  return {
    name: "Chris Lim",
    email: "hello@hiimchrislim.co",
    points: 505,
    billingAddress: "1234 Banana Road, Mississauga, ON L5B2C9",
    shippingAddress: "1234 Banana Road, Mississauga, ON L5B2C9",
  };
};

const generateFeaturedData = () => {
  const tmpData = [];
  // for (let i = 0; i < 4; i++) {
  //   tmpData.push({
  //     id: i.toString(),
  //     itemName: "Faux Leather Backpack",
  //     price: 65.99,
  //     imgUrl: "https://github.com/hiimchrislim.png",
  //     imgAlt: "Faux Leather Backpack",
  //     tag: "Handmade Bags",
  //     rating: Math.random() * (5 - 0 + 1) + 0,
  //     numReviews: Math.floor(Math.random() * (50 - 0 + 1) + 0),
  //     points: Math.floor(Math.random() * (100 - 0 + 20) + 0),
  //   });
  // }
  tmpData.push({
    id: "3WbqhVXMOXVDRUSBnwQB",
    itemName: "Wood Toothbrush (2pc)",
    price: 5.99,
    imgUrl: "/toothbrush.png",
    imgAlt: "Wood Toothbrush (2pc)",
    tag: "Handmade",
    rating: 3.5,
    numReviews: 102,
    pointsCost: 100,
  });
  tmpData.push({
    id: "3WbSIOXMOXVDRUSBnwQB",
    itemName: "Faux Leather Backpack",
    price: 65.99,
    imgUrl: "/backpack.png",
    imgAlt: "Faux Leather Backpack",
    tag: "Handmade Bags",
    rating: 4.5,
    numReviews: 88,
    pointsCost: 106,
  });
  tmpData.push({
    id: "3WbqhVMSOXVDRUSBnwQB",
    itemName: "Reusable Bottles (3pc)",
    price: 10.99,
    imgUrl: "/waterbottle.png",
    imgAlt: "Reusable Bottles",
    tag: "Local",
    rating: 5,
    numReviews: 24,
    pointsCost: 111,
  });
  tmpData.push({
    id: "3WbqhPsYOXVDRUSBnwQB",
    itemName: "One of a Kind Hoop Earrings",
    price: 112.99,
    imgUrl: "/earrings.png",
    imgAlt: "earrings",
    tag: "Recycled Materials",
    rating: 2.5,
    numReviews: 12,
    pointsCost: 203,
  });
  return tmpData;
};

const generateCarouselData = () => {
  const tmpData = [];
  tmpData.push({
    imgUrl: "/recyclingBin.png",
    imgAlt: "Recycling Bin",
    heading: `Upcycling plastic waste into more valuable materials could make recycling pay itself`,
    description: `A new and simple method for upcycling plastic waste at room temperature has been developed by a team of researchers at the Centre for Sustainable and Circular Technologies (CSCT) at the University of Bath. The researchers hope the new process will help recycling become more economically viable.
`,
  });
  tmpData.push({
    imgUrl: "/cardboard.jpg",
    imgAlt: "cardboard",
    heading: "‘Community’ Cardboard Shredding in Hawaii is Making a Change",
    description:
      "The US Environmental Protection Agency (EPA) said that paper and cardboard made up the most of municipal waste in 2018. Americans threw away 76.4 tons of cardboard waste. A cardboard shredding organization (Circle Pack) founded by Evan Lam has come up with solutions that are better for the environment.",
  });
  return tmpData;
};

const generateShoppingCartData = () => {
  const tmpData = [];
  for (let i = 0; i < 3; i++) {
    tmpData.push({
      id: i,
      quantity: Math.floor(Math.random() * (3 - 0 + 1) + 1),
    });
  }
  return tmpData;
};

const generateShoppingCartItemData = () => {
  return {
    imgSrc: "https://github.com/hiimchrislim.png",
    imgAlt: "Hiimchrislim",
    itemName: "Faux Leather Bag",
    points: Math.floor(Math.random() * (100 - 0 + 20) + 0),
    price: 65.99,
    companyName: "hiimchrislim",
  };
};

export const tmpSearchData = generateSearchData();
export const tmpOrderData = generateOrderData();
export const tmpAccountData = generateAccountInformation();
export const tmpFeatureData = generateFeaturedData();
export const tmpCarouselData = generateCarouselData();
export const tmpShoppingCartData = generateShoppingCartData();
export const tmpShoppingCartItemData = generateShoppingCartItemData();
