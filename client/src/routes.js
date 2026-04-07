import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";
import RestaurantPage from "./pages/restaurant-page";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  FOOD_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: HomePage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: `${FOOD_ROUTE}/:id`,
    Component: RestaurantPage,
  },
];
