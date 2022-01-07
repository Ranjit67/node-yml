import App from "./app";
import {LanguageRoute,EventRoutes} from "./routes"
import {BottomMiddleware,TopMiddleware} from "./middleware"



const object={
    controllers:[new LanguageRoute,new EventRoutes],
    topMiddleware:[new TopMiddleware().allowCrossDomain],
    bottomMiddleware:[new BottomMiddleware().routeNotFoundErrorHandler,
        new BottomMiddleware().fromRouteErrorHandler
    ]
}
const app = new App()
app.listen(object)