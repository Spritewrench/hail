window.onload = function () {
  'use strict';

  var game
    , ns = window[''];

  game = new Phaser.Game(320, 480, Phaser.AUTO, '-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game1', ns.Game1);
  game.state.add('game2', ns.Game2);

  game.state.start('boot');
};
