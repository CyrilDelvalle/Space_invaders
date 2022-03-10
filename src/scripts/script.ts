import Grid from "../entities/Grid";
import InvaderProjectile from "../entities/InvaderProjectile";
import Particle from "../entities/Particle";
import Player from "../entities/Player";
import Projectile from "../entities/Projectile";
import createSpaceStars from "./createSpaceStars";
import createParticles from "./createParticles";
import removeInvadersProjectiles from "./removeInvadersProjectiles";
import playerShot from "./playerShot";
import invaderShot from "./invaderShot";
import showMessage from "./showMessage";
import displayScore from "./displeyScore";

const script = () => {
  const canvas = document.querySelector("canvas");
  let scoreElement = document.getElementById("scoreElement");
  let messageElement = document.getElementById("messageElement");

  const context = canvas?.getContext("2d");

  if (canvas) {
    canvas.width = 1280;
    canvas.height = 720;
  }

  const player = new Player(context, canvas);
  const projectiles: Projectile[] = [];
  const grids: Grid[] = [];
  const invaderProjectiles: InvaderProjectile[] = [];
  let particles: Particle[] = [];

  showMessage(messageElement, "Game start !");

  const keys = {
    ArrowLeft: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
  };

  let frames = 0;
  let score = 0;
  let randomInterval = Math.floor(Math.random() * 500 + 500);
  let game = {
    over: false,
    active: true,
  };

  player.draw();

  if (canvas && context) {
    particles = createSpaceStars(canvas, particles, context);
  }

  const animate = () => {
    if (!game.active) {
      showMessage(messageElement, "Game over...");
      return;
    }
    if (canvas && player.position && context) {
      requestAnimationFrame(animate);
      context.fillStyle = "black";
      context?.fillRect(0, 0, canvas?.width, canvas?.height);

      player.update();
      particles.forEach((particle, index) => {
        if (particle.position) {
          if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
          }
        }

        if (particle.opacity <= 0) {
          setTimeout(() => {
            particles.splice(index, 1);
          }, 0);
        } else {
          particle.update();
        }
        particle.update();
      });

      invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position && player.position) {
          if (
            invaderProjectile.position.y + invaderProjectile.height >=
            canvas.height
          ) {
            setTimeout(() => {
              invaderProjectiles.splice(index, 1);
            }, 0);
          } else invaderProjectile.update();

          if (
            invaderProjectile.position.y + invaderProjectile.height >=
              player.position.y &&
            invaderProjectile.position.x + invaderProjectile.width >=
              player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width
          ) {
            setTimeout(() => {
              invaderProjectiles.splice(index, 1);
              player.opacity = 0;
              game.over = true;
            }, 0);

            setTimeout(() => {
              invaderProjectiles.splice(index, 1);
              player.opacity = 0;
              game.active = false;
            }, 2000);

            particles = createParticles({
              object: player,
              color: "white",
              context,
              particles,
            });
          }
        }
      });

      playerShot(projectiles);

      grids.forEach((grid, gridIndex) => {
        grid.update();

        invaderShot(frames, grid, invaderProjectiles);

        grid.invaders.forEach((invader, i) => {
          invader.update({ velocity: grid.velocity });

          // projectiles hit ennemies
          projectiles.forEach((projectile, j) => {
            if (projectile.position && invader.position) {
              if (
                projectile.position.y - projectile.radius <=
                  invader.position.y + invader.height &&
                projectile.position.x + projectile.radius >=
                  invader.position.x &&
                projectile.position.x - projectile.radius <=
                  invader.position.x + invader.width &&
                projectile.position.y + projectile.radius >= invader.position.y
              ) {
                setTimeout(() => {
                  const invaderFound = grid.invaders.find((invader2) => {
                    return invader2 === invader;
                  });

                  const projectileFound = projectiles.find((projectile2) => {
                    return projectile2 === projectile;
                  });

                  // remove invaders and projectiles
                  ({ score, particles } = removeInvadersProjectiles(
                    invaderFound,
                    projectileFound,
                    invader,
                    score,
                    particles,
                    context,
                    scoreElement,
                    grid,
                    i,
                    projectiles,
                    j,
                    grids,
                    gridIndex
                  ));
                }, 0);

                displayScore(messageElement, score);
              }
            }
          });
        });
      });

      if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -7;
        player.rotation = -0.15;
      } else if (
        keys.ArrowRight.pressed &&
        player.position.x + player.width <= canvas?.width
      ) {
        player.velocity.x = 7;
        player.rotation = 0.15;
      } else {
        player.velocity.x = 0;
        player.rotation = 0;
      }
    }

    // spawn enemies
    if (frames % randomInterval === 0) {
      grids.push(new Grid(context, canvas));
      randomInterval = Math.floor(Math.random() * 500 + 500);
      frames = 0;
    }

    frames++;
  };

  animate();

  window.addEventListener("keydown", ({ key }) => {
    if (game.over) return;

    switch (key) {
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        break;
      case " ":
        if (player.position) {
          projectiles.push(
            new Projectile({
              position: {
                x: player.position.x + player.width / 2,
                y: player.position.y,
              },
              velocity: { x: 0, y: -10 },
              context: context,
            })
          );
        }
        break;
    }
  });

  window.addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case " ":
        break;
    }
  });
};

export default script;
