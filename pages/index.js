import Head from "next/head";
import Nav from "./components/Nav";
import { table, minifyRecords } from "./api/utils/airtable";
import Todo from "./components/Todo";

export default function Home({ initialTodos }) {
  //console.log(initialTodos);
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
            {initialTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
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
