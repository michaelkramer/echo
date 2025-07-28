import { Request, Response, Router } from "express";
import { aggregateReport } from "../services/get-aggregate-data";
import { getSessionsByScreen } from "../services/get-session";
import { getUserEngagementByScreen } from "../services/get-user-engagement";

const server = Router();
/**
 * @swagger
 * /userEngagement:
 *   get:
 *     summary:
 *     responses:
 *       200:
 *         description: .
 *        content:
 *         application/json:
 *        schema:
 *         type: array
 *        items:
            $ref: '#/definitions/schemas/ScreenAnalytic'
 */
server.get("/userEngagement", async (_req: Request, res: Response) => {
  res.status(200).send(await getUserEngagementByScreen());
});

/**
 * @swagger
 * /sessionByScreen:
 *   get:
 *     summary:
 *     responses:
 *       200:
 *         description: .
 *        content:
 *         application/json:
 *        schema:
 *         type: array
 *        items:
            $ref: '#/definitions/schemas/ScreenData'
 */
server.get("/sessionByScreen", async (_req: Request, res: Response) => {
  res.status(200).send(await getSessionsByScreen());
});

/**
 * @swagger
 * /aggregateReport:
 *   get:
 *     summary:
 *     parameters:
 *      in: query
 *      name: userId
 *      required: false
 *      schema:
 *        type: string
 *      description: The user ID to filter the report by
 *     responses:
 *       200:
 *         description: .
 *        content:
 *         application/json:
 *        schema:
 *         type: array
 */
server.get("/aggregateReport", async (_req: Request, res: Response) => {
  const userId = _req.query.userId as string | undefined;
  const data = await aggregateReport(userId);
  res.status(200).send(data);
});

export default server;
