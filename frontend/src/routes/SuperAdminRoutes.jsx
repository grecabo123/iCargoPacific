import Business from "../components/SuperAdmin/pages/Accounts/Business";
import RegisterAccount from "../components/SuperAdmin/pages/Accounts/RegisterAccount";
import BranchList from "../components/SuperAdmin/pages/Branch/BranchList";
import ActivityLogs from "../components/SuperAdmin/pages/Logs/ActivityLogs";
import ListProduct from "../components/SuperAdmin/pages/Product/ListProduct";
import Config from "../components/SuperAdmin/pages/Settings/Config";
import Book from "../components/SuperAdmin/pages/booking/Book";
import ListBooking from "../components/SuperAdmin/pages/booking/ListBooking";
import AdminDashbord from "../components/SuperAdmin/pages/dashboard/AdminDashbord";


const SuperAdminRoutes = [
    {path: "/admin/dashboard", exact: true, name: "Dashboard", component: AdminDashbord},
    {path: "/admin/booking/form", exact: true, name: "Book", component: Book},
    {path: "/admin/booking/list", exact: true, name: "List", component: ListBooking},
    {path: "/admin/branch/add", exact: true, name: "Branch", component: BranchList},
    {path: "/admin/logs", exact: true, name: "Logs", component: ActivityLogs},
    {path: "/admin/settings/config", exact: true, name: "Config", component: Config},
    {path: "/admin/accounts/business", exact: true, name: "Business", component: Business},
    {path: "/admin/accounts/register", exact: true, name: "Register", component: RegisterAccount},
    {path: "/admin/product/list", exact: true, name: "List", component: ListProduct},
];

export default SuperAdminRoutes;