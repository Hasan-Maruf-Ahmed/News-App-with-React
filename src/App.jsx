import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ThemeToggle } from "./Component/ThemeToggle.jsx";
import { CategorySelector } from "./Component/CategorySelector.jsx";
import { NewList } from "./Component/NewList.jsx";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const PAGE_SIZE = 20;

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country: "us",
          category: category,
          page: currentPage,
          pageSize: PAGE_SIZE,
          apiKey: API_KEY,
        },
      });
      // console.log(response.data);
      setNews(response.data.articles || []);
      setTotalResults(response.data.totalResults || 0);
      setTotalPages(Math.ceil((response.data.totalResults || 0) / PAGE_SIZE));
    } catch (error) {
      setError("Failed to fetch news articles.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [category, currentPage]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };
  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-primary text-primary-content p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">News App</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="mb-6">
          <CategorySelector
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="mb-6 text-center">
          <p className="text-lg">Total Results: {totalResults}</p>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && news.length === 0 && <p>No articles found.</p>}
        {!loading && !error && news.length > 0 && (
          <>
            <NewList articles={news} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
