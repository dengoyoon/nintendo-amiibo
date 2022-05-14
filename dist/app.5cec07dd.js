// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/core/router.ts":[function(require,module,exports) {
"use strict";

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Router =
/** @class */
function () {
  function Router() {
    var _this = this;

    this.setDefaultPage = function (page) {
      _this.defaultRoute = {
        path: '',
        page: page
      };
    };

    this.addRoutePath = function (path, page) {
      _this.routeTable.push({
        path: path,
        page: page
      });
    };

    this.route = function () {
      var e_1, _a;

      var routePath = location.hash;

      if (routePath == '' && _this.defaultRoute) {
        _this.defaultRoute.page.render();
      }

      try {
        for (var _b = __values(_this.routeTable), _c = _b.next(); !_c.done; _c = _b.next()) {
          var routeInfo = _c.value;

          if (routePath.indexOf(routeInfo.path) >= 0) {
            routeInfo.page.render();
            break;
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    };

    window.addEventListener('hashchange', this.route.bind(this));
    this.routeTable = [];
    this.defaultRoute = null;
    this.pathStack = [];
  }

  return Router;
}();

exports.default = Router;
},{}],"src/core/api.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmiiboListApi = exports.Api = void 0;

var Api =
/** @class */
function () {
  function Api(url) {
    this.url = url;
  }

  Api.prototype.request = function () {
    return __awaiter(this, void 0, Promise, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , fetch(this.url)];

          case 1:
            response = _a.sent();
            return [4
            /*yield*/
            , response.json()];

          case 2:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  return Api;
}();

exports.Api = Api;

var AmiiboListApi =
/** @class */
function (_super) {
  __extends(AmiiboListApi, _super);

  function AmiiboListApi() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AmiiboListApi.prototype.getData = function () {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , this.request()];
      });
    });
  };

  return AmiiboListApi;
}(Api);

exports.AmiiboListApi = AmiiboListApi; // export class Api {
//     url;
//     constructor(url) {
//         this.url = url;
//     }
//     async request() {
//         const response = await fetch(this.url);
//         return await response.json();
//     }
// }
},{}],"src/core/view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View =
/** @class */
function () {
  function View(containerId, template) {
    var _this = this;

    this.updateView = function () {
      if (_this.container) {
        _this.container.innerHTML = _this.renderTemplate;
        _this.renderTemplate = _this.template;
      } else {
        console.log("최상위 컨테이너가 없어 UI를 진행하지 못합니다.");
      }
    };

    this.addHtml = function (htmlString) {
      _this.htmlList.push(htmlString);
    };

    this.getHtml = function () {
      var snapshot = _this.htmlList.join('');

      _this.clearHtmlList();

      return snapshot;
    };

    this.clearHtmlList = function () {
      _this.htmlList = [];
    };

    this.setTemplateData = function (key, value) {
      _this.renderTemplate = _this.renderTemplate.replace("@".concat(key), value);
    };

    var containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw "최상위 컨테이너가 없어 UI를 진행하지 못합니다.";
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  return View;
}();

exports.default = View;
},{}],"src/page/amiibo.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var api_1 = require("../core/api");

var view_1 = __importDefault(require("../core/view"));

var AMIIBO_URL = "https://www.amiiboapi.com/api/amiibo/?gameseries=@game_series";
var template = "\n    <div\n        class = \"container\">\n        @amiibo_list\n    </div>\n";
var itemTemplate = "\n    <div\n        class = \"line-amiibo\">\n        <div\n            class = \"item-amiibo\">\n            <img\n                class = \"item-amiibo-img\"\n                src = \"@amiibo_img_left\"\n                alt = \"mario..\"/>\n            <div\n                class = \"item-amiibo-text\"\n                id = \"item-amiibo-text-head\">\n                    @amiibo_name_left\n            </div>\n            <div\n                class = \"item-amiibo-text\">\n                    @game_series_left\n            </div>\n            <div\n                class = \"item-amiibo-text\">\n                    @release_date_left\n            </div>\n        </div>\n        <div\n            class = \"item-amiibo\">\n            <img\n                class = \"item-amiibo-img\"\n                src = \"@amiibo_img_right\"\n                alt = \"mario..\"/>\n            <div\n                class = \"item-amiibo-text\"\n                id = \"item-amiibo-text-head\">\n                    @amiibo_name_right\n            </div>\n            <div\n                class = \"item-amiibo-text\">\n                    @game_series_right\n            </div>\n            <div\n                class = \"item-amiibo-text\">\n                    @release_date_right\n            </div>\n        </div>\n    </div>\n";

var printHI = function printHI() {
  console.log("HIHI");
};

var AmiiboView =
/** @class */
function (_super) {
  __extends(AmiiboView, _super);

  function AmiiboView(containerId, path) {
    var _this = _super.call(this, containerId, template) || this;

    _this.render = function () {
      return __awaiter(_this, void 0, Promise, function () {
        var api, _a, tempItem, i, _b, gameSeries, image, name, release, aaa;

        var _this = this;

        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              this.gameSeries = location.hash.slice(9);
              api = new api_1.AmiiboListApi(AMIIBO_URL.replace('@game_series', this.gameSeries));
              _a = this;
              return [4
              /*yield*/
              , api.getData()];

            case 1:
              return [4
              /*yield*/
              , _c.sent().amiibo];

            case 2:
              _a.amiibos = _c.sent();
              tempItem = itemTemplate;

              for (i = 0; i < this.amiibos.length; i++) {
                _b = this.amiibos[i], gameSeries = _b.gameSeries, image = _b.image, name = _b.name, release = _b.release;

                if (i % 2 == 0) {
                  tempItem = tempItem.replace("@amiibo_img_left", image);
                  tempItem = tempItem.replace("@amiibo_name_left", name);
                  tempItem = tempItem.replace("@game_series_left", gameSeries);
                  tempItem = tempItem.replace("@release_date_left", release.jp);

                  if (i + 1 == this.amiibos.length) {
                    // 눈속임용 ㅠㅠ
                    tempItem = tempItem.replace("@amiibo_img_right", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png");
                    tempItem = tempItem.replace("@amiibo_name_right", "");
                    tempItem = tempItem.replace("@game_series_right", "");
                    tempItem = tempItem.replace("@release_date_right", "");
                    this.addHtml(tempItem);
                  }
                } else {
                  tempItem = tempItem.replace("@amiibo_img_right", image);
                  tempItem = tempItem.replace("@amiibo_name_right", name);
                  tempItem = tempItem.replace("@game_series_right", gameSeries);
                  tempItem = tempItem.replace("@release_date_right", release.jp);
                  this.addHtml(tempItem);
                  tempItem = itemTemplate;
                }
              }

              this.setTemplateData('amiibo_list', this.getHtml());
              this.updateView();
              aaa = document.querySelectorAll(".item-amiibo");
              aaa.forEach(function (e, index) {
                if (e != null) {
                  e.addEventListener("click", function () {
                    _this._bag.pushBagStack(_this.amiibos[index]);

                    console.log(_this._bag.bagStack);
                  });
                }
              });
              return [2
              /*return*/
              ];
          }
        });
      });
    };

    _this._gameSeries = "";
    _this._amiibos = [];
    _this._bag = path;
    return _this;
  }

  Object.defineProperty(AmiiboView.prototype, "gameSeries", {
    get: function get() {
      return this._gameSeries;
    },
    set: function set(series) {
      switch (series) {
        case "mario":
          this._gameSeries = "Super Mario";
          break;

        case "zelda":
          this._gameSeries = "The Legend of Zelda";
          break;

        case "donkey":
          this._gameSeries = "Donkey Kong";
          break;

        case "kirby":
          this._gameSeries = "Kirby";
          break;

        case "pokemon":
          this._gameSeries = "Pokemon";
          break;

        case "animal":
          this._gameSeries = "Animal Crossing";
          break;

        default:
          break;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(AmiiboView.prototype, "amiibos", {
    get: function get() {
      return this._amiibos;
    },
    set: function set(array) {
      this._amiibos = array;
    },
    enumerable: false,
    configurable: true
  });
  return AmiiboView;
}(view_1.default);

exports.default = AmiiboView;
},{"../core/api":"src/core/api.ts","../core/view":"src/core/view.ts"}],"src/page/home.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var view_1 = __importDefault(require("../core/view"));

var template = "\n    <div\n        class = \"container\">\n        <div\n            class = \"title\">nintendo amiibo</div>\n        <div>\n        <div\n            class = \"line-img\">\n            <a \n                class = \"img-home-box\"\n                id = \"img-mario\"\n                href=\"#/amiibo/mario\">\n            </a>\n            <a\n                class = \"img-home-box\"\n                id = \"img-zelda\"\n                href=\"#/amiibo/zelda\"></a>\n        </div>\n        <div\n            class = \"line-img\">\n            <a\n                class = \"img-home-box\"\n                id = \"img-donkey\"\n                href=\"#/amiibo/donkey\"></a>\n            <a\n                class = \"img-home-box\"\n                id = \"img-kirby\"\n                href=\"#/amiibo/kirby\"></a>\n        </div>\n        <div\n            class = \"line-img\">\n            <a\n                class = \"img-home-box\"\n                id = \"img-pokemon\"\n                href=\"#/amiibo/pokemon\"></a>\n            <a\n                class = \"img-home-box\"\n                id = \"img-animal\"\n                href=\"#/amiibo/animal\"></a>\n        </div>\n    </div>\n";

var HomeView =
/** @class */
function (_super) {
  __extends(HomeView, _super);

  function HomeView(containerId, bag) {
    var _this = _super.call(this, containerId, template) || this;

    _this.render = function () {
      _this.updateView();
    };

    _this.bag = bag;
    return _this;
  }

  return HomeView;
}(view_1.default);

exports.default = HomeView;
},{"../core/view":"src/core/view.ts"}],"src/bag.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Bag =
/** @class */
function () {
  function Bag() {
    this._bagStack = [];
  }

  Bag.prototype.pushBagStack = function (item) {
    this._bagStack.push(item);
  };

  Object.defineProperty(Bag.prototype, "bagStack", {
    get: function get() {
      return this._bagStack;
    },
    enumerable: false,
    configurable: true
  });
  return Bag;
}();

exports.default = Bag;
},{}],"src/app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var router_1 = __importDefault(require("./core/router"));

var amiibo_1 = __importDefault(require("./page/amiibo"));

var home_1 = __importDefault(require("./page/home"));

var bag_1 = __importDefault(require("./bag")); // 시작


var router = new router_1.default();
var bag = new bag_1.default(); // Router의 생성자 실행 -> 해시 체인지 리스너 실행.

var homeView = new home_1.default('root', bag);
var amiiboView = new amiibo_1.default('root', bag); // containerId인 root와 각 뷰에서 만든 템플릿을 View의 생성자에 전달
// View의 생성자에서 이것들을 저장.

router.setDefaultPage(homeView); // Router의 defaultRoute에 path ''와 view를 homeView로 설정

router.addRoutePath("/home/", homeView);
router.addRoutePath("/amiibo/", amiiboView); // routeTable에 각 path와 view등록

router.route(); // this.defaultRoute.page.render(); 실행
// 즉 homeView의 render 실행
// updateView실행 -> container인 root에 innerHTML로 저장되어어있는 템플릿 화면에 표시
},{"./core/router":"src/core/router.ts","./page/amiibo":"src/page/amiibo.ts","./page/home":"src/page/home.ts","./bag":"src/bag.ts"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58032" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.ts"], null)
//# sourceMappingURL=/app.5cec07dd.js.map