import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store,persistor } from './redux/store/store.js'
import { PersistGate} from 'redux-persist/integration/react'
import Loading from './components/utils/Loading.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
      <PersistGate loading={<Loading/>} persistor={persistor}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
      </PersistGate>
    </Provider>
)
