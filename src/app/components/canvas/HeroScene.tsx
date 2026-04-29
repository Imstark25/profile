'use client'
/**
 * HeroScene.tsx — re-export SpaceScene as main 3D background.
 * SpaceScene is dynamically imported in Hero.tsx with SSR disabled.
 */
export { SpaceScene as HeroScene } from './SpaceScene'
