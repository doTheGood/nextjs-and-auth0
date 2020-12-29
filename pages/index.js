import Head from 'next/head';
import { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';
import { TodosContext } from '../contexts/TodosContext';
import { minifyRecords, table } from './api/utils/Airtable';
import auth0 from './api/utils/auth0';

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);
  // console.log(user);
  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Auth ToDo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>
        <h1 className="text-2xl text-center mb-4">My ToDos</h1>
        {user && (
          <>
            <TodoForm />
            <ul>
              {todos && todos.map(todo => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        )}
        {!user && <p>You should log in to sve your todos</p>}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];

  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = '${session.user.sub}'`
        })
        .firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: 'Something went wrong'
      }
    };
  }
}
