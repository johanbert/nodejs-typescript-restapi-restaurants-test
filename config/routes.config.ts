import { serverSingleton,Server } from "../common/classes/server.common";
import { RoutesCommon } from '../common/classes/routes.common';
import UsersRoutes from '../components/users/routes/v1';
import { RestaurantsRoutes } from '../components/restaurants/routes/v1';

const server: Server = serverSingleton;
const routes: Array<RoutesCommon> = [];

routes.push(new UsersRoutes(server.app));
routes.push(new RestaurantsRoutes(server.app));

export default routes;