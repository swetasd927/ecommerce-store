// function ProductSkeleton() {
//   return (
//     <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
//       <div className="aspect-square bg-gray-100" />

//       <div className="flex flex-col gap-2 border-t border-gray-100 p-4">
//         <div className="h-3.5 w-full rounded bg-gray-200" />
//         <div className="h-3.5 w-2/3 rounded bg-gray-200" />
//         <div className="h-3 w-1/3 rounded bg-gray-200" />
//         <div className="mt-1 h-5 w-1/2 rounded bg-gray-200" />
//       </div>
//     </div>
//   );
// }

// export default ProductSkeleton;

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="aspect-square bg-gray-100 dark:bg-gray-800"/>

      <div className="flex flex-col gap-2 border-t border-gray-100 p-4 dark:border-gray-800">
        <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-1 h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export default ProductSkeleton;