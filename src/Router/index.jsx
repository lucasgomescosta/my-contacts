import { useRoutes } from "react-router-dom";

import Home from "../pages/Home";
import NewContact from "../pages/NewContact";
import EditContact from "../pages/EditContact";
import Categorias from "../pages/Categorias";
import CategoryNew from "../pages/CategoryNew";
import CategoryEdit from "../pages/CategoryEdit";

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

import { AuthGuard } from "./AuthGuard";

export default function Routes() {
  const routes = useRoutes([
    { path: '/', element: <AuthGuard isPrivate><Home /></AuthGuard> },
    { path: '/new', element: <AuthGuard isPrivate><NewContact /></AuthGuard> },
    { path: '/edit/:id', element: <AuthGuard isPrivate><EditContact /></AuthGuard> },
    { path: '/categorias', element: <AuthGuard isPrivate><Categorias /></AuthGuard> },
    { path: '/categorias/nova', element: <AuthGuard isPrivate><CategoryNew /></AuthGuard> },
    { path: '/categorias/:id/editar', element: <AuthGuard isPrivate><CategoryEdit /></AuthGuard> },
    { path: '/sign-in', element: <AuthGuard isPrivate={false}><SignIn /></AuthGuard> },
    { path: '/sign-up', element: <AuthGuard isPrivate={false}><SignUp /></AuthGuard> },
  ]);
  return routes;
}
