import { useState, useEffect } from "react";
import api from "../api/axios.js";
import {StoryCard} from "../components/StoryCard.jsx";
import "../styles/Bookmarks.css"

export const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/stories/bookmarks");
      setBookmarks(data.data);
      setBookmarkedIds(data.data.map((s) => s._id));
    } catch (err) {
      setError("Failed to load bookmarks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (updatedBookmarks) => {
    const updatedIds = updatedBookmarks.map((id) => id.toString());
    setBookmarkedIds(updatedIds);
    setBookmarks((prev) => prev.filter((s) => updatedIds.includes(s._id)));
  };

  return (
    <div className="bookmarks">
      <div className="bookmarks__container">
        <div className="bookmarks__header">
          <h1 className="bookmarks__title">Your Bookmarks</h1>
          <p className="bookmarks__subtitle">
            {!loading && !error && `${bookmarks.length} saved ${bookmarks.length === 1 ? "story" : "stories"}`}
          </p>
        </div>

        {loading && (
          <div className="bookmarks__state">
            <p className="bookmarks__loading">Loading bookmarks...</p>
          </div>
        )}

        {error && (
          <div className="bookmarks__state">
            <p className="bookmarks__error">{error}</p>
            <button className="bookmarks__retry" onClick={fetchBookmarks}>Retry</button>
          </div>
        )}

        {!loading && !error && bookmarks.length === 0 && (
          <div className="bookmarks__state">
            <p className="bookmarks__empty">No bookmarks yet.</p>
            <p className="bookmarks__empty-hint">
              Go to <a href="/" className="bookmarks__link">Home</a> and star stories to save them here.
            </p>
          </div>
        )}

        {!loading && !error && bookmarks.length > 0 && (
          <div className="bookmarks__list">
            {bookmarks.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                bookmarkedIds={bookmarkedIds}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
