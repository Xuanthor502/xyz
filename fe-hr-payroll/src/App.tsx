import { useEffect, useRef, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './redux/hook';
import { Footer } from 'antd/es/layout/layout';
import { Header } from './components/header/Header.components';
import { fetchAccount } from './redux/slice/accountSlide';
import LayoutApp from './components/share/layout.app';
import NotFound from './components/share/not.found';
import UserPage from './pages/user/users.page';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import ProtectedRoute from './components/share/protected-route';
// import LayoutAdmin from 
import HomePage from './pages/home/homepage';
import JobPage from './pages/job/jobs.page';
import BenefitPage from './pages/benefit/benefits.page';
import PayratePage from './pages/payrate/payrates.page';
import ProductPage from './pages/product/products.page';

const LayoutClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [location]);

  return (
    <div className='layout-app' ref={rootRef}>
      <div >
        <Outlet context={[searchTerm, setSearchTerm]} />
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.account.isLoading);


  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount())
  }, [])

  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: (<LayoutApp><LayoutClient /></LayoutApp>),
    //   errorElement: <NotFound />,
    //   children: [
    //     { index: true, element: <HomePage /> },
    //   ],
    // },
    {
      path: "/",
      element: (<LayoutApp><LayoutClient /></LayoutApp>),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            // <ProtectedRoute>
            <HomePage />
          // </ProtectedRoute>
        },
        {
          path: "user",
          element:
            // <ProtectedRoute>
              <UserPage />
            // </ProtectedRoute>
        },
        {
          path: "job",
          element:
            // <ProtectedRoute>
              <JobPage />
            // </ProtectedRoute>
        },
        {
          path: "benefit",
          element:
            // <ProtectedRoute>
              <BenefitPage />
            // </ProtectedRoute>
        },
        {
          path: "payrate",
          element:
            // <ProtectedRoute>
              <PayratePage />
            // </ProtectedRoute>
        },
        {
          path: "product",
          element:
            // <ProtectedRoute>
              <ProductPage />
            // {/* </ProtectedRoute> */}
        },
      ]

    },
    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}