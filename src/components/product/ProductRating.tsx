import { Rate } from "antd";

type ProductRatingProps = {
  rate: number;
  count: number;
};

function ProductRating({ rate, count }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Rate disabled allowHalf defaultValue={rate} className="text-xs! text-accent-500!" />
      <span className="text-ink-secondary text-xs">({count})</span>
    </div>
  );
}

export default ProductRating;