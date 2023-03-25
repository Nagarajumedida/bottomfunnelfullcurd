import { Box, Button, Flex, Grid, GridItem, Heading, Input, TableContainer } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const { error, setError } = useState(false);
  const [notes, setNotes] = useState("");

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const payload = {
      title,
      note,
    };
    fetch("http://localhost:8003/notes/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8003/notes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNotes(res);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleDelete = (noteID) => {
    fetch(`http://localhost:8003/notes/delete/${noteID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("psctoken")}`,
      },
    });
  };

  return (
    <Box>
      <Box w="50%">
        <Heading>NotesCreate</Heading>
        <Box>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <Input
            type="text"
            placeholder="Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <br />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Box>

      {loading && "Loading..."}
      {error && "Something went wrong..."}
      {notes &&
        notes.length > 0 &&
        notes.map((e) => {
          return (
            <Box p="10" d="flex">
              <h1>{e.title}</h1>
              <h4>{e.note}</h4>
              <Button onClick={() => handleDelete(e._id)}>DELETE</Button>
              <Button >UPDATE</Button>

              <hr />
            </Box>
       
          );
        })}
    </Box>
  );
};

export default Notes;
