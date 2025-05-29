import ActiveSubs from "./active-subs";
import Timeseries from "./timeseries";
import TotalUsers from "./total-users";

export default async function Stats() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <TotalUsers />
      <ActiveSubs />
      <Timeseries />
    </div>
  );
}
