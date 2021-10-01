var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
window.onload = function () {
    var boardSize = 800;
    var pixelSize = 4;
    var startingPercentage = 5;
    var gameSize = boardSize / pixelSize;
    var game = new Array(gameSize).fill(false).map(function () { return new Array(gameSize).fill(false); });
    var canvas = document.getElementById('canvas');
    canvas.width = canvas.height = boardSize;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    fillArray();
    window.requestAnimationFrame(draw);
    function draw() {
        ctx.clearRect(0, 0, boardSize, boardSize);
        for (var x = 0; x < gameSize; x++) {
            for (var y = 0; y < gameSize; y++) {
                if (game[x][y]) {
                    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }
        }
    }
    function fillArray() {
        var totalSize = gameSize * gameSize;
        for (var i = 0; i < totalSize / 100 * startingPercentage; i++) {
            var x = Math.floor(Math.random() * gameSize);
            var y = Math.floor(Math.random() * gameSize);
            game[x][y] = true;
        }
        gameOn();
    }
    function gameOn() {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, cell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        for (x = 0; x < gameSize; x++) {
                            for (y = 0; y < gameSize; y++) {
                                cell = game[x][y];
                                checkRules(checkNeighbours(x, y), x, y, cell);
                            }
                        }
                        console.log("finished checking");
                        window.requestAnimationFrame(draw);
                        console.log("finished drawing");
                        return [4 /*yield*/, delay(100)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function checkRules(aliveNeighbours, x, y, alive) {
        var tempGame = game;
        if (alive && aliveNeighbours < 2) {
            tempGame[x][y] = false;
        }
        if (alive && aliveNeighbours > 3) {
            tempGame[x][y] = false;
        }
        if (alive == false && aliveNeighbours == 3) {
            tempGame[x][y] = true;
        }
        game = tempGame;
    }
    function checkNeighbours(x, y) {
        var aliveNeighbours = 0;
        if (x > 0) {
            if (game[x - 1][y] == true) {
                aliveNeighbours++;
            }
        }
        if (x > 0 && y > 0) {
            if (game[x - 1][y - 1] == true) {
                aliveNeighbours++;
            }
        }
        if (x > 0 && y < gameSize - 1) {
            if (game[x - 1][y + 1] == true) {
                aliveNeighbours++;
            }
        }
        if (y > 0) {
            if (game[x][y - 1] == true) {
                aliveNeighbours++;
            }
        }
        if (x < gameSize - 1 && y > 0) {
            if (game[x + 1][y - 1] == true) {
                aliveNeighbours++;
            }
        }
        if (x < gameSize - 1) {
            if (game[x + 1][y] == true) {
                aliveNeighbours++;
            }
        }
        if (x < gameSize - 1 && y < gameSize - 1) {
            if (game[x + 1][y + 1] == true) {
                aliveNeighbours++;
            }
        }
        if (y < gameSize - 1) {
            if (game[x][y + 1] == true) {
                aliveNeighbours++;
            }
        }
        return aliveNeighbours;
    }
    function delay(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
};
