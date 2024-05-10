import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import Notification from './components/Notifications/Notification.jsx'
import ChatBox from './pages/chat/ChatBox.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//       <Notification />
//       <ChatBox/>
//     </BrowserRouter>
//   </Provider>
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Notification />
    </BrowserRouter>
  </Provider>
)
