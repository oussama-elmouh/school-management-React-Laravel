 
import { createBrowserRouter } from "react-router-dom";
  
import Home from "../pages/Home";  
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import Layout from "../layaouts/layout";
import GuestLayout from "../layaouts/gestLayaout";
import StudentDashboardLayout from "../layaouts/Student/StudentDashboardLayout";
import StudentDashboard from "../components/Student/StudentDashboard";

export const LOGIN_ROUTE ='/login'
export const STUDENT_DASHBORD_ROUTE ='/student/dashboard'
export const router =  createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/users',
                element:<Users/>
            }
            ,
            {
                path:'*',
                element:<NotFound/>
            }   
        ]
    },
    {
        element: <GuestLayout/>,
        children:[
            {
                path:LOGIN_ROUTE,
                element:<Login/>
            }    
        ]
    },
    {
        element: <StudentDashboardLayout/>,
        children:[
            {
                path:STUDENT_DASHBORD_ROUTE,
                element: <StudentDashboard/>
            }

        ]
    }
    
])