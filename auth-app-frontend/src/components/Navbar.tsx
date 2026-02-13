import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/auth/store";

const Navbar = () => {
    const checkLogin = useAuth((state) => state.checkLogin);
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();

    const navLinkClass = "text-sm font-medium transition-colors hover:text-primary";
    const activeClass = "text-primary font-semibold";

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">

            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <div className="h-8 w-8 rounded-lg bg-linear-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">
                        A
                    </div>
                    <span className="text-lg font-semibold tracking-tight">
                        AuthApp
                    </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">

                    {checkLogin() ? (
                        <>
                            {/* Profile Link */}
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    `${navLinkClass} ${isActive ? activeClass : ""
                                    }`
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.image} />
                                        <AvatarFallback>
                                            {user?.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:block">
                                        {user?.name}
                                    </span>
                                </div>
                            </NavLink>

                            {/* Logout */}
                            <Button
                                onClick={() => {
                                    logout()
                                    navigate("/")
                                }}
                                size="sm"
                                variant="outline"
                                className="rounded-xl cursor-pointer px-5 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `${navLinkClass} ${isActive ? activeClass : ""
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink to="/login">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-xl cursor-pointer px-5"
                                >
                                    Login
                                </Button>
                            </NavLink>

                            <NavLink to="/signup">
                                <Button
                                    size="sm"
                                    className="rounded-xl cursor-pointer px-5"
                                >
                                    Signup
                                </Button>
                            </NavLink>
                        </>
                    )}

                </div>
            </div>
        </nav>
    )
}

export default Navbar;