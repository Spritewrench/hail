(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
    
    
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(160, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('player', 'assets/player.png');
      this.load.image('image', 'assets/afterImage.png');
      this.load.image('player2', 'assets/player2.png');
      this.load.image('image2', 'assets/afterImage2.png');      
      this.load.image('fgLine', 'assets/fgLine.png');
      this.load.image('bgLine', 'assets/bgLine.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      //music from @LimeFaceX
      this.load.audio('Hail&Release', ['assets/Hail&Release.ogg']);         
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (this.ready===false && this.cache.isSoundDecoded('Hail&Release') ) {
        this.ready=true;
        //hide loading css
        document.getElementById('loading').style.display = 'none';
        //show game
        document.getElementById('-game').style.display = 'block';
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window[''] = window[''] || {};
  window[''].Preloader = Preloader;

}());
