var engine;
function main() {
    engine = new Engine("canvas", 800, 480);
    engine.resize();
    engine.setClearColor('gray');
    engine.setAutoResize(true);

    engine.init = init;
    engine.update = update;
    engine.render = render;

    engine.start();
}

//GLOBAL VARIABLES GO HERE:
var player;
var world;
var tiles = [];

var background;

function init() {
    var playersheet = new SpriteSheet("res/sprite_player.png");
    player = new Player(new Vector(0, 0), 32, 32, playersheet);
    world = new World();

    var tilesheet = new SpriteSheet("res/sprite_background.png");
    var tileblock = new SpriteSheet("res/sprite_block.png");

    tiles[2] = new Tile(new Sprite(tilesheet, 0, 0, 32, 32));
    tiles[1] = new Tile(new Sprite(tileblock, 0, 0, 32, 32));

    background = new Sprite(new SpriteSheet("res/gradient.png"), 0, 0, 800, 480);
}

function update() {
    player.update();
}

function render(context) {
    engine.clear();
    background.render(context, 0, 0);
    world.render(context, player.position.sub(new Vector(12 * 32, 7 * 32)).scale(-1));
    player.render(context);
}

//OBJECT FUNCTIONS GO HERE:
function Player(position, width, height, spritesheet) {
    this.position = position;
    this.width = width;
    this.height = height;

    this.sprites = [];
    this.sprites[0] = new Sprite(spritesheet, 0, 0, 32, 32);
    /*this.sprites[1] = new Sprite(spritesheet, 16 * 1, 24 * 0, 16, 24);
    this.sprites[2] = new Sprite(spritesheet, 16 * 2, 24 * 0, 16, 24);
    this.sprites[3] = new Sprite(spritesheet, 16 * 3, 24 * 0, 16, 24);
    this.sprites[4] = new Sprite(spritesheet, 16 * 0, 24 * 1, 16, 24);
    this.sprites[5] = new Sprite(spritesheet, 16 * 1, 24 * 1, 16, 24);
    this.sprites[6] = new Sprite(spritesheet, 16 * 2, 24 * 1, 16, 24);
    this.sprites[7] = new Sprite(spritesheet, 16 * 3, 24 * 1, 16, 24);
    this.sprites[8] = new Sprite(spritesheet, 16 * 0, 24 * 2, 16, 24);
    this.sprites[9] = new Sprite(spritesheet, 16 * 1, 24 * 2, 16, 24);
    this.sprites[10] = new Sprite(spritesheet, 16 * 2, 24 * 2, 16, 24);
    this.sprites[11] = new Sprite(spritesheet, 16 * 3, 24 * 2, 16, 24);
    this.sprites[12] = new Sprite(spritesheet, 16 * 0, 24 * 3, 16, 24);
    this.sprites[13] = new Sprite(spritesheet, 16 * 1, 24 * 3, 16, 24);
    this.sprites[14] = new Sprite(spritesheet, 16 * 2, 24 * 3, 16, 24);
    this.sprites[15] = new Sprite(spritesheet, 16 * 3, 24 * 3, 16, 24);*/

    this.update = function() {
        if(engine.key("W")) this.position.y -= 2;
        if(engine.key("S")) this.position.y += 2;
        if(engine.key("A")) this.position.x -= 2;
        if(engine.key("D")) this.position.x += 2;
    };

    this.render = function(context) {
        this.sprites[0].render(context, 12 * 32, 7 * 32, this.width, this.height);
    };
}

function Tile(sprite, solid) {
    this.sprite = sprite;
    this.solid = solid || false;
    this.width = 32;
    this.height = 32;
    this.render = function(context, x, y, width, height) {
        this.sprite.render(context, x, y, width, height);
    };
}

function World() {
    this.map = [
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];

    for (var i=0;i<this.map.length;i++){
        for (var j=0;j<this.map[0].length;j++) {
        if (this.map[i][j] == 0 && Math.random() < .12)this.map[i][j] = 2;
            }
        }

    this.getWidth = function() {
        return this.map[0].length;
    };
    this.getHeight = function() {
        return this.map.length;
    };
    this.render = function(context, offset) {
        var tileWidth = 32;
        var tileHeight = 32;
        var firstTileX = Math.max(Math.floor((-1 * offset.x) / tileWidth), 0);
        var lastTileX = Math.min(firstTileX + (engine.canvas.width / tileWidth) + 1, this.getWidth());
        var firstTileY = Math.max(Math.floor((-1 * offset.y) / tileHeight), 0);
        var lastTileY = Math.min(firstTileY + (engine.canvas.height / tileHeight) + 1, this.getHeight());
        for(var i = firstTileY; i < lastTileY; i++) {
            for(var j = firstTileX; j < lastTileX; j++) {
                var id = this.map[i][j];
                var tileX = j * tileWidth + offset.x;
                var tileY = i * tileHeight + offset.y;
                var tile = tiles[id];


                if(tile == undefined) console.log(id);
                if(id == 0) {
                    //if(Math.random() < .9) tile.render(context, tileX, tileY);
                }
                    else if (id == 2) {
                    if(Math.random() < .8) tile.render(context, tileX, tileY);
                }
                else {
                    tile.render(context, tileX, tileY);
                }
            }
        }
    };
}