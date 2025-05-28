import ActiveSubs from "./active-subs";
import TotalUsers from "./total-users";

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <TotalUsers />
      <ActiveSubs />
    </div>
  );
}
