import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import axios from "axios";
import { motion } from "framer-motion";
import useFetchContent from "../../hooks/useFetchContent";
import { useUserStore } from "../../store/useUserStore";

const DashboardPage = () => {
  const { user } = useUserStore();
  const [dailyQuote, setDailyQuote] = useState("");
  const { getCountByType } = useFetchContent(user?.id);

  const events = [
    { id: 1, title: "Coming Soon", time: "10:00 AM", date: "2025-01-26" },
  ];

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(
          "https://quotes-api-self.vercel.app/quote"
        );
        setDailyQuote(response.data.quote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        <Card
          className={`md:col-span-2 p-2 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out`}
        >
          <CardHeader className="p-2 border-b">
            <CardTitle className="flex justify-between items-center p-0">
              <h1 className="text-lg font-semibold text-primary">
                Daily Quote
              </h1>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-2 flex-auto overflow-hidden">
            <div className="flex h-full items-center text-lg">
              <p className="text-gray-800 py-4">{dailyQuote}</p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:row-span-3 space-y-4">
          <Card
            className={`lg:row-span-1 p-2 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out`}
          >
            <CardHeader className="p-2 border-b">
              <CardTitle className="flex justify-between items-center p-0">
                <h1 className="text-lg font-semibold text-primary">
                  Your Notes
                </h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 flex-auto overflow-hidden h-20">
              <div className="flex h-fullitems-center">
                <p className="text-gray-800">
                  You have created <b>{getCountByType("NOTE")}</b> notes so far.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`lg:row-span-1 p-2 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out`}
          >
            <CardHeader className="p-2 border-b">
              <CardTitle className="flex justify-between items-center p-0">
                <h1 className="text-lg font-semibold text-primary">
                  Your Documents
                </h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 flex-auto overflow-hidden h-20">
              <div className="flex h-fullitems-center">
                <p className="text-gray-800">
                  You have created <b>{getCountByType("DOCUMENT")}</b> document
                  so far.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`lg:row-span-1 p-2 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out`}
          >
            <CardHeader className="p-2 border-b">
              <CardTitle className="flex justify-between items-center p-0">
                <h1 className="text-lg font-semibold text-primary">
                  Your Links
                </h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-2 flex-auto overflow-hidden h-20">
              <div className="flex h-fullitems-center">
                <p className="text-gray-800">
                  You have created <b>{getCountByType("ALL")}</b> links so far.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <Card className="lg:row-span-3 p-2 flex flex-col justify-between border border-blue-800/25 bg-white rounded-md transition-all duration-500 ease-in-out max-h-[462px] overflow-y-auto">
          <CardHeader className="p-2 border-b">
            <CardTitle className="flex justify-between items-center p-0">
              <h1 className="text-lg font-semibold text-primary">
                Upcoming Events (WIP)
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex-auto overflow-y-auto">
            {events.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {events.map((event) => (
                  <motion.li
                    key={event.id}
                    className="p-4 bg-gray-100 rounded-lg shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-gray-600">
                      {new Date(event.date).toLocaleString()}
                    </p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-600">
                No upcoming events scheduled.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
