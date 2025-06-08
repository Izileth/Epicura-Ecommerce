
import { Page } from "./pages"
import Bar from './components/template/Bar/index.tsx'
import { Banner } from './components/common/Banner/index.tsx'
function App() {
  return (
    <div className="text-center">
          <Banner />
          <Bar />
          <Page/>
    </div>
  )
}

export default App
