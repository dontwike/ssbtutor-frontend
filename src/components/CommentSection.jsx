import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const { id: postId } = useParams();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewComment((prev) => prev + " " + transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://ssbtutor-backend.onrender.com/comments/${postId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        if (data.comments && Array.isArray(data.comments)) {
          setComments(data.comments);
        } else {
          console.error("Expected an array, got:", data);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [postId]);
  

  const startVoiceInput = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      alert("Voice input is not supported in this browser");
    }
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleVisibility = (parentId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [parentId]: !prev[parentId], // Toggle visibility for this parent
    }));
  };

  const handleNewComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ssbtutor-backend.onrender.com/comments",
        {
          postId: postId,
          parentComment: replyTo || null,
          content: newComment,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        const addedComment = await response.json();
        setComments([...comments, addedComment]);
        setNewComment("");
        setReplyTo(null);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentComment === parentId)
      .map((comment) => (
        <article
          key={comment._id}
          className={`p-6 mb-3 ${
            parentId ? "ml-6 lg:ml-12" : ""
          } text-base bg-white rounded-lg dark:bg-gray-900`}
        >
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                {comment.username || "Anonymous"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={comment.timestamp}>
                  {new Date(comment.timestamp).toLocaleDateString()}
                </time>
              </p>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
          <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              onClick={() => toggleVisibility(comment._id)}
              className="text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
            >
              {visibleComments[comment._id] ? "Hide Replies" : "View Replies"}
            </button>
            <button
              type="button"
              onClick={() => setReplyTo(comment._id)}
              className="text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
            >
              Reply
            </button>
          </div>
          {replyTo === comment._id && (
            <form className="mt-4" onSubmit={handleNewComment}>
              <textarea
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="px-2 py-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:text-white dark:bg-gray-800"
                placeholder={`Replying to ${
                  comment.username || "Anonymous"
                }...`}
                required
              ></textarea>
              <button
                type="submit"
                className="mt-2 inline-flex items-center py-1.5 px-3 text-xs font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                Post Reply
              </button>
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="ml-2 text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                Cancel
              </button>
            </form>
          )}
          {visibleComments[comment._id] &&
            renderComments(comments, comment._id)}
        </article>
      ));
  };

  return (
    <section className="bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleNewComment}>
          <div className="relative">
            <textarea
              rows="6"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:text-white bg-gray-900 pr-12"
              placeholder="Write a comment..."
              required
            ></textarea>
            <div className="absolute top-2 right-2">
              {isListening ? (
                <button
                  type="button"
                  onClick={stopVoiceInput}
                  className="text-red-500 hover:text-red-700"
                >
                  <MicOff size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className="text-primary-500 hover:text-primary-700"
                >
                  <Mic size={20} />
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post Comment
          </button>
        </form>
        {renderComments(comments)}
      </div>
    </section>
  );
};

export default CommentSection;
