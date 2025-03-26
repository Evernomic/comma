export function NothingPlaceholder({ name }: { name?: string }) {
  return (
    <div className="flex flex-col justify-center items-center p-5 border border-gray-2 rounded-md gap-3">
      <h3>Nothing here yet</h3>
      <p className="text-sm text-gray-4">
        It looks like {name} is still working on it.
      </p>
    </div>
  );
}
