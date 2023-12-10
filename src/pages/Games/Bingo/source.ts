import DiagonalLeft from "../../../assets/images/bingo/diagonal-left.png";
import DiagonalRight from "../../../assets/images/bingo/diagonal-right.png";
import FullCard from "../../../assets/images/bingo/full-card.png";
import HorizontalCard from "../../../assets/images/bingo/horizontal.png";
const BingoSource = () => {
  return [
    {
      id: 1,
      title: "Diagonal Left",
      imageUrl: DiagonalLeft,
    },
    {
      id: 2,
      title: "Diagonal Right",
      imageUrl: DiagonalRight,
    },
    {
      id: 3,
      title: "Full Card",
      imageUrl: FullCard,
    },
    {
      id: 4,
      title: "Horizontal",
      imageUrl: HorizontalCard,
    },
    // Add more items as needed
  ];
};

export default BingoSource;
