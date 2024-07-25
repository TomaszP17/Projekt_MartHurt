import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

interface CommentsProps {
  comments: string[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="py-6">
      <h2>Komentarze</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Komentarze</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{comment}</TableCell>
            </TableRow>
          ))}
          <TableRow className="hover:bg-white">
            <Button>Dodaj nowy komentarz</Button>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Comments;
