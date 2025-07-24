import { Request } from "express";
import Redis from "ioredis";
import { RateLimiter, RateLimiterOptions } from "./RateLimiter";
import { getRedisClient } from "@/config/redis";

export type NamedRateLimitConfig = {
  name:string,
  keyGenerator: (req:Request) => string,
  options: RateLimiterOptions
}

export class RateLimiterManager{
  private redis: Redis;
  private prefix:string;
  private configs: Map<string, NamedRateLimitConfig> = new Map();

  constructor(redis?:Redis, prefix = 'rate_limit:'){
    this.redis = redis ?? getRedisClient()
    this.prefix = prefix
  }

  register(config:NamedRateLimitConfig){
    if(this.configs.has(config.name)){
      throw new Error(`RateLimiter config already exists for ${config.name}`)
    }

    this.configs.set(config.name, config)
  }

  async check(name:string,req:Request){
    const config = this.configs.get(name)

    if(!config) throw new Error(`RateLimiter config not found for ${name}`)

    const key = `${this.prefix}${config.keyGenerator(req)}`

    const limitter = new RateLimiter({
      redis:this.redis,
      ...config.options
    })

    return limitter.canProceed(key)
  }
}