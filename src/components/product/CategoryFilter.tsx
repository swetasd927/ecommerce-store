type Props = {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">

      <button
        onClick={() => onSelect("")}
        className="
        border
        px-4
        py-2
        rounded
        "
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            onSelect(category)
          }
          className={`
            border
            px-4
            py-2
            rounded
            ${
              selected === category
                ? "bg-black text-white"
                : ""
            }
          `}
        >
          {category}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;