import { cards } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className="flex g-2 mt-2">
      <div className="flex flex-3 flex-col g-2">
        <div className="flex g-2 justify-between">
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className="flex-1">
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
