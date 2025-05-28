import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";

export default function NoLogsPlaceholder({
  description = false,
}: {
  description?: boolean;
}) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No logs here yet</EmptyPlaceholder.Title>
      {description && (
        <EmptyPlaceholder.Description>
          Write an changelog and publish
        </EmptyPlaceholder.Description>
      )}
    </EmptyPlaceholder>
  );
}
