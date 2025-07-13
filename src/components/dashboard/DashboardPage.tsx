import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import axios from "axios";
import { motion } from "framer-motion";
import useFetchContent from "../../hooks/useFetchContent";
import { useUserStore } from "../../store/useUserStore";
import { useContentStore } from "../../store/useContentStore";
import { Quote, StickyNote, FileText, ExternalLink, Calendar } from "lucide-react";

const DashboardPage = () => {
  const { user } = useUserStore();
  const { contentUpdated } = useContentStore();
  const [dailyQuote, setDailyQuote] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(true);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const { getCountByType, fetchData } = useFetchContent(user?.id);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Add artificial delay to see skeleton
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/daily-quote`
        );
        setDailyQuote(response.data.quote);
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setLoadingQuote(false);
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoadingCounts(true);
      // Add artificial delay to see skeleton
      await new Promise(resolve => setTimeout(resolve, 1500));
      await fetchData();
      setLoadingCounts(false);
    };

    if (contentUpdated) {
      loadData();
      useContentStore.setState({ contentUpdated: false });
    } else {
      loadData(); // load on mount
    }
  }, [contentUpdated]);

  const events = [
    { id: 1, title: "Coming Soon", time: "10:00 AM", date: "2025-01-26" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div 
        className="grid grid-cols-2 max-sm:grid-cols-1 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Daily Quote */}
        <motion.div variants={cardVariants} className="md:col-span-2">
          <Card className="border border-blue-800/25 bg-blue-50/30 hover:bg-blue-50/50 rounded-2xl transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-[1.01] overflow-hidden">
            <CardHeader className="p-6 bg-blue-100/40 border-b border-blue-200/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-700/90 rounded-xl">
                  <Quote className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Daily Quote</h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="min-h-[80px] flex items-center">
                {loadingQuote ? (
                  <div className="w-full space-y-3">
                    <Skeleton className="h-4 w-full bg-blue-200/60 rounded-lg" />
                    <Skeleton className="h-4 w-3/4 bg-blue-200/60 rounded-lg" />
                  </div>
                ) : (
                  <blockquote className="text-lg italic text-gray-700 leading-relaxed font-medium">
                    "{dailyQuote}"
                  </blockquote>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notes */}
        <motion.div variants={cardVariants}>
          <Card className="border border-blue-800/25 bg-blue-50/30 hover:bg-blue-50/50 rounded-2xl transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-[1.02] overflow-hidden h-full">
            <CardHeader className="p-5 bg-blue-100/40 border-b border-blue-200/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-700/90 rounded-xl">
                  <StickyNote className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-lg font-bold text-gray-800">Your Notes</h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5">
              <div className="min-h-[60px] flex items-center">
                {loadingCounts ? (
                  <div className="w-full">
                    <Skeleton className="h-4 w-full bg-blue-200/60 rounded-lg" />
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <div className="text-3xl font-bold text-blue-700 mb-1">
                      {getCountByType("NOTE")}
                    </div>
                    <p className="text-gray-600 text-sm font-medium">
                      Notes created
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents */}
        <motion.div variants={cardVariants}>
          <Card className="border border-blue-800/25 bg-blue-50/30 hover:bg-blue-50/50 rounded-2xl transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-[1.02] overflow-hidden h-full">
            <CardHeader className="p-5 bg-blue-100/40 border-b border-blue-200/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-700/90 rounded-xl">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-lg font-bold text-gray-800">Your Documents</h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5">
              <div className="min-h-[60px] flex items-center">
                {loadingCounts ? (
                  <div className="w-full">
                    <Skeleton className="h-4 w-full bg-blue-200/60 rounded-lg" />
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <div className="text-3xl font-bold text-blue-700 mb-1">
                      {getCountByType("DOCUMENT")}
                    </div>
                    <p className="text-gray-600 text-sm font-medium">
                      Documents created
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Links */}
        <motion.div variants={cardVariants}>
          <Card className="border border-blue-800/25 bg-blue-50/30 hover:bg-blue-50/50 rounded-2xl transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-[1.02] overflow-hidden h-full">
            <CardHeader className="p-5 bg-blue-100/40 border-b border-blue-200/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-700/90 rounded-xl">
                  <ExternalLink className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-lg font-bold text-gray-800">Your Links</h1>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5">
              <div className="min-h-[60px] flex items-center">
                {loadingCounts ? (
                  <div className="w-full">
                    <Skeleton className="h-4 w-full bg-blue-200/60 rounded-lg" />
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <div className="text-3xl font-bold text-blue-700 mb-1">
                      {getCountByType("LINK")}
                    </div>
                    <p className="text-gray-600 text-sm font-medium">
                      Links created
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Events */}
        <motion.div variants={cardVariants}>
          <Card className="lg:row-span-3 border border-blue-800/25 bg-blue-50/30 hover:bg-blue-50/50 rounded-2xl transition-all duration-500 ease-in-out hover:shadow-xl overflow-hidden max-h-[400px]">
            <CardHeader className="p-5 bg-blue-100/40 border-b border-blue-200/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-700/90 rounded-xl">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-lg font-bold text-gray-800">
                  Upcoming Events
                </h1>
                <span className="text-xs bg-blue-200/60 text-blue-700 px-2 py-1 rounded-full font-medium">
                  WIP
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-5 overflow-y-auto">
              {events.length > 0 ? (
                <ul className="space-y-3">
                  {events.map((event) => (
                    <motion.li
                      key={event.id}
                      className="p-4 bg-white/80 rounded-xl shadow-sm border border-blue-200/30 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 text-sm font-medium">
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-500 text-center font-medium">
                    No upcoming events scheduled
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;