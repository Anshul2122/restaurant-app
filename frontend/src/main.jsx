import React from "react";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store, {persistor} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
       <QueryClientProvider client={queryClient}>
       <App />
       </QueryClientProvider>
    </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
