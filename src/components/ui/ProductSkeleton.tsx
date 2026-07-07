// function ProductSkeleton() {
//   return (
//     <div
//       className="
//       animate-pulse
//       border
//       rounded-lg
//       p-4
//       "
//     >
//       <div
//         className="
//         h-40
//         bg-gray-200
//         rounded
//         "
//       />

//       <div
//         className="
//         h-4
//         mt-4
//         bg-gray-200
//         rounded
//         "
//       />

//       <div
//         className="
//         h-4
//         w-20
//         mt-3
//         bg-gray-200
//         rounded
//         "
//       />
//     </div>
//   );
// }

// export default ProductSkeleton;

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-square bg-gray-100" />

      <div className="flex flex-col gap-2 border-t border-gray-100 p-4">
        <div className="h-3.5 w-full rounded bg-gray-200" />
        <div className="h-3.5 w-2/3 rounded bg-gray-200" />
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="mt-1 h-5 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default ProductSkeleton;