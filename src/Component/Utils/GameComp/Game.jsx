// src/components/GameScene.js
import React, { useEffect } from "react";
import Phaser from "phaser";

export default function GameScene() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#87ceeb", // ✅ sky blue fallback
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
      parent: "phaser-game",
    };

    const game = new Phaser.Game(config);

    function preload() {
      console.log("📥 Loading assets...");

      this.load.image("background", "assets/bg.png");
      this.load.spritesheet("character", "assets/character.png", {
        frameWidth: 64, // ✅ update based on actual sprite size
        frameHeight: 64,
      });

      this.load.on("filecomplete", (key) => {
        console.log(`✅ Loaded: ${key}`);
      });
      this.load.on("loaderror", (file) => {
        console.error(`❌ Failed to load: ${file.key}`);
      });
    }

    function create() {
      console.log("🎨 Creating scene...");

      // Background stretched to fit
      this.add.image(400, 300, "background").setDisplaySize(800, 600);

      // Add character in center
      this.player = this.physics.add.sprite(400, 300, "character").setScale(2);

      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("character", {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      if (!this.player || !this.cursors) return;

      this.player.setVelocity(0);

      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("walk", true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play("walk", true);
      } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play("walk", true);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play("walk", true);
      } else {
        this.player.anims.stop();
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-game" className="w-full h-[600px]"></div>;
}
