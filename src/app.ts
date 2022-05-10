import Router from "./core/router";
import HomeView from "./page/home";

const router = new Router();
const homeView = new HomeView('root');

router.setDefaultPage(homeView);
router.addRoutePath("/home/", homeView);

router.route();