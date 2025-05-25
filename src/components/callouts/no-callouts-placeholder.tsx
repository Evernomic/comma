import Balancer from "react-wrap-balancer";
import { EmptyPlaceholder } from "../ui/empty-placeholder";

export default function NoExperiencesPlaceholder() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>Add your first callout</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description className="text-sm">
        <Balancer>
          A callout is a quick way to ask for help, find collaborators, or share
          an opportunity related to your project—like hiring, looking for a
          co-founder, or getting feedback.
        </Balancer>
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
}
