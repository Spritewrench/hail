var startCtrl = 1;
(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.music = null;
    this.isPlaying = false;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'Example Game', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
      
      this.music = this.add.audio('Hail&Release',1,true);
      if(!this.isPlaying){
        //this.music.play('',0,1,true); 
        //this.isPlaying = true;
        //this.music.volume = 0.50;
      }
              
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game1');
    }
  };

  window[''] = window[''] || {};
  window[''].Menu = Menu;

}());
