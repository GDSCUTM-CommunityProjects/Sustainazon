const generateTmpData = () => {
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
    });
  }
  return tmpData;
};

const generateTmpFeaturedData = () => {
  const tmpData = [];
  for (let i = 0; i < 4; i++) {
    tmpData.push({
      id: i,
      itemName: "Faux Leather Backpack",
      price: 65.99,
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Faux Leather Backpack",
      tag: "Handmade Bags",
      rating: Math.random() * (5 - 0 + 1) + 0,
      numReviews: Math.floor(Math.random() * (50 - 0 + 1) + 0),
    });
  }
  return tmpData;
};

const generateTmpCarouselData = () => {
  const tmpData = [];
  for (let i = 0; i < 4; i++) {
    tmpData.push({
      imgUrl: "https://github.com/hiimchrislim.png",
      imgAlt: "Hiimchrislim",
      heading: `Heading: ${
        i + 1
      }: Upcycling plastic waste into more valuable materials could make recycling pay itself`,
      description: `Photo: ${
        i + 1
      }: A new and simple method for upcycling plastic waste at room temperature has been developed by a team of researchers at the Centre for Sustainable and Circular Technologies (CSCT) at the University of Bath. The researchers hope the new process will help recycling become more economically viable`,
    });
  }
  return tmpData;
};

export const tmpFeatureData = generateTmpFeaturedData();
export const tmpSearchData = generateTmpData();
export const tmpCarouselData = generateTmpCarouselData();
