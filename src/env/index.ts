import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT:z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success===false){
  console.error('❌ Invalid envirement variables',_env.error.format())
  throw new Error('Invalid envirement varibles.')
}

export const env = _env.data