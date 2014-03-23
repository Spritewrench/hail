(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.image = null;
    this.debris = null;
    
    
    
    
    this.dodgeSpeed = 0.2;
    this.speed = null;
    this.target = null;
    this.playerMoving = false;
    this.speedHolder =null;
    this.dodgeHolder = null;
    this.score = 0;
    this.scoreText = null;
    this.bgLine = null;
    this.fgLine = null;
    this.linespeed = null;
    this.hp = 5;
    this.index = 0;
    this.overTimer = null;

  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;
      this.target = x;

      this.overTimer = 200;
      this.bgLine = [0];
      for(var i = 0; i < 200;i++){
        var random = Math.floor((Math.random()*480)+0);
        this.bgLine[i] = this.add.sprite(random, -100, 'bgLine');
        this.bgLine[i].width = 10;
        this.bgLine[i].height = 10;        
        this.bgLine[i].anchor.setTo(0.5, 0.5);      
      }
      
      this.image = this.add.sprite(x, 150, 'image');
      this.image.width = 32;
      this.image.height = 32;
      this.image.anchor.setTo(0.5, 0.5);    
      this.player = this.add.sprite(x, 150, 'player');
      this.player.width = 16;
      this.player.height = 16;
      this.player.anchor.setTo(0.5, 0.5);
      this.player.hp = 2;
      this.input.onDown.add(this.onInputDown, this);      
      
      
      var val = 80;
      var place= 800;
      this.debris = [3];
      this.speed= [3];
      for(var i = 0; i < 3; i++ ){
        var random = Math.floor((Math.random()*2)+1);
        var extra =0;
        if(random == 1){
          extra = -100;
        }
        else{
          extra = 300
        }    
        place+=extra;
        this.debris[i] = this.add.sprite(val, place, 'player');
        val+=80;
        place = 800;
        random = Math.floor((Math.random()*2)+1);
        if(random == 1){
          extra = -300;
        }
        else{
          extra = 300
        }    
        place+=extra;        
        this.debris[i].width = 64;
        this.debris[i].height = 64;
        this.debris[i].anchor.setTo(0.5, 0.5);        
        this.speed[i] = 200;
        
       
      }

      this.fgLine = [0];
      this.linespeed = [0];
      for(var i = 0; i < 200;i++){
        var random = Math.floor((Math.random()*320)+1);

        this.fgLine[i] = this.add.sprite(random, -100, 'fgLine');
        this.fgLine[i].width = 10;
        this.fgLine[i].height = 10;          
        this.fgLine[i].anchor.setTo(0.5, 0.5);  
        this.linespeed[i] = 100;
      }       
      
      this.scoreText = this.add.bitmapText(x, 400, ''+this.score+'ft', {font: '12px minecraftia', align: 'center'});
      this.scoreText.anchor.setTo(0.5, 0.5);      
           
      
      this.index = 0;
      this.speedHolder= this.speed[0];
      this.dodgeHolder = this.dodgeSpeed;     
      
      this.score = 0;
      this.multiplier = 1;
           


    },

    update: function () {
      this.scoreText.setText(this.score+'ft');
      this.score += 1;
      this.player.x += (this.target - this.player.x)*this.dodgeSpeed;
      
      //image follow
      this.image.x += (this.player.x - this.image.x)*0.1;
      
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

      //regen shield
      if(this.overTimer < 200){
        this.overTimer++;
        if(this.overTimer === 200){
          this.image.visible = true;
          this.player.hp++;
        }
      }
      
      
      if(this.player.x != this.target){
        this.player.angle += 10;
        this.image.angle += 10;
      }
      //tweak player height
      //Math.round(this.player.y);
      //debris behaviour 
      for(var i=0; i < this.debris.length; i++){
        this.debris[i].body.velocity.y = -(this.speed[i]); //fly up
        

        
        if(this.debris[i].y < 0){
          var extra = 0;
          var random = Math.floor((Math.random()*2)+1);
          if(random == 1){
            extra = -300;
          }
          else{
            extra = 300
          }
          this.debris[i].y = 800+extra;
          this.speed[i] += 50;
          if(this.speed[i] > 400){
            this.speed[i] = 400;
          }

        }

        


        //collision
        this.physics.collide(this.player, this.debris[i], this.collisionHandler, null, this);        
      }

      //action lines
      for(var i=0; i < 200; i++){
        this.fgLine[i].body.velocity.y = -(this.linespeed[i]); //fly up
        this.bgLine[i].body.velocity.y = -(this.linespeed[i]); //fly up
        if(this.bgLine[i].y < 0){

          var randomy = Math.floor((Math.random()*800)+500);
          var randomx = Math.floor((Math.random()*480)+0);
          this.bgLine[i].y = randomy;
          this.bgLine[i].x = randomx;

        } 
        if(this.fgLine[i].y < 0){

          
          var randomy = Math.floor((Math.random()*800)+500);
          var randomx = Math.floor((Math.random()*480)+0);
          this.fgLine[i].y = randomy;
          this.fgLine[i].x = randomx;
          
          this.linespeed[i]+=50;
          if(this.linespeed[i] > 1000){
            this.linespeed[i] = 1000;
          }

        }         
      }
      
    },
    collisionHandler: function (obj1, obj2) {

        //  The two sprites are colliding
        //alert("dead");
      //alert( (this.player.x-this.target === 0)+' && '+(this.debris.y - this.player.y <= 150));
      
      //this.speed = 150;
   
        obj1.body.velocity.y = 0; 
        obj2.y = 800;
        obj1.hp--;
        this.image.visible = false;
        this.overTimer = 0;
        if(obj1.hp <= 0){
          this.game.state.start('menu');    
        }
        //this.game.state.start('menu');      

    },
    onInputDown: function () {
      //dodge
      var x = this.game.width / 2
        , y = this.game.height / 2;
      var cursorx;
      x = this.input.position.x;
      if(x > this.player.x && this.target < 240){
        this.target += 80;
      }
      if(x < this.player.x && this.target > 80){
        this.target -= 80;
      }
      if(x === this.player.x){
      }

      

      //this.game.state.start('menu');
    }

  };

  window[''] = window[''] || {};
  window[''].Game = Game;

}());
