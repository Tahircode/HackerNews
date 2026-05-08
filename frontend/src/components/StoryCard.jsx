import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import "../styles/StoryCard.css"

export const StoryCard = ({ story, bookmarkedIds, onBookmarkToggle }) => {
  const { token } = useAuth();

  const isBookmarked = bookmarkedIds?.includes(story._id);

  const handleBookmark = async () => {
    if (!token) return;
    try {
      const { data } = await api.post(`/stories/${story._id}/bookmark`);
      onBookmarkToggle(data.bookmarks);
    } catch (error) {
      console.error("Bookmark toggle failed:", error.message);
    }
  };

  return (
    <div className="story-card">
      <div className="story-card__rank-col">
        <span className="story-card__points">{story.points}</span>
        <span className="story-card__points-label">pts</span>
      </div>

      <div className="story-card__body">
        <a
          className="story-card__title"
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {story.title}
        </a>

        <div className="story-card__meta">
          <span>by <strong>{story.author}</strong></span>
          <span className="story-card__dot">·</span>
          <span>{story.postedAt}</span>
        </div>
      </div>

      {token && (
        <button
          className={`story-card__bookmark ${isBookmarked ? "story-card__bookmark--active" : ""}`}
          onClick={handleBookmark}
          title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? "★" : "☆"}
        </button>
      )}
    </div>
  );
};





