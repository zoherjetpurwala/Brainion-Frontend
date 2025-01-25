import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";
import useFetchContent from "../../hooks/useFetchContent";

const DashboardPage = () => {
  const { user } = useUser();
  const [dailyQuote, setDailyQuote] = useState("");
  const { content } = useFetchContent(user?.id);

  const events = [
    { id: 1, title: "Team Meeting", time: "10:00 AM", date: "2025-01-26" },
    { id: 2, title: "Project Deadline", time: "5:00 PM", date: "2025-01-27" },
    { id: 3, title: "Client Call", time: "3:00 PM", date: "2025-01-28" },
    {
      id: 4,
      title: "Webinar: React Best Practices",
      time: "11:00 AM",
      date: "2025-01-29",
    },
  ];
  // Fetch daily quote
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
        <Card className="md:col-span-2 p-2 flex flex-col justify-between ring-1 ring-blue-800/25 bg-white shadow-md shadow-blue-800/15 rounded-2xl transition-all duration-500 ease-in-out">
          <CardHeader>
            <h2 className="text-2xl font-bold">Daily Quote</h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic">"{dailyQuote}"</p>
          </CardContent>
        </Card>

        {/* Notes Count */}
        <Card className="lg:row-span-1 p-2 flex flex-col justify-between ring-1 ring-blue-800/25 bg-white shadow-md shadow-blue-800/15 rounded-2xl transition-all duration-500 ease-in-out">
        <CardHeader>
            <h2 className="text-2xl font-bold">Your Notes</h2>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                You have created <b>{content.length}</b> notes so far.
              </p>
            </div>
            <Link to="/notes">
              <Button>View Notes</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="lg:row-span-2 p-2 flex flex-col justify-between ring-1 ring-blue-800/25 bg-white shadow-md shadow-blue-800/15 rounded-2xl transition-all duration-500 ease-in-out">
          <CardContent>
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
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
      {/* Daily Quote */}
    </div>
  );
};

export default DashboardPage;
