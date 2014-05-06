
(function() {
  'use strict';

  function Game1() {
    this.player = null;
    this.bullets = null;
    this.fireRate = 100;
    this.nextFire = 0;    
    this.ammo = null;
    
    this.image = null;
    this.scoreText = null;
    this.score = 0;
    this.startCtrl = 0;
  }

  Game1.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.stage.backgroundColor = '#b2ec7e';
      this.image = this.add.sprite(x, 150, 'image2');
      this.image.width = 32;
      this.image.height = 32;
      this.image.anchor.setTo(0.5, 0.5);
      
      var playerY = 150;
      if(startCtrl == 1){
        playerY = 300;
      }
      this.player = this.add.sprite(x, playerY, 'player2');
      this.player.anchor.setTo(0.5, 0.5);
      this.player.width = 32;
      this.player.height = 32;
      this.player.ammo = 10;      
      
      this.scoreText = this.add.bitmapText(x, 420, ''+this.score, {font: '12px minecraftia', align: 'center'});
      this.scoreText.anchor.setTo(0.5, 0.5);          
      
      
      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

      this.bullets.createMultiple(10, 'player');
      this.bullets.setAll('width', 16);
      this.bullets.setAll('height', 16);
      this.bullets.setAll('checkWorldBounds', true);
      this.bullets.setAll('outOfBoundsKill', true);      
      
      
      
      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      //spinning!
      this.player.angle += 10;
      this.image.angle += 10;      
      //score
      this.scoreText.setText(''+this.score);
      //image follow
      this.image.y += (this.player.y - this.image.y)*0.1;
      
      //beat twitching
      this.image.width += (60 - this.image.width)*0.1;
      this.player.width += (32 - this.player.width)*0.1;
      this.player.height = this.player.width;
      this.image.height = this.image.width;
      //this.player.height += (32 - this.player.width)*0.1;
      
      if(32-this.player.width <= 1){
        this.player.width = 16;
        this.image.width = 16;
        //alert('test');
      }

      //start pos
      if(startCtrl == 0){
        this.player.y += (300 - this.player.y)*0.1;      
        if(this.player.y - 300 <= 1 && this.player.y - 300 >= -1){
          //this.game.state.start('game2');
          startCtrl = 1;
        }        
      }
      //out of ammo you lose
      if(this.player.ammo <= 0){
        this.player.y += (150 - this.player.y)*0.1;
        //150
        //alert(150 -this.player.y);
        if(150 -this.player.y <= 1 && 150 -this.player.y >= -1){
          this.game.state.start('game2');
        }
        
      }
    },

    onInputDown: function () {
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0 && this.player.ammo > 0)
      {
          this.nextFire = this.game.time.now + this.fireRate;

          var bullet = this.bullets.getFirstDead();

          bullet.reset(this.player.x - 8, this.player.y - 8);

          this.game.physics.moveToPointer(bullet,300);
          this.player.ammo--;
    }
    }

  };

  window[''] = window[''] || {};
  window[''].Game1 = Game1;

}());
