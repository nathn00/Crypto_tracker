import Router from "./Router";
import { GlobalLayout } from "./styles/Global/GlobalLayout";
import { ReactQueryDevtools } from 'react-query/devtools';
function App() {
  return (
    <>
      <GlobalLayout />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}

export default App;