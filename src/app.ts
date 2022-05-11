import Router from "./core/router";
import AmiiboView from "./page/amiibo";
import HomeView from "./page/home";

const router = new Router();
const homeView = new HomeView('root');
const amiiboView = new AmiiboView('root');

router.setDefaultPage(homeView);
router.addRoutePath("/home/", homeView);
router.addRoutePath("/amiibo/", amiiboView);

router.route();