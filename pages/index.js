import Head from "next/head";
import Nav from "./components/Nav";
import { table, minifyRecords } from "./api/utils/airtable";
import Todo from "./components/Todo";
import React, { useEffect, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

export default function Home({ initialTodos }) {
  // useContext needs to be destructured with an object after you have createdContext object not an array like useState
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <h1>
        <div className="p-4 shadow rounded bg-white">
          <ul>
            {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
          </ul>
        </div>
      </h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();

    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        err: "something happend in serverside",
      },
    };
  }
}
