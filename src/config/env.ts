import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

// Defino el modelo de mis variables de entorno
interface EnvVars {
    DB_PORT: number;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    HOST: string;
    PORT: number;
}

// Defino el modelo de mis variables de entorno con JOI
const envsSchema = joi.object({
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    HOST: joi.string().required(),
    PORT: joi.number().required()
}).unknown(true).prefs({ convert: true });

// Valido que las variables definidas en mi archivo `.env` sigan la estructura que defini en JOI
const { error, value } = envsSchema.validate(process.env);

// Si hay un error lo muestro
if (error) throw new Error(`Cofig validation error: ${error.message}`);

// Establezco que el resultado de la validacion de JOI es del tipo de mi interfaz
const envVars: EnvVars = value;

// Creo constante que utilizare a lo largo de mi proyecto
export const envs = {
    DB_PORT: envVars.DB_PORT,
    DB_HOST: envVars.DB_HOST,
    DB_USERNAME: envVars.DB_USERNAME,
    DB_PASSWORD: envVars.DB_PASSWORD,
    DB_DATABASE: envVars.DB_DATABASE,
    HOST: envVars.HOST,
    PORT: envVars.PORT
}