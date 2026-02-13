import { Chrome, GithubIcon } from "lucide-react"
import { Button } from "./ui/button"
import { NavLink } from "react-router"

function OAuth2Buttons() {
    return (
        <div className="space-y-3">
            <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8080"}/oauth2/authorization/google`} className={'block'}>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer rounded-xl gap-2 bg-background hover:bg-muted"
                >
                    <Chrome className="h-4 w-4" />
                    Continue with Google
                </Button>
            </NavLink>

            <NavLink to={`${import.meta.env.VITE_BASE_URL || "http://localhost:8080"}/oauth2/authorization/github`} className={'block'}>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer rounded-xl gap-2 bg-background hover:bg-muted"
                >
                    <GithubIcon className="h-4 w-4" />
                    Continue with GitHub
                </Button>
            </NavLink>
        </div>
    )
}
;
export default OAuth2Buttons