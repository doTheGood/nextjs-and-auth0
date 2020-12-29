import { TodosProvider } from '../contexts/TodosContext';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp;
