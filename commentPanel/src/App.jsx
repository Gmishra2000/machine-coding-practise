import { useState } from 'react';
import './App.css';

function App() {
  const [comments, setComments] = useState([
    { id: 1, text: 'First comment', replies: [] },
    { id: 2, text: 'Second comment', replies: [] },
    // Add more initial comments as needed
  ]);

  const [newComment, setNewComment] = useState('');
  const [newReplies, setNewReplies] = useState({});

  const addComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        replies: [],
      };
      console.log(newCommentObj);
      setComments((prevcomments)=>[...prevcomments,newCommentObj])
      // setComments(...comments, newCommentObj);
      setNewComment('');
    }
  };
  const editComment = (commentId, newtext) => {
    setComments((prevcomments)=>
      prevcomments.map((comment)=>
      comment.id == commentId ? {...comment, text:newtext}:comment
      )
    )
  };
  const deleteComment = (commentId) => {
    setComments((prevcomments) => prevcomments.filter((comment)=> comment.id !==commentId))
  };
  const addReply = (commentId, replytext) => {
    
    setComments((prevcomments) => 
      prevcomments.map((comment) =>
        comment.id == commentId ? {...comment, replies:[...comment.replies,{text:replytext}]} :comment
      )
    );
    setNewReplies((prevReplies) => ({ ...prevReplies, [commentId]: '' }));
    console.log(commentId,replytext);
  };
  return (
    <div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a new comment..."
      />
      <button onClick={addComment}>Add Comment</button>

      {
        comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <button
              onClick={() =>
                editComment(comment.id, prompt('Edit comment:', comment.text))
              }
            >
              Edit
            </button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>

            <div>
              {comment.replies.map((reply, index) => (
                <p key={index}>{reply.text}</p>
              ))}
              <textarea
                placeholder="Reply to this comment..."
                onChange={(e)=> 
                  setNewReplies((prevReplies) => ({
                    ...prevReplies,
                    [comment.id]: e.target.value,
                  }))
                }
                value={newReplies[comment.id] || ''}
                id="index"
                // onBlur={(e) => addReply(comment.id, e.target.value)}
              />
              <button onClick={() =>
              { addReply(comment.id, newReplies[comment.id]);
              }}>Reply</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
