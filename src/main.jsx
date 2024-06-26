import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected as AuthLayout } from './components/index.js'
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AllPostPage from './pages/AllPostPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PostPage from './pages/PostPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import AccountVarificationPage from './pages/AccountVarificationPage.jsx'
import VerificationNotificationPage from './pages/VerificationNotificationPage.jsx'
import ForgetPasswordPage from './pages/ForgetPasswordPage.jsx'
import UpdatePasswordPage from './pages/UpdatePasswordPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/not-found",
        element: (
          <AuthLayout authentication>
            {" "}
            <NotFoundPage />
          </AuthLayout>
        )
      },
      {
        path: "/verify",
        element: (
          <AuthLayout authentication={false}>
            <AccountVarificationPage />
          </AuthLayout>
        )

      },
      {
        path: "/verify-notification",
        element: (
          <AuthLayout authentication={false}>
            <VerificationNotificationPage />
          </AuthLayout>
        )

      },
      {
        path: "/forgot-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgetPasswordPage />
          </AuthLayout>
        )
      },
      {
        path: "/recover-password",
        element: (
          <AuthLayout authentication={false}>
            <UpdatePasswordPage />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPostPage />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPostPage />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPostPage />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <PostPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
