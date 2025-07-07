/**
 * Express router for handling comment-related API endpoints
 * @module routes/api/comments
 */

/**
 * GET /api/comments
 * Retrieves all comments sorted by creation date (newest first)
 * @route GET /
 * @returns {Object[]} 200 - Array of comment objects
 * @returns {Object} 500 - Internal server error
 * @example
 * // Response format:
 * [
 *   {
 *     _id: "507f1f77bcf86cd799439011",
 *     content: "This is a comment",
 *     createdAt: "2023-01-01T00:00:00.000Z"
 *   }
 * ]
 */

/**
 * DELETE /api/comments/:id
 * Deletes a specific comment by its ID
 * @route DELETE /:id
 * @param {string} id.path.required - The comment ID to delete
 * @returns {Object} 200 - Success message when comment is deleted
 * @returns {Object} 404 - Error when comment is not found
 * @returns {Object} 500 - Internal server error
 * @example
 * // Success response:
 * {
 *   "message": "Comment deleted successfully"
 * }
 * 
 * // Error response:
 * {
 *   "message": "Comment not found"
 * }
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});