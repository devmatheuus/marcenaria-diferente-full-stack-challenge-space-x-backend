import { AppError } from "@/errors/app-error";
import { getLaunchesStatsService } from "@/services/launch/get-launches-stats.service";
import { Request, Response } from "express";

/* 
    Chama o serviço responsável por retornar um array de objetos contendo dados dos quatro
    foguetes com mais lançamentos.

    Os dados retornados em cada objetos são:
    * Nome do foguete;
    * quantidade de lançamentos bem sucedidos;
    * quantidade de lançamentos mal sucedidos;
    * Um array contendo o ano e a quantidade de lançamentos por ano.     
*/

export const getLaunchesStatsController = async (
    req: Request,
    res: Response
) => {
    try {
        const launchesData = await getLaunchesStatsService();
        return res.json(launchesData);
    } catch (error) {
        throw new AppError(
            500,
            "Error when calling the get Launch Start service"
        );
    }
};
