import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col items-center">
            <nav className="navbar w-full m-0 p-0 justify-center menu menu-horizontal bg-base-200">
                <ul className="">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/journals/new">Create New Entry</Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
