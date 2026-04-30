import { Routes as RouterRoutes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewContact from "./pages/NewContact";
import EditContact from "./pages/EditContact";
import Categorias from "./pages/Categorias";
import CategoryNew from "./pages/CategoryNew";
import CategoryEdit from "./pages/CategoryEdit";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/nova" element={<CategoryNew />} />
            <Route path="/categorias/:id/editar" element={<CategoryEdit />} />
        </RouterRoutes>
    );
}
