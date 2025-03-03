import { EmptyPlaceholder } from "../ui/empty-placeholder";

export default function NoExperiencesPlaceholder() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No experiences here yet</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Add your first workplace
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
}
