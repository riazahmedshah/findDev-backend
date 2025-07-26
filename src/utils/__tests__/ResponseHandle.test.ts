import { Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ResponseHandler } from "../ResponseHandler";

describe('ResponseHandler', () => {
  let mockRes: Partial<Response>

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn()
    }
  });

  describe('ResponseHandler.json', () => {
    it('sends JSON with status 200 if data is present', () => {
      ResponseHandler.json(mockRes as Response, {message:"OK"});

      expect(mockRes.json).toHaveBeenCalledWith({message:"OK"});
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('sends empty response with status 200 if no data is provided', () => {
      ResponseHandler.json(mockRes as Response);

      expect(mockRes.send).toHaveBeenCalledWith();
      expect(mockRes.status).toHaveBeenCalledWith(200)
    });
  })

  describe('ResponseHandler.created', () => {
    it('sends JSON in response with status 201', () => {
      const responseHandlerSpy = vi.spyOn(ResponseHandler, 'json').mockImplementation(() => {});
      ResponseHandler.created(mockRes as Response, {message:"SUCCESS"});
      expect(responseHandlerSpy).toHaveBeenCalledWith(
        mockRes,
        {message:"SUCCESS"},
        201
      )
    });
  })

  describe('ResponseHandler.unauthorized', () => {
    it('sends text response with status 401 if message is provided', () => {
      ResponseHandler.unauthorized(mockRes as Response, "INVALID_CREDENTIALS");

      expect(mockRes.send).toHaveBeenCalledWith("INVALID_CREDENTIALS");
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('sends default response with status 401 if message is not provided', () => {
      ResponseHandler.unauthorized(mockRes as Response);

      expect(mockRes.send).toHaveBeenCalledWith("Unauthorized");
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  })

  describe('ResponseHandler.notFound', () => {
    it('sends text response with status 404 if message is provided', () => {
      ResponseHandler.notFound(mockRes as Response, "USER_NOT_FOUND");

      expect(mockRes.send).toHaveBeenCalledWith("USER_NOT_FOUND");
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it('sends default response with status 404 if message is not provided', () => {
      ResponseHandler.notFound(mockRes as Response);

      expect(mockRes.send).toHaveBeenCalledWith("Not Found");
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  })

})