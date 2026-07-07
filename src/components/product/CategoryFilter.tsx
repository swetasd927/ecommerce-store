// type Props = {
//   categories: string[];
//   selected: string;
//   onSelect: (value: string) => void;
// };

// function CategoryFilter({
//   categories,
//   selected,
//   onSelect,
// }: Props) {
//   return (
//     <div className="flex gap-2 flex-wrap mb-6">

//       <button
//         onClick={() => onSelect("")}
//         className="
//         border
//         px-4
//         py-2
//         rounded
//         "
//       >
//         All
//       </button>

//       {categories.map((category) => (
//         <button
//           key={category}
//           onClick={() =>
//             onSelect(category)
//           }
//           className={`
//             border
//             px-4
//             py-2
//             rounded
//             ${
//               selected === category
//                 ? "bg-black text-white"
//                 : ""
//             }
//           `}
//         >
//           {category}
//         </button>
//       ))}

//     </div>
//   );
// }

// export default CategoryFilter;


import { cn } from "../../lib/cn";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function CategoryFilter({ categories, selected, onSelect }: Props) {
  const chipClass = (active: boolean) =>
    cn(
      "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
      active
        ? "border-brand-500 bg-brand-500 text-white"
        : "border-gray-200 bg-white text-ink-600 hover:border-brand-500 hover:text-brand-600",
    );

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button onClick={() => onSelect("")} className={chipClass(selected === "")}>
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={chipClass(selected === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;