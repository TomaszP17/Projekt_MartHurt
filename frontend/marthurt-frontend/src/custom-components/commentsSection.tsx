import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import api from "@/services/api";

interface Comment {
  id: number;
  text: string;
}

interface CommentsProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsProps> = ({ comments }) => {
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const response = await fetch("/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newComment,
          }),
        });

        if (response.ok) {
          const newCommentObj = await response.json();
          // This should ideally add the new comment to the parent state
          // Assuming the parent component has a method to add comments
          // setComments([...comments, newCommentObj]);
          setNewComment("");
        } else {
          const errorMessage = await response.text();
          alert(`Nie udało się dodać komentarza: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        alert("Wystąpił błąd podczas dodawania komentarza.");
      }
    }
    setIsAddingComment(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(`/comments/${commentId}`);
     
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Wystąpił błąd podczas usuwania komentarza.");
    }
  };

  return (
    <div className="py-6">
      <h2>Komentarze</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Komentarze</TableHead>
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment, index) => (
            <TableRow key={comment.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{comment.text}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="bg-red-500 text-white"
                >
                  Usuń
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {isAddingComment && (
            <TableRow>
              <TableCell>{comments.length + 1}</TableCell>
              <TableCell>
                <input
                  type="text"
                  value={newComment}
                  onChange={handleInputChange}
                  placeholder="Wpisz nowy komentarz..."
                  className="border p-2 w-full"
                />
              </TableCell>
              <TableCell>
                <Button onClick={handleAddComment}>Zapisz komentarz</Button>
              </TableCell>
            </TableRow>
          )}
          <TableRow className="hover:bg-white">
            <TableCell colSpan={3}>
              {!isAddingComment && (
                <Button onClick={() => setIsAddingComment(true)}>
                  Dodaj nowy komentarz
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CommentsSection;
