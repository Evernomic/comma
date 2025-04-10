import { EmptyPlaceholder } from "../ui/empty-placeholder";

export default function NoPagesPlaceholder({
  description = false,
}: {
  description?: boolean;
}) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No page here yet</EmptyPlaceholder.Title>
      {description && (
        <EmptyPlaceholder.Description>
          Create a page and start writing
        </EmptyPlaceholder.Description>
      )}
    </EmptyPlaceholder>
  );
}
