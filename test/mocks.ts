import { ExpressResponse } from "../src/types";

export const mockRes = (): ExpressResponse => {
    const res: ExpressResponse = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
