import Router from "./core/router";
import AmiiboView from "./page/amiibo";
import HomeView from "./page/home";
import Bag from "./bag";


// 시작
const router = new Router();
const bag = new Bag('container', 'bag-button');
// Router의 생성자 실행 -> 해시 체인지 리스너 실행.
const homeView = new HomeView('root', bag);
const amiiboView = new AmiiboView('root', bag);
// containerId인 root와 각 뷰에서 만든 템플릿을 View의 생성자에 전달
// View의 생성자에서 이것들을 저장.

router.setDefaultPage(homeView);
// Router의 defaultRoute에 path ''와 view를 homeView로 설정
router.addRoutePath("/home/", homeView);
router.addRoutePath("/amiibo/", amiiboView);
// routeTable에 각 path와 view등록

router.route();
// this.defaultRoute.page.render(); 실행
// 즉 homeView의 render 실행
// updateView실행 -> container인 root에 innerHTML로 저장되어어있는 템플릿 화면에 표시