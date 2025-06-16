import Weather from "./components/Weather";
import Dashboard from "./components/Dashboard";
import Suggestion from "./components/Suggestion";
import getFirebaseData from "@/lib/getFirebaseData";

const Page = async () => {
  const data = await getFirebaseData();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f0f0] to-[#ffffff] font-sans text-white">
      <main className="min-h-screen flex flex-col">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-row">
            <Weather />
            <Dashboard data={data} />
          </div>

          <Suggestion data={data} />
        </div>
      </main>
    </div>
  );
};

export default Page;
