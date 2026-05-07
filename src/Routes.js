import { useRoutes } from "react-router-dom";

import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import EditContact from "./pages/EditContact";
import Categorias from "./pages/Categorias";
import CategoryNew from "./pages/CategoryNew";
import CategoryEdit from "./pages/CategoryEdit";

export default function Routes() {
    const routes = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/new', element: <NewContact /> },
        { path: '/edit/:id', element: <EditContact /> },
        { path: '/categorias', element: <Categorias /> },
        { path: '/categorias/nova', element: <CategoryNew /> },
        { path: '/categorias/:id/editar', element: <CategoryEdit /> },
    ]);
    return routes;
}
