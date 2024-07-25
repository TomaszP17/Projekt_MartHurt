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
import { Comment } from "@/types";
import Cookies from "js-cookie";

interface CommentsProps {
  productId: string;
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsProps> = ({ productId, comments }) => {
  const [commentsState, setCommentsState] = useState<Comment[]>(comments);
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    const employeeId = parseInt(Cookies.get("userId"), 10); // Konwersja userId na liczbę

    try {
      const response = await api.post("/comments", {
        employeeId: employeeId,
        productId: productId,
        message: newComment,
      });

      if (response.status === 200) {
        const newCommentObj = response.data;
        console.log("Komentarz został dodany:", newCommentObj);
        setCommentsState((prevComments) => [...prevComments, newCommentObj]);
        setNewComment(""); // Resetuje pole dodawania komentarza
        setIsAddingComment(false); // Zamyka pole dodawania komentarza
      } else {
        // console.error(`Błąd dodawania komentarza: ${response.statusText}`);
        // alert(`Nie udało się dodać komentarza: ${response.statusText}`);
      }
    } catch (error) {
      // console.error("Error adding comment:", error);
      // alert("Wystąpił błąd podczas dodawania komentarza.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setCommentsState((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
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
          {commentsState.map((comment, index) => (
            <TableRow key={comment.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{comment.message}</TableCell>
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
