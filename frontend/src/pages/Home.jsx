import { useState, useEffect } from "react";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import {StoryCard} from "../components/StoryCard.jsx";
import "../styles/Home.css"

export const Home = () => {
  const { token } = useAuth();

  const [stories, setStories] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStories();
  }, [page]);

  useEffect(() => {
    if (token) fetchBookmarks();
    else setBookmarkedIds([]);
  }, [token]);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/stories?page=${page}&limit=10`);
      setStories(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load stories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const { data } = await api.get("/stories/bookmarks");
      setBookmarkedIds(data.data.map((s) => s._id));
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err.message);
    }
  };

  const handleBookmarkToggle = (updatedBookmarks) => {
    setBookmarkedIds(updatedBookmarks.map((id) => id.toString()));
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
          <h1 className="home__title">Top Stories</h1>
          <p className="home__subtitle">Scraped from Hacker News</p>
        </div>

        {loading && (
          <div className="home__state">
            <p className="home__loading">Loading stories...</p>
          </div>
        )}

        {error && (
          <div className="home__state">
            <p className="home__error">{error}</p>
            <button className="home__retry" onClick={fetchStories}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="home__list">
              {stories.map((story) => (
                <StoryCard
                  key={story._id}
                  story={story}
                  bookmarkedIds={bookmarkedIds}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </div>

            <div className="home__pagination">
              <button
                className="home__page-btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
              >
                ← Prev
              </button>
              <span className="home__page-info">
                Page {page} of {totalPages}
              </span>
              <button
                className="home__page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
