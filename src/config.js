import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
export const DB_DATABASE = process.env.DB_DATABASE || 'ferreteria_bd';

export const PORT2 = process.env.PORT ||3000;  ;
export const DB_HOST2 = process.env.DB_HOST ||'localhost'  ;
export const DB_PORT2 = process.env.DB_PORT || 3306;
export const DB_USER2 = process.env.DB_USER ||  'root';
export const DB_PASSWORD2 = process.env.DB_PASSWORD  || '123456';
export const DB_DATABASE2 = process.env.DB_DATABASE ||  'ferreteria_selva_datamart';