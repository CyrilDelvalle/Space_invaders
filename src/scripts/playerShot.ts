import Projectile from "../entities/Projectile";

const playerShot = (projectiles: Projectile[]) => {
  projectiles.forEach((projectile, index) => {
    if (projectile.position) {
      if (projectile.position.y + projectile.radius <= 0) {
        setTimeout(() => {
          projectiles.splice(index, 1);
        }, 0);
      } else {
        projectile.update();
      }
    }
  });
};

export default playerShot;
